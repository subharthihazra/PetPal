const dotenv = require("dotenv");
const { Pet } = require("../models/pet");

dotenv.config();

async function discover(req, res) {
  ///////////////////////////////////////////////////////////////////////////
  // Example URL
  // []/discover/page/5?gender=male&city=kolkata&type=dog&bread=pug
  // []/discover/page/<<page>>?<<filters>>
  ///////////////////////////////////////////////////////////////////////////
  try {
    const page = parseInt(req?.params?.page) || 1;
    const pageSize = parseInt(String(process.env.PAGEINATION_PAGE_LEN)) || 10;

    const filters = req?.query || {}; // filter to be implemented

    const pets = await Pet.find(filters)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    if (pets.length === 0) {
      return res.status(200).json({ info: "notfound" });
    }

    res.status(200).json({
      info: "found",
      page,
      pageSize: pets.length,
      pets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = discover;
