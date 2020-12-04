const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const upload = require('./middleware/upload')


const app = express()

app.use(express.json({extended : true}))

app.use('/api/film/load', upload.single('file'), require('./routes/loadfile.router'))
app.use('/api/film', require('./routes/film.routes'))
app.use('/api/actor', require('./routes/actors.routers'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    } catch (e) {
        console.log('Server Error,', e.message)
        process.exit(1)
    }
}
start()



