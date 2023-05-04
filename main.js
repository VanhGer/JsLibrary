class Book{
    constructor(title, author, pages, isRead = false) {
        this.title = title;
        this.author =  author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

class Library {
    constructor() {
        this.books = [];
    }
    
    addBook(newBook) {
        if (!this.isAlreadyIn(newBook))  this.books.push(newBook);
        else alert("This book is already in your library.")
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title);
    }

    getBook(title) {
        return this.books.filter((book) => book.title === title);
    }

    isAlreadyIn(newBook) {
        return this.books.some((book) => book.title === newBook.title);
    }

    indexOf(book) {
        if (this.isAlreadyIn(book)) {
            return this.books.indexOf(book);
        }
    }

    copy(lib) {
        this.books = lib.books;
    }

}

let myLib = new Library();
const bookShelf = document.getElementById('bookshelf');
const addBookBtn = document.getElementById('addBookBtn');
const popUp = document.getElementById('popUp');
const closePopUp = document.getElementsByTagName('span')[0];
const submitBtn = document.getElementById('addBtn');
const bookForm = document.getElementById('bookform');

addBookBtn.addEventListener('click', () => {
    popUp.style.transform = "scale(1)";
    bookForm.reset();
});

closePopUp.addEventListener('click', () => {
    popUp.style.transform = "scale(0)";
});

function getBookFromInput() { 
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('read').checked;


    return new Book(title, author, pages, isRead);
}

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    popUp.style.transform = "scale(0)";
    newBook = getBookFromInput();
    myLib.addBook(newBook);
    setData();
    showShelf();
})

function showShelf() {
    bookShelf.innerHTML = '';
    for (let book of myLib.books) {
        renderBook(book);
    }
}

function renderBook(book) {  
    const bookCard = document.createElement('div');
    const title = document.createElement('div');
    const author = document.createElement('div');
    const pages = document.createElement('div');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    bookCard.classList.add('book-card');
    readBtn.classList.add('btn');
    removeBtn.classList.add('btn');
    title.classList.add('title');
    author.classList.add('author');
    pages.classList.add('pages');

    bookCard.setAttribute('id', myLib.books.indexOf(book));
    removeBtn.setAttribute('id', 'removeBtn');

    title.textContent =  `"${book.title}"`;
    author.textContent = "by " + book.author;
    pages.textContent = book.pages + " pages";

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    if (book.isRead === false) {
        readBtn.textContent = "Not Read";
    } else {
        readBtn.textContent = "Read";
    }

    removeBtn.textContent = "Remove";
    bookCard.appendChild(readBtn);
    bookCard.appendChild(removeBtn);
    bookShelf.appendChild(bookCard);

    removeBtn.addEventListener('click', () => {
        myLib.books.splice(myLib.indexOf(book),1);
        setData();
        showShelf();
    });

    //add toggle ability to each book 'read' button on click
    readBtn.addEventListener('click', () => { 
        book.isRead = !book.isRead;
        setData(); 
        showShelf();
    }); 

}

function setData() {  
    localStorage.removeItem('myLib');
    localStorage.setItem('myLib', JSON.stringify(myLib));
}

function restore() {
    if (!localStorage.myLib) {
        showShelf();
    } else {
        let obj = JSON.parse(localStorage.getItem('myLib'));
        myLib.copy(obj);
        showShelf();
    }
}

restore()