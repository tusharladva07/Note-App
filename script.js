const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Show existing notes from localStorage or initialize an empty string
function showNotes() {
    const notes = localStorage.getItem("notes");
    if (notes) {
        notesContainer.innerHTML = notes;
    } else {
        localStorage.setItem("notes", "");
    }
}
showNotes();

// Function to update localStorage with current notes
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Event listener for creating new notes
createBtn.addEventListener("click", () => {
    const inputBox = document.createElement("p");
    inputBox.contentEditable = true;
    let img = document.createElement("img");
    inputBox.className = "inputBox";
    img.src = "images/delete.png";
    img.alt = "DeleteBtn"
    notesContainer.appendChild(inputBox).appendChild(img);;
    updateStorage(); // Update localStorage when a new note is created
});

// Event listener for handling clicks on notes and delete buttons
notesContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        if (confirm("Are You Sure You Want To Delete Note") == true) {
            text = "You pressed OK!";
            e.target.parentElement.remove();
            updateStorage(); // Update localStorage when a note is deleted
        } 
    }
});

// Event listener for dynamically created notes to update localStorage on keyup
notesContainer.addEventListener("input", () => {
    updateStorage();
});

// Prevent default behavior of Enter key (creating a new line) in contentEditable elements
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target.contentEditable === "true") {
        document.execCommand("insertlineBreak");
        event.preventDefault();
    }
});

