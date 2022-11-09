const path = require('path')
const express = require('express')
const app = express()
const port = 1337

const notesData = require('./db/db.json')

// unblock static folder so browser can request resources
app.use(express.static('public'))







// API routes

// get request for getNotes
app.get('/api/notes', (req, res) => {
    res.json(notesData)
})


// save request for saveNote
app.post('/api/notes', (req, res) => {
    // read contents of db.json
    fs.readFile(path.join(__dirname, 'db', 'db.json', 'utf8', function(err, data) {
        if (err) {
            res.status(500).json(err)
            return
        }
        // parse string into JSON
        const notesData = JSON.parse(data)
        // push our new note into json
        notesData.push(newNote)
        // save stringify notes array and save file
        fs.writeFile(path.join(__dirname, 'db', 'db.json', 'utf8', JSON.stringify(animalData), function (err) {
            if (err) {
                res.status(500).json(err)
                return
            }
            res.status(200).json(newAnimal)
        }))
    }))
})


// delete request for deleteNote





// view (html) routes

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

