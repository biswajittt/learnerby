const cloudinary = require("cloudinary").v2;

// config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

const opts = {
    overwrite: true,
    invaliddata: true,
    resource_type: "auto"
}
module.exports = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, opts, (err, result) => {
            if (result && result.secure_url) {
                console.log(result.secure_url);
                return resolve(result.secure_url)
            }
            console.log(err.message)
            return reject({ message: err.message })
        })
    })
};