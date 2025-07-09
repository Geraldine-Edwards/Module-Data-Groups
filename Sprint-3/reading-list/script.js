// for the tests, do not modify this array of books
const books = [
  {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    alreadyRead: false,
    bookCoverImage: "https://blackwells.co.uk/jacket/l/9780465050659.jpg",
  },
  {
    title: "The Most Human Human",
    author: "Brian Christian",
    alreadyRead: true,
    bookCoverImage:
      "https://images-na.ssl-images-amazon.com/images/I/41m1rQjm5tL._SX322_BO1,204,203,200_.jpg",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    alreadyRead: true,
    bookCoverImage: "https://blackwells.co.uk/jacket/l/9780135957059.jpg",
  },
];

//get the <ul> element with id reading-list from the DOM
const readingList = document.querySelector("#reading-list");

//create a list item element (for each book in the array of book objects) with a title & author text and the book cover image
books.forEach((book) => {
  //create the list item element for each book in the array
  const listItem = document.createElement("li");

  //set the class of the list item based on whether the book has been read or not
  listItem.className = book.alreadyRead ? "already-read" : "not-read";

  //create a text element for the book title and author
  const bookText = document.createElement("p");
  bookText.innerText = `${book.title} by ${book.author}`;

  //create the image element for the book cover
  const coverImg = document.createElement("img");
  coverImg.src = book.bookCoverImage;

  //append text and image to the list item
  listItem.appendChild(bookText);
  listItem.appendChild(coverImg);

  //append the list item to the reading list
  readingList.appendChild(listItem);
});
