const { Router } = require("express");
const multer = require("multer");
const discover = require("../controllers/discover");
const { userLogin, userProfile } = require("../controllers/handleUser");
const { dashboardUploads, getPets } = require("../controllers/dashboard");

const router = Router();
const upload = multer();

// router.route("/cron").get((req, res) => {
//   res.status(200).json({ cron: "pet" });
// });

router.get("/auth/token", (req, res) => {
  const options = {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  };

  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.sendStatus(200);
});

router.post("/auth/login", userLogin);
router.post("/auth/signup", userLogin);
router.get("/user", userProfile);

module.exports = router;
