const { Router } = require("express");
const multer = require("multer");
const discover = require("../controllers/discover");
const dashboardUploads = require("../controllers/dashboard");
const { userLogin, userSignup } = require("../controllers/handleUser");
const { getPets } = require("../controllers/dashboard");
const csrf = require("csurf");
const { dashboardData } = require("../controllers/dashboardData");

const router = Router();
const upload = multer();

router.route("/cron").get((req, res) => {
  res.status(200).json({ cron: "pet" });
});

const csrfMiddleware = csrf({ cookie: true });
router.use("/auth", csrfMiddleware);

router.get("/isLoggedin", (req, res) => {
  if (req.cookies["session"]) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

router.get("/auth/token", (req, res) => {
  const options = {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  };

  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.sendStatus(200);
});

// router.get("/user", userProfile);

router.route("/discover/page/:page").get(discover);

// use user (req.user) middleware
router
  .route("/dashboard/uploads")
  .post(upload.any(), dashboardUploads)
  .get(getPets);
router.route("/dashboard/data").get(dashboardData);

router.route("/auth/signup").post(userSignup);
router.route("/auth/login").post(userLogin);

module.exports = router;
