const express    = require('express')
const path       = require('path')
const bodyParser = require('body-parser')
const upload     = require('multer')({ dest: "./temp/" })
const pro        = require('./processor')
const port       = process.env.port || 1118
const app        = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+"/index.html"))
    pro.deleteTempImages('./temp/')
        .then(dlt => console.log(dlt))
        .catch(err => console.log(err))
})

app.post('/', upload.single('file'), (req, res) => {
    let obj = {
        srcFile:  req.file.path,
        width:    200,
        height:   200,
        destFile: './dest/'+ new Date().getTime() +'.png'
    }
    pro.modifyImage(obj)
        .then(done => {
            console.log(done)
            res.redirect('/')
        })
        .catch(err => console.log(err))
})

app.listen(port, () => console.log('App running..') )
