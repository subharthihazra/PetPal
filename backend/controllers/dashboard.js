const dotenv = require("dotenv");
const { Pet } = require("../models/pet");
const { Tag } = require("../models/tag");
const { uploadImg } = require("./uploadFile");
const { default: mongoose } = require("mongoose");

dotenv.config();

async function dashboardUploads(req, res) {
  ///////////////////////////////////////////////////////////////////////////
  // Example URL
  // []/dashboard/uploads
  ///////////////////////////////////////////////////////////////////////////
  try {
    // const owner = "abc123"; //req.userId;
    // const {
    //   petId,
    //   productDetails,
    //   imageUrl,
    //   imageId,
    //   description,
    //   nickname,
    //   teams,
    // } = req.body;

    // const { tagId, type, breed, gender, age, personality, health, stray } =
    //   req.body;
    let {owner,nickname,description,type,breed,gender,personality,city,weight,age ,stray}  = req.body

    if (
      !owner ||
      !type ||
      !breed ||
      !gender ||
      !age ||
      !personality ||
      !stray || 
      !nickname || !weight || !city
    ) {
      return res
        .status(400)
        .json({ error: "Invalid or incomplete tag details." });
    }
    console.log(req.body.owner)
    // if (
    //   !petId ||
    //   !productDetails ||
    //   !imageUrl ||
    //   !imageId ||
    //   !description ||
    //   !nickname ||
    //   !teams
    // ) {
    //   return res
    //     .status(400)
    //     .json({ error: "Invalid or incomplete pet details." });
    // }

    const tagRes = await Tag.create({
      type,
      breed,
      gender,
      age,
      city,
      personality,
      stray,
      weight
    });

    if (!tagRes || tagRes.length === 0) {
      return res.status(500).json({ error: "Internal error to store tag." });
    }
    owner  = new mongoose.Types.ObjectId(String(owner))
    console.log(req.files)
    const resp = await uploadImg(req?.files[0])
    console.log(resp)
    const petRes = await Pet.create({
      owner,
      description,
      nickname,
      tags: tagRes._id,
      imageId : resp?.fileId,
      imgUrl : resp?.url
    });

    if (!petRes || petRes.length === 0) {
      return res.status(500).json({ error: "Internal error to store pet." });
    }

    // await uploadImg(req?.files[0], async (url, fileId) => {
    //   const result2 = await Pet.updateOne(
    //     { _id: petRes._id },
    //     { imgUrl: url, imageId: fileId }
    //   );

    //   if (result2?.acknowledged) {
    //     res.status(201).json({ msg: "success", data: { id: petRes._id } });
    //   } else {
    //     next(new CustomError(500, "Img store problem"));
    //   }
    // });
    res.status(201).json({ info: "success" });

    //////////////////////////////////////////////
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPets(req,res){
  try {
    // Request should contain the userId from the middlewar
    const data = await Pet.find({owner:req.ownerId})
    res.status(200).json({data})
  } catch (error) {
    res.status(500).json({"error":"Internal Server Error"})
  }
}

module.exports = {dashboardUploads,getPets};
