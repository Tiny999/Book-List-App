// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


// UI Constructor
function UI() {}


UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');

  // Create a tr element
  const row = document.createElement('tr');

  // Insert Columns 
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td> <a href="X" class="delete">X</a> </td>
  `;

  list.appendChild(row);
}

// Show Alert 
UI.prototype.showAlert = function (message, className) {

  // Create a div
  const div = document.createElement('div');
  div.className = `alert ${className}`;

  // Add the Text 
  div.appendChild(document.createTextNode(message));

  // Insert Into Div
  const container = document.querySelector('.container'),
    form = document.querySelector('#book-form');

  container.insertBefore(div, form);

  // Timeout after 3 seconds
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);

}

// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}


// Local Storage Constructor
function Storage() {}

Storage.prototype.getBooks = function () {
  let books;
  if (localStorage.getItem('books') === null) {
    books = []
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  return books;
}

Storage.prototype.displayBooks = function () {
  const books = this.getBooks();

  books.forEach(book => {
    const ui = new UI();

    ui.addBookToList(book);
  })
}

Storage.prototype.addBook = function (book) {
  const books = this.getBooks();

  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));
}

Storage.prototype.removeBook = function (isbn) {
  const books = this.getBooks();

  books.forEach((book, index) => {
    if (book.isbn === isbn) {
      books.splice(index, 1);
    }
  });

  localStorage.setItem('books', JSON.stringify(books));
}


// Event Listeners

document.addEventListener('DOMContentLoaded', function(){
  const store = new Storage();
  store.displayBooks();
})


document.getElementById('book-form').addEventListener('submit', function (e) {
  // Get Form Values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  // Instantiate a Book
  const book = new Book(title, author, isbn);

  // Instantiate a UI object
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {

    // Erro Alert 
    ui.showAlert('Please Fill in All Fields', 'error');

  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add to Ls
    const store = new Storage();
    store.addBook(book);

    // Show Alert
    ui.showAlert('Successfully Added', 'success');

    // Clear Fields
    ui.clearFields();
  }


  e.preventDefault();
});


// Remove Button Event
document.getElementById('book-list').addEventListener('click', function (e) {

  // Instantiate the UI
  const ui = new UI();

  // Remove Book
  ui.deleteBook(e.target);

  // Remove from LS
  const store = new Storage();
  store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show Message
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
})