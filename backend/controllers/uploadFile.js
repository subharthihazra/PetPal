const ImageKit = require("imagekit");
const { v4: uuid } = require("uuid");

const imagekit = new ImageKit({
  publicKey: String(process.env.IMGKIT_PUB_KEY),
  privateKey: String(process.env.IMGKIT_PVT_KEY),
  urlEndpoint: `https://ik.imagekit.io/${String(
    process.env.IMGKIT_URLENDPOINT
  )}/`,
});

async function uploadImg(file, cb) {
  const mimeType = file?.mimetype;
  if (mimeType?.indexOf("image") !== 0) {
    // res.
    console.log(mimeType)
    return;
  }
  const buf = file?.buffer;
  const resp = await imagekit.upload(
    {
      file: buf,
      fileName: uuid(),
      tags: [mimeType],
    }
  );
  console.log(resp)
  return {url : resp.url,fileId : resp.fileId}
}

module.exports = { uploadImg };
