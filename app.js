//Book Constructor

function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor
function UI() {}

//Add Book to List method

UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr');
    //Add our book details to tr by adding columns
    row.innerHTML = `
    <td> ${book.title} </td>
    <td> ${book.author} </td>
    <td> ${book.isbn} </td>
    <td><a class="delete" href="#">X</a></td>
    `;

    list.appendChild(row);
}

//Show Alert Validation

UI.prototype.showAlert = function(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    const form = document.querySelector('#book-form');
    const container = document.querySelector('.container');

    container.insertBefore(div, form);

    setTimeout(function(){
        document.querySelector('.alert').remove();
      }, 3000);
}

//Clear input fields
UI.prototype.clearFields = function(title, author, isbn) {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//Delete button

UI.prototype.deleteButton = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}


//Event Listener for Add
document.getElementById('book-form').addEventListener('submit', function(e) {
    //Get Form Values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    //Instantiate New Book
    const book = new Book(title, author, isbn);

    //Insantiate UI
    const ui = new UI();

    //Show alert
    if (title === '' || author === ''|| isbn === '') {
        ui.showAlert('Please input information into the relevant fields', 'error');
    } else {
        //Add book to list
        ui.addBookToList(book);
        ui.showAlert('Great, you have successfully added a book', 'success');
        //Clear fields
        ui.clearFields(title, author, isbn);
    }

    e.preventDefault();
});


//Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
    console.log(e.target.parentElement.parentElement)
    const ui = new UI();

    ui.deleteButton(e.target);

    //Show alert
    ui.showAlert('Book Removed!', 'success')
});

