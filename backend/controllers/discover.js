const dotenv = require("dotenv");
const { Pet } = require("../models/pet");
const { Tag } = require("../models/tag");

dotenv.config();

async function discover(req, res) {
  try {
    const page = parseInt(req?.params?.page) || 1;
    const pageSize = parseInt(String(process.env.PAGINATION_PAGE_LEN)) || 10;

    const filters = req?.query || {};

    // Find tag IDs based on the provided filters
    const foundTags = await Tag.find(filters).lean();

    // Extract relevant pet information for the response
    const pets = await Promise.all(
      foundTags.map(async (tag) => {
        const pet = await Pet.findOne({tags : tag._id}).lean();
        return {
          ...pet,
          ...tag,
        };
      })
    );

    res.status(200).json({
      info: "found",
      page,
      pageSize,
      pets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = discover;
