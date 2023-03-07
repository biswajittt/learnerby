const cloudinary = require("cloudinary").v2;

// config
cloudinary.config({
    cloud_name: 'dw5trjq2s',
    api_key:' 475217766257553',
    api_secret: 'QaMsqCZmONWIzphSLpvbooRkB1U',
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