const dotenv = require("dotenv");
const { Pet } = require("../models/pet");
const { Tag } = require("../models/tag");

dotenv.config();

async function discover(req, res) {
  try {
    const page = parseInt(req?.params?.page) || 1;
    const pageSize = parseInt(String(process.env.PAGEINATION_PAGE_LEN)) || 10;

    const filters = req?.query || {};

    // Find tag IDs based on the provided filters
    const foundTags = await Tag.find(filters);

    // Extract tag IDs from the foundTags
    const tagIds = foundTags.map(tag => tag._id); // Adjust based on your schema

    // Find pets that have the specified tag IDs
    const pets = await Pet.find({ tags: { $in: tagIds } })
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