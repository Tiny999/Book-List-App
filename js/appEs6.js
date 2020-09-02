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

// Event Listeners
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

  // Show Message
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
})