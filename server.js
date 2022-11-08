const path = require('path')
const express = require('express')
const app = express()
const port = 1337

// unblock static folder so browser can request resources
app.use(express.static('public'))

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"))
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})