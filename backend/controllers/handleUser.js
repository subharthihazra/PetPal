const dotenv = require("dotenv");
const admin = require("firebase-admin");
dotenv.config();

const serviceAccount = require("../accountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function userLogin(req, res) {
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = {
          maxAge: expiresIn,
          httpOnly: true,
          sameSite: "None",
          secure: true,
        };
        res.cookie("session", sessionCookie, options);
        res.sendStatus(200);
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
}

async function userProfile(req, res) {
  const sessionCookie = req.cookies.session || "";

  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((userData) => {
      console.log("Logged in:", userData.email);
      //////
    })
    .catch((error) => {
      res.redirect("/login");
    });
}

module.exports = { userLogin, userProfile };
