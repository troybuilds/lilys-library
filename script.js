//Book Array
const starterBooks = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        series: "Middle-earth", 
        rating: 5,
        lastRead: "2026-05-09",
        favorite: false
    },
    {
        title: "The Fellowship of the Ring",
        author: "J.R.R. Tolkien",
        series: "The Lord of the Rings",
        rating: 2,
        lastRead: "2026-06-24",
        favorite: false
    },
    {
        title: "The Two Towers",
        author: "J.R.R. Tolkien",
        series: "The Lord of the Rings",
        rating: 4,
        lastRead: "2026-07-01",
        favorite: false
    },
    {
        title: "The Well of Ascension",
        author: "Brandon Sanderson",
        series: "Mistborn Era 1",
        rating: 4,
        lastRead: "2026-03-17",
        favorite: false
    },
    {
        title: "The Final Empire",
        author: "Brandon Sanderson",
        series: "Mistborn Era 1",
        rating: 2,
        lastRead: "2026-03-17",
        favorite: false
    },
    {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        series: "Harry Potter",
        rating: 3,
        lastRead: "2026-05-14",
        favorite: false
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

// Variables for Searching by Author, Title, or Series
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
const newSeriesInput = 
document.getElementById("newSeriesInput");
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

        let favoriteDisplay = book.favorite ? "❤️" : "🤍";

        let seriesDisplay =
            book.series === "" ? "Standalone" : book.series;

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
                <p><strong>Series:</strong> ${seriesDisplay}</p>
                <p><strong>⭐ Rating:</strong> ${book.rating}/5</p>
                <p><strong>📅 Last Read:</strong> ${formattedDate}</p>
                <button onclick="toggleFavorite(${i})">${favoriteDisplay}</button>
                <button onclick="deleteBook(${books.indexOf(book)})">🗑 Delete</button>
            </div>
        `;

    }

}

//Search Button Action
searchButton.addEventListener("click", function () {

    let foundBooks = [];
    let foundBook = false;

    let searchText = authorInput.value.trim().toLowerCase();

    for (const book of books) {

        if (
            book.author.toLowerCase().includes(searchText) ||
            book.title.toLowerCase().includes(searchText) ||
            book.series.toLowerCase().includes(searchText)
        ) {

            foundBook = true;

            foundBooks.push(book);

        }

    }

    if (foundBook) {

        displayBooks(foundBooks);

    } else {

        results.innerHTML = `
            <p>No books found.</p>
        `;

    }

});

//Add Book Button Action
addBookButton.addEventListener("click", function () {

    let newTitle = newTitleInput.value.trim();
    let newAuthor = newAuthorInput.value.trim();
    let newSeries = newSeriesInput.value.trim();
    let newRating = Number(newRatingInput.value);
    let newLastRead = newLastReadInput.value;

    if (newTitle === "" || newAuthor === "") {
        alert("Please enter both a title and an author.");
        return;
    }

    let newBook = {
        title: newTitle,
        author: newAuthor,
        series: newSeries,
        rating: newRating,
        lastRead: newLastRead,
        favorite: false 
    };

    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks(books);
    newTitleInput.value = "";
    newAuthorInput.value = "";
    newSeriesInput.value = "";
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

//Toggle Favorite Book
function toggleFavorite(index) {
    books[index].favorite = !books[index].favorite;

    localStorage.setItem("books", JSON.stringify(books));

    displayBooks(books);
}

//Display Library When Website Loads
displayBooks(books);