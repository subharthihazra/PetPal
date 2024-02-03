const dotenv = require("dotenv");
const { Pet } = require("../models/pet");
const { Tag } = require("../models/tag");
const { uploadImg } = require("./uploadFile");

dotenv.config();

async function dashboardData(req, res) {
  const userId = req?.headers["userid"];
  if (!userId) return res.sendStatus(400);

  let data = await Pet.find({ owner: userId });
  data = data.map(async (x) => ({
    ...x,
    ...(await Tag.find({ _id: x.tags })),
  }));
  res.status(200).send({ msg: "success", data });
}

module.exports = { dashboardData };
