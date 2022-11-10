const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const port = 1337

// let notesData = require('./db/db.json')

// unblock static folder so browser can request resources
app.use(express.static('public'))
app.use(express.json())


// API routes

// get request for getNotes
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf-8', function(err, data) {
        res.json(JSON.parse(data))
    })
})

// post request for saveNote
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body

    if (!title || !text) {
        res.status(400).json({ error: "Missing title and/or text." })
        return
    }

    const newNote = {
        ...req.body,
        id: Math.random()
    }

    // read contents of db.json
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf-8', function(err, data) {
        if (err) {
            res.status(500).json(err)
            return
        }
        // parse string into JSON
        const notesData = JSON.parse(data)
        // push our new note into json
        notesData.push(newNote)
        // stringify notes array and save file
        fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notesData), function (err) {
            if (err) {
                res.status(500).json(err)
                return
            }
            res.status(200).json(newNote)
        })
    })
})

// delete request for deleteNote
app.delete('/api/notes/:id', (req, res) => {

    // read all notes from the db.json file
    fs.readFile(path.join(__dirname, "db", "db.json"), "utf-8", function(err, data) {

        const { id } = req.params
        let notesData = JSON.parse(data)
        // console.log(notesData)
        const deletedNote = notesData.find(note => note.id == id)
        console.log("Deleted Note: ", deletedNote)
        // remove the note with the given id property
        if (!deletedNote) {
            res.status(404).json({ "message": "Not found." })
            return
        } else {
            notesData = notesData.filter(note => note.id != id)
        }
        console.log("Notes Data: ", notesData)
    


        // rewrite the notes to the db.json file
        fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notesData), function (err) {
            if (err) {
                res.status(500).json(err)
                return
            }
            res.json(notesData)
        })
    })
})


// view (html) routes

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Notes route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"))
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

