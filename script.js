let library;

function Book(title, author, isRead) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
}

const bookForm = document.getElementById("book-form");
bookForm.style.display = "none";

const newBookBtn = document.getElementById("new-book-btn");
newBookBtn.addEventListener("click", () => bookForm.style.display = "block");

const errorMessage = document.getElementById("error-message");
const libraryContainer = document.getElementById("library-container");

function getBookFromInput() {
    let title = bookForm.title.value;
    let author = bookForm.author.value;
    let isRead = bookForm.isRead.checked;
    let newBook = new Book(title, author, isRead);
    return newBook;
}

function createBookContainer(book) {
    const bookContainer = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const removeBookBtn = document.createElement("button");

    const isRead = document.createElement("input");
    isRead.setAttribute("type", "checkbox");
    const isReadText = document.createElement("span");

    bookContainer.classList.add("book-container");
    isRead.classList.add("read-btn");
    removeBookBtn.classList.add("remove-book-btn");
    isReadText.classList.add("isRead-text");

    isRead.addEventListener("change", () => {
        toggleStatus(book);
    });

    removeBookBtn.addEventListener("click", () => {
        removeBookFromLibrary(book);
    });

    title.textContent = book.title;
    author.textContent = book.author;    

    if (book.isRead) {
        isRead.checked = true;
        isReadText.textContent = "Read";
        isReadText.classList.add("read");
    } else {
        isRead.checked = false;
        isReadText.textContent = "Not read";
        isReadText.classList.add("not-read");
    }

    const isReadContainer = document.createElement("div");
    isReadContainer.classList.add("isRead-container");
    isReadContainer.appendChild(isReadText);
    isReadContainer.appendChild(isRead);

    const delImg = document.createElement("img");
    delImg.src = "./icons/delete.svg";
    delImg.alt = "Delete project";
    delImg.title="Delete project";
    removeBookBtn.appendChild(delImg);

    const removeBtnContainer = document.createElement("div");
    removeBtnContainer.classList.add("remove-btn-container");
    removeBtnContainer.appendChild(removeBookBtn);

    bookContainer.appendChild(removeBtnContainer);
    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(isReadContainer);
    libraryContainer.appendChild(bookContainer);
}

function updateLibraryContainer() {
    libraryContainer.textContent = "";
    for (i = 0; i < library.length; i++){
        let book = library[i];
        createBookContainer(book);
    }
}

function setLocalStorage() {
    localStorage.setItem("library", JSON.stringify(library));
}

(function getLocalStorage() {
    if (localStorage.getItem("library")) {
        library = JSON.parse(localStorage.getItem("library"));
        updateLibraryContainer();
    } else {
        library = [];
    }
})();

function toggleStatus(book) {
    book.isRead = !book.isRead;
    updateLibraryContainer();
    setLocalStorage();
}

function isInLibrary(book) {
    return library.some(item => item.title === book.title && item.author === book.author);
}

function removeBookFromLibrary(book) {
    let bookIndex = library.indexOf(book);
    library.splice(bookIndex, 1);
    updateLibraryContainer();
    setLocalStorage();
}

function resetBookForm() {
    bookForm.style.display = "none";
    bookForm.reset();
    errorMessage.textContent = "";
}

function addBookToLibrary() {
    let newBook = getBookFromInput();
    if (isInLibrary(newBook)) {
        errorMessage.textContent = "* This book is already in the library";
        return;
    } else {
        library.push(newBook);
        updateLibraryContainer();
        setLocalStorage();
    }
    resetBookForm();
}

bookForm.addEventListener("submit", function(e) {
    e.preventDefault();
    addBookToLibrary();
});