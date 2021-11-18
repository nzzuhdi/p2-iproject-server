if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}
const express = require('express')
const cors = require('cors')
const router = require('./router')
const app = express()
const port = process.env.PORT || 3002
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(router)

app.listen(port, () => {
    console.log(`listening ${port}`);
})

module.exports = app