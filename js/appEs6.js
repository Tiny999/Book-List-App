class Book{
  constructor (title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI{ 
  addBookToList(book){
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

  showAlert(message, className){
    
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

  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local Storage Class
class Store {
  static getBooks(){
    let books;
    if (localStorage.getItem('books') === null){
      books = []
    } else{
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks(){
    const books = Store.getBooks();
     
    books.forEach(book => {
      const ui = new UI;

      ui.addBookToList(book);
    })
  }

  static addBook(book){
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn){
    const books = Store.getBooks();
     
    books.forEach((book, index) => {
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event Listeners

document.addEventListener('DOMContentLoaded', Store.displayBooks);



document.getElementById('book-form').addEventListener('submit', function(e){
  // Get Form Values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // Instantiate a Book
  const book  = new Book(title, author, isbn);

  // Instantiate a UI object
  const ui = new UI();

  // Validate
  if(title === '' || author === '' || isbn === ''){

    // Erro Alert 
    ui.showAlert('Please Fill in All Fields', 'error');

  } else{
    // Add book to list
    ui.addBookToList(book);

    // Add to LS
    Store.addBook(book);

    // Show Alert
    ui.showAlert('Successfully Added', 'success');
  
    // Clear Fields
    ui.clearFields();
  }
  

  e.preventDefault();
});


// Remove Button Event
document.getElementById('book-list').addEventListener('click', function(e){

  // Instantiate the UI
  const ui = new UI();

  ui.deleteBook(e.target);

  // Remove From LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show Message
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
})