/* eslint-disable no-undef */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const {
  validateInput,
  validateLoginInput,
  validateEmail,
  validatePassword,
} = require("../middleware/validateUser");
const sgMail = require("@sendgrid/mail");
const User = require("../models/user");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const register = async (req, res) => {
  const { errors, isValid } = validateInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { username, email, password } = req.body;
  let avatar = username.trim().toUpperCase()[0];
  try {
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ username: "Username already exists" });
    }

    user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }

    const newUser = new User({ username, email, avatar, password });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    newUser.password = hashPassword;
    const saveUser = await newUser.save();
    const token = generateToken(saveUser._id);

    const mail = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Account activation link",
      html: `  <h1 style="color:#fff; background-color:green; text-align:center;">User Verification</h1>
                <h1>Please the link to activate your account</h1>
               <a href="${process.env.CLIENT_URL}/user/activate/${token}">${process.env.CLIENT_URL}/user/activate/${token}</a>
            `,
    };

    // eslint-disable-next-line no-unused-vars
    const sendEmail = await sgMail.send(mail);

    return res.status(200).json({
      message: `A verification mail has been sent to ${email}`,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const resend = async (req, res) => {
  const { errors, isValid } = validateEmail(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "We were unable to find a user with that email." });
    }

    if (user.isVerified)
      return res.status(400).send({
        message: "This account has already been verified.",
      });

    const token = generateToken(user._id);

    const mail = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Account activation link",
      html: `  <h1 style="color:#fff; background-color:green; text-align:center;">User Verification</h1>
                <h1>Please click the link to activate your account</h1>
               <a href="${process.env.CLIENT_URL}/user/activate/${token}">${process.env.CLIENT_URL}/user/activate/${token}</a>
            `,
    };

    // eslint-disable-next-line no-unused-vars
    const sendEmail = await sgMail.send(mail);

    return res.status(200).json({
      message: `A verification mail has been sent to ${email}`,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const registerreset = async (req, res) => {
  const { errors, isValid } = validateEmail(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOneAndDelete({
      email: req.body.email,
      isVerified: false,
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found or Activation successful" });
    }

    return res.status(200).json({ message: "User reset successful" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const activate = async (req, res) => {
  const token = req.params.token;
  try {
    if (token) {
      // eslint-disable-next-line no-unused-vars
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "Expired link, sign up again" });
        } else {
          const { id } = jwt.decode(token);

          User.findById(id, function (err, user) {
            if (err) {
              return res
                .status(500)
                .json({ message: "An unexpected error occured" });
            }

            if (!user) {
              return res.status(400).json({
                message: "We were unable to find a user for this token.",
              });
            }

            if (user.isVerified) {
              return res.status(400).json({
                message: "This user has already been verified.",
                user,
              });
            }

            user.isVerified = true;
            user.expires = null;

            user.save(function (err) {
              if (err) {
                return res
                  .status(500)
                  .json({ message: "An unexpected error occured" });
              }

              return res.status(200).json({
                message: "The account has been verified successfully.",
                user,
              });
            });
          });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { user, password } = req.body;
  try {
    const finduser = await User.findOne({
      $or: [{ username: user }, { email: user }],
    });

    if (!finduser) {
      return res.status(400).json({ message: "Incorrect Credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, finduser.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect Credentials" });
    }

    const token = generateToken(finduser._id);

    if (!token) {
      return res.status(400).json({ message: "Incorrect Credentials" });
    }

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: finduser,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const forgot = async (req, res) => {
  const { errors, isValid } = validateEmail(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: `The email ${email} is not associated with any account`,
      });
    }

    const token = generateToken(user._id);

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; //expires in an hour

    const saveUser = await user.save();

    const mail = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Password reset link",
      html: `  <h5 style="color:#fff; background-color:green; text-align:center;">Paassword reset</h5>
                <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n Please click on the following link, or paste this into your browser to complete the process. \n\n If you did not request this, please ignore this phone and your password will remain unchanged.\n</p>
               <a href="${process.env.CLIENT_URL}/user/newpassword/${saveUser.resetPasswordToken}">${process.env.CLIENT_URL}/user/newpassword/${saveUser.resetPasswordToken}</a>
            `,
    };

    // eslint-disable-next-line no-unused-vars
    const sendEmail = await sgMail.send(mail);

    return res.status(200).json({
      message: `A password reset mail has been sent to ${email}`,
      token,
    });
  } catch (error) {
    return res.status(500).json(errors.message);
  }
};

const passwordreset = async (req, res) => {
  const { errors, isValid } = validatePassword(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired." });
    } else {
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(user.password, salt);
      user.password = hashPassword;

      // eslint-disable-next-line no-unused-vars
      const savedUser = await user.save();

      return res
        .status(200)
        .json({ message: "Your password has been updated" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getuser = async (req, res) => {

  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  register,
  activate,
  resend,
  registerreset,
  login,
  forgot,
  passwordreset,
  getuser,
};
