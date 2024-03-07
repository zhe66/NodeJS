const { default: chalk } = require('chalk')
const fs = require('fs')

const getNotes = function () {
    return 'Your notes ... '
}

const listNotes = () => {
    // Chargez les notes existantes en utilisant la fonction 'loadNotes'.
    const notes = loadNotes()

    // Affichez le titre de chaque note stockée.
    notes.forEach((note) => {
        console.log(note.title)
    })
} // Créez une fonction 'listNotes' pour lister le titre de toutes les notes sauvegardées.

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return [] // Retourne un tableau vide si le fichier n'existe pas ou s'il y a une autre erreur.
    }
}

const checkTitleExists = function (title, notes) {
    for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (title === element.title) {
            return true
        }
    }
    return false
}

const saveNotes = function (notes) {
    const jsonData = JSON.stringify(notes);
    fs.writeFileSync('notes.json', jsonData, function (err) {
        if (err) throw err;
        console.log('Replaced!');
    })
}

const addNotes = function (note) {
    const notes = loadNotes()
    if (!checkTitleExists(note.title, notes)) {
        notes.push(note)
        saveNotes(notes)
        console.log(chalk.green.inverse('New note title added!'));
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
}

const removeNotes = function (title) {
    const notes = loadNotes()
    if (checkTitleExists(title, notes)) {
        const removedNotes = notes.filter(item => item.title !== title)
        saveNotes(removedNotes);
        console.log(chalk.green.inverse(`Note title ${title} removed successfully!`));
    } else {
        console.log(chalk.red.inverse('Note title not found!'));
    }
}

const readNote = function (title) {
    const notes = loadNotes()
    const note = notes.filter(item => item.title === title)
    if (note.length === 0) {
        console.log(chalk.red.inverse('Note title not found!'));
    } else {
        console.log(chalk.green.inverse(`Note title ${title} has been found!`));
        console.log(`Note body is ${note[0].body} !`);
    }
}

module.exports = {
    getNotes: getNotes,
    listNotes: listNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    readNote: readNote
}