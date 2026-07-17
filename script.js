//Book Array
const starterBooks = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien"
    },
    {
        title: "The Fellowship of the Ring",
        author: "J.R.R. Tolkien"
    },
    {
        title: "The two Towers",
        author: "J.R.R. Tolkien"
    },
    {
        title: "Mistborn",
        author: "Brandon Sanderson"
    },
    {
        title: "The Final Empire",
        author: "Brandon Sanderson"
    },
    {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling"
    }
];

//Local Storage Added
const savedBooks = localStorage.getItem("books");

let books;

if (savedBooks === null) {
    books = starterBooks;
} else {
    books = JSON.parse(savedBooks);
}

//Variables for Searching Author and Book Title
const authorInput = 
document.getElementById("authorInput");
const searchButton = 
document.getElementById("searchButton");
const results = 
document.getElementById("results");

//Variables for Adding a New Book
const newTitleInput = 
document.getElementById("newTitleInput");
const newAuthorInput = 
document.getElementById("newAuthorInput");
const newRatingInput =
document.getElementById("newRatingInput");
const newLastReadInput =
document.getElementById("newLastReadInput");
const addBookButton = 
document.getElementById("addBookButton");

//Display Books on Screen
function displayBooks(bookArray) {

    results.innerHTML = "";

    for (let i = 0; i < bookArray.length; i++) {
        const book = bookArray[i];

        let formattedDate = "Not Recorded";

        if (book.lastRead) {
            formattedDate = new Date(book.lastRead).toLocaleDateString(
                "en-US",
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            );
    }

        results.innerHTML += `
            <div class="book-card">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>⭐ Rating:</strong> ${book.rating}/5</p>
                <p><strong>📅 Last Read:</strong> ${formattedDate}</p>
                <button onclick="deleteBook(${books.indexOf(book)})">
                    🗑 Delete
                </button>
            </div>
        `;

    }

}

//Search Button Action
searchButton.addEventListener("click", function () {

    let foundBooks = [];
    let foundBook = false;

    for (const book of books) {

        if (
            authorInput.value.trim().toLowerCase() ===
            book.author.toLowerCase()
        ) {

            foundBook = true;

            foundBooks.push(book);

        }

    }

    if (foundBook) {

        displayBooks(foundBooks);

    }

    if (!foundBook) {

        results.innerHTML = `
            <p>No books found.</p>
        `;

    }

});

//Add Book Button Action
addBookButton.addEventListener("click", function () {

    let newTitle = newTitleInput.value.trim();
    let newAuthor = newAuthorInput.value.trim();
    let newRating = Number(newRatingInput.value);
    let newLastRead = newLastReadInput.value;

    if (newTitle === "" || newAuthor === "") {
        alert("Please enter both a title and an author.");
        return;
    }

    let newBook = {
        title: newTitle,
        author: newAuthor,
        rating: newRating,
        lastRead: newLastRead 
    };

    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks(books);
    newTitleInput.value = "";
    newAuthorInput.value = "";
    newRatingInput.value = "";
    newLastReadInput.value = "";

});

//Delete Book Function
function deleteBook(index) {
    let answer = confirm(`Are you sure you want to delete "${books[index].title}"?`);
    if (answer) {
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        //Display Library When Website Loads
        displayBooks(books);
    }
    
}
//Display Library When Website Loads
displayBooks(books);