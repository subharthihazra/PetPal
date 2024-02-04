const dotenv = require("dotenv");
const admin = require("firebase-admin");
dotenv.config();

const serviceAccount = require("../firebase.json");
const User = require("../models/user");

const firebase = admin.initializeApp({
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

async function getUser(req, res) {
  const sessionCookie = req.cookies.session || "";
  // console.log(sessionCookie);
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(async (userData) => {
      // console.log("Logged in:", userData.email);
      // console.log("here", userData);
      if (userData?.email) {
        const user = await User.findOne(
          { email: userData?.email },
          { fullname: 1, email: 1, _id: 1 }
        );
        res.status(200).json({ msg: "success", data: user });
      } else {
        res.sendStatus(400);
      }
    })
    .catch((error) => {
      res.sendStatus(500)
    });
}

async function userSignup(req, res) {
  const { email, name } = req.body;
  console.log(email);
  if (!email && !name) {
    res.sendStatus(400);
    return;
  }
  try {
    //User is created now store it in data base
    const data = await User.create({
      email: email,
      fullname: name,
    });
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
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
}

module.exports = { userLogin, getUser, userSignup };
