let library = [];

function Book(title, author, isRead) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
}

const bookForm = document.getElementById("book-form");

const newBookBtn = document.getElementById("new-book-btn");

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

}

function updateLibraryContainer() {

}

function toggleStatus(book) {

}

function isInLibrary(newBook) {
    return library.some(book => book.title === newBook.title && book.author === newBook.author);
}

function removeBookFromLibrary(book) {
    
}

function addBookToLibrary() {
    let newBook = getBookFromInput();
    if (isInLibrary(newBook)) {
        errorMessage.textContent = "* This book is already in the library";
        return;
    } else {
        library.push(newBook);
        console.log(newBook);
    }
}

bookForm.addEventListener("submit", function(e) {
    e.preventDefault();
    addBookToLibrary();
});