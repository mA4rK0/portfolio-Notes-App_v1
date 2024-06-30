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
}
