
class Book{
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    addBookToList(book) {
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

    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
    
        const form = document.querySelector('#book-form');
        const container = document.querySelector('.container');
    
        container.insertBefore(div, form);
    
        setTimeout(function(){document.querySelector('.alert').remove()}, 3000);
    }

    clearFields(title, author, isbn) {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    deleteButton(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

}


class Store{
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else  {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book) {
            const ui = new UI();

            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
    
        books.forEach(function(book, index){
         if(book.isbn === isbn) {
            books.splice(index, 1);
         }
        });
        
        localStorage.setItem('books', JSON.stringify(books));
      }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event Listener for Add
document.getElementById('book-form').addEventListener('submit', function(e) {
    console.log(e.target);
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
        //Add book to LS
        Store.addBook(book);
        ui.showAlert('Great, you have successfully added a book', 'success');
        //Clear fields
        ui.clearFields(title, author, isbn);
    }

    e.preventDefault();
});


//Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI();

    ui.deleteButton(e.target);

    // Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    console.log(e.target.parentElement.previousElementSibling.textContent);

    //Show alert
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
});

