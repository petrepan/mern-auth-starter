const router = require("express").Router();
const { register, resend, registerreset, activate, login, forgot, passwordreset, getuser } = require("../controllers/user");
const auth = require("../middleware/auth")

router.post("/register", register);
router.post("/register/resend", resend);
router.post("/register/reset", registerreset);
router.get("/activate/:token", activate);
router.post("/login", login);
router.post("/login/forgot", forgot);
router.post("/login/reset/:token", passwordreset)
router.get("/:username", auth, getuser);

module.exports = router;
