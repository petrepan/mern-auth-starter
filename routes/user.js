const router = require("express").Router();
const { register, activate, login, forgot, reset } = require("../controllers/user");

router.post("/register", register);
router.get("/activate/:token", activate);
router.post("/login", login);
router.post("/forgot", forgot);
router.post("/reset/:token", reset)

module.exports = router;
