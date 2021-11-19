const errorHandler = async (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        const msg = err.errors.map(el => el.message)
        res.status(400).json({ message: msg })
    } else if (err.name === 'InvalidEmail') {
        res.status(401).json({ message: 'Insert Email' })
    }else if (err.name === 'InvalidPassword') {
        res.status(401).json({ message: 'Insert Password' })
    } else if (err.name === 'CannotLogin') {
        res.status(401).json({ message: 'Email or Password is incorrect!' })
    }else if (err.name === 'Unauthorized') {
        res.status(401).json({ message: 'Must login first with correct account' })
    }   
    else if (err.name === 'forbidden') {
        res.status(403).json({ message: 'You have no access!' })
    }  else if (err.name === 'doubleJoin') {
        res.status(403).json({ message: 'You already joined!' })
    }else if (err.name === 'notFound') {
        res.status(404).json({ message: 'Page not found!' })
    } else if (err.name === 'fileSizeError') {
        res.status(413).json({ message: 'Maximum file size is 255kb!' })
    } else if (err.name === 'fileTypeError') {
        res.status(415).json({ message: 'Only JPEG/PNG can be uploaded!' })
    }
    else {
        res.status(500).json({ message: 'Internal server error!' })

    }
}
module.exports = errorHandler