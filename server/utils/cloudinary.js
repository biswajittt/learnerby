const cloudinary = require("cloudinary").v2;

// config
cloudinary.config({
    cloud_name: 'xxxxxxxx',
    api_key:' xxxxxxxxxxx',
    api_secret: 'xxxxxxxxxxxxxxxxxxxxxxx',
})

// const cloudinaryUploadImg = async (fileToUpload) => {
//     return new Promise((resolve) => {
//         cloudinary.uploader.upload(fileToUpload, (result) => {
//             resolve(
//                 {
//                 url: result.secret_url
//                 },
//                 {
//                     resource_type: "auto"
//                 }
//             )
//         })
//     })
// }
module.exports = cloudinary;
