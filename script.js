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
const addBookButton = 
document.getElementById("addBookButton");

//Display Books on Screen
function displayBooks() {

    results.innerHTML = "";

    for (let i = 0; i < books.length; i++) {
        const book = books[i];

        results.innerHTML += `
            <div class="book-card">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>⭐ Rating:</strong> Coming Soon</p>
                <p><strong>📅 Last Read:</strong> Coming Soon</p>
                <button onclick="deleteBook(${i})">
                    🗑 Delete
                </button>
            </div>
        `;

    }

}

//Search Button Action
searchButton.addEventListener("click", function () {

    let foundBook = false;

    results.innerHTML = `
        <h3>Searching for:</h3>
        <p>${authorInput.value}</p>
    `;

    for (const book of books) {
        if(authorInput.value.trim().toLowerCase() === 
            book.author.toLowerCase()
        ) {
            foundBook = true;

            results.innerHTML += `
                <p>${book.title}</p>
            `;

        }

    }

    if (!foundBook) {
        results.innerHTML += `
            <p>No books found.</p>
        `;
    }

});

//Addde Book Button Action
addBookButton.addEventListener("click", function () {

    let newTitle = newTitleInput.value.trim();
    let newAuthor = newAuthorInput.value.trim();

    if (newTitle === "" || newAuthor === "") {
        alert("Please enter both a title and an author.");
        return;
    }

    let newBook = {
        title: newTitle,
        author: newAuthor
    };

    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
    console.log(books);

    newTitleInput.value = "";
    newAuthorInput.value = "";

});

//Added Delete Book Action
function deleteBook(index) {
    let answer = confirm(`Are you sure you want to delete "${books[index].title}?"`);
    if (answer) {
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        displayBooks();
    }
    
}
displayBooks();