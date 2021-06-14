const fs = require('fs');
const util = require('util');
const uuidv1 = require('../node_modules/uuid/v1')
const writeFileAsync = util.promisify(fs.writeFile);

class NoteStorage {  
write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
};

addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
        throw new Error("Note 'title' and 'text' cannot be empty");
    }

    const newNote = { title, text, id: uuidv1() };

    return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
}
}
module.exports = new NoteStorage();