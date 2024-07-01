export default class NotesView {
  // * The root is from <section class="notes" id="app">
  constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteDelete = onNoteDelete;
    this.root.innerHTML = `
        <section class="notes-sidebar">
            <button class="notes-add" type="button">Add Note</button>
            <section class="notes-list"></section>
        </section>
        <section class="notes-preview">
            <input class="notes-title" type="text" placeholder="Enter a title..." />
            <textarea class="notes-body" name="" id="">Take Note...</textarea>
        </section>
    `;

    const addBtn = this.root.querySelector(".notes-add");
    const inpTitle = this.root.querySelector(".notes-title");
    const inpBody = this.root.querySelector(".notes-body");

    addBtn.addEventListener("click", () => {
      this.onNoteAdd();
    });

    [inpTitle, inpBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const updatedTitle = inpTitle.value.trim();
        const updatedBody = inpBody.value.trim();

        this.onNoteEdit(updatedTitle, updatedBody);
      });
    });

    // TODO : hide the note preview by default
  }

  _createListItemHTML(id, title, body, updated) {
    const maxBodyLength = 60;

    return `
      <section class="notes-list-item" data-note-id="${id}">
        <section class="notes-small-title">${title}</section>
        <section class="notes-small-body">
          ${body.substring(0, maxBodyLength)}
          ${body.length > maxBodyLength ? "..." : ""}
        </section>
        <section class="notes-small-updated">
          ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
        </section>
      </section>
    `;
  }

  updateNoteList(notes) {
    const noteListContainer = this.root.querySelector(".notes-list");

    // empty list
    noteListContainer.innerHTML = "";

    for (const note of notes) {
      const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));

      noteListContainer.insertAdjacentHTML("beforeend", html);
    }

    // add select/delete events for each list item
    noteListContainer.querySelectorAll(".notes-list-item").forEach((noteListItem) => {
      noteListItem.addEventListener("click", () => {
        this.onNoteSelect(noteListItem.dataset.noteId);
      });

      noteListItem.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you want to delete this note?");

        if (doDelete) {
          this.onNoteDelete(noteListItem.dataset.noteId);
        }
      });
    });
  }

  updateActiveNote(note) {
    this.root.querySelector(".notes-title").value = note.title;
    this.root.querySelector(".notes-body").value = note.body;

    this.root.querySelectorAll(".notes-list-item").forEach((noteListItem) => {
      noteListItem.classList.remove(".notes-list-item--selected");
    });
  }
}
