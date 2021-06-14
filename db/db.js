const fs = require('fs');
const util = require('util');
const uuidv1 = require('../node_modules/uuid/v1')
const writeFileAsync = util.promisify(fs.writeFile);

class NoteStorage {  
write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
};

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            // If notes isn't an array or can't be turned into one, send back a new empty array
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        });
    }

addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
        throw new Error("Note 'title' and 'text' cannot be blank");
    }

    // Adds a unique id to the note using uuid package
    const newNote = { title, text, id: uuidv1() };

    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
}
}
module.exports = new NoteStorage();