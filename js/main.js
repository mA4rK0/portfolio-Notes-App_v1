// import the notesAPI class from notesAPI.js file.
import NotesView from "./notesView.js";
import NotesAPI from "./notesAPI.js";

const app = document.getElementById("app");
const view = new NotesView(app, {
  onNoteAdd() {
    console.log("note is added");
  },
  onNoteSelect(id) {
    console.log(`Note selected: ${id}`);
  },
  onNoteDelete(id) {
    console.log(`Note deleted: ${id}`);
  },
  onNoteEdit(newTitle, newBody) {
    console.log(newTitle);
    console.log(newBody);
  },
});

view.updateNoteList(NotesAPI.getAllNotes());
