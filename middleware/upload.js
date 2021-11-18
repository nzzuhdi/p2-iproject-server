const axios = require('axios').default
const FormData = require('form-data')
const upload = async (req, res, next) => {
    try {
        console.log(req.file)
        console.log(req.file.mimetype);
        ;
        if (req.file.size > 255000) {
            console.log('masuk eror size');
            throw ({ name: 'fileSizeError' })
        } 
        if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/png') {
            console.log('masuk eror type');
            throw ({ name: 'fileTypeError' })
        } 
        else {
            const form = new FormData()
            form.append('file', req.file.buffer.toString("base64"))
            form.append('fileName', req.file.originalname)
            const result = await axios.post('https://upload.imagekit.io/api/v1/files/upload', form, {
                headers: form.getHeaders(),
                auth: { username: process.env.TOKEN_IMAGEKIT }
            })
            console.log(result);
            req.body.imageUrl = result.data.url
            next()
        }

    } catch (err) {
        console.log('masuk eror');
        next(err)
    }
}

module.exports = upload