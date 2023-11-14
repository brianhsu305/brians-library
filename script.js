function Book(title, author, pages, isRead) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.isRead = isRead;
}

function Library() {
	this.books = [];

	this.addBook = (book) => {
		this.books.push(book);
	};
	this.removeBook = (title) => {
		for (let i = 0; i < this.books.length; i++) {
			if (this.books[i].title === title) {
				this.books.splice(i, 1);
			}
		}
	};
	this.getBook = (title) => {
		for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].title === title) return this.books[i];
    }
  }
}

const books = document.getElementById('books');
const bookForm = document.getElementById('addBook');
const bookModal = document.getElementById('bookModal');

const myLibrary = new Library();



bookForm.onsubmit = (e) => {
  e.preventDefault();
	addBookToLibrary();
	$('#bookModal').modal('hide');
	bookForm.reset();
};

function getBookFromInput() {
	const title = document.getElementById('booktitle').value;
	const author = document.getElementById('bookauthor').value;
	const pages = document.getElementById('bookpages').value;
	const isRead = document.getElementById('bookhaveread').checked;
	return new Book(title, author, pages, isRead);
}

function addBookToLibrary() {
	myLibrary.addBook(getBookFromInput());
  updateBooks();
}

const readToggle  = (e) => {
  const title = e.target.parentNode.firstChild.textContent;
  const book = myLibrary.getBook(title);
  book.isRead = !book.isRead;
  updateBooks();
}

const removeBook = (e) => {
  const title = e.target.parentNode.firstChild.textContent;
  const book = myLibrary.removeBook(title);
  updateBooks();
}

function resetBooks() {
  books.innerHTML = '';
}

function updateBooks() {
  resetBooks();

	myLibrary.books.forEach((book) => {
		let bookCard = document.createElement('div');
		let bookCardBody = document.createElement('div');
		let title = document.createElement('h5');
		let author = document.createElement('h6');
		let pages = document.createElement('p');
		let isRead = document.createElement('button');
		let remove = document.createElement('button');
		let books = document.getElementById('books');

		bookCard.style.width = '15rem';
		bookCard.classList.add('card');
		bookCard.classList.add('m-2');
		bookCardBody.classList.add('card-body');

		title.classList.add('card-title');
		author.classList.add('card-subtitle');
		author.classList.add('mb-2');
		author.classList.add('text-body-secondary');
		pages.classList.add('card-text');
		isRead.setAttribute('type', 'button');
		isRead.setAttribute('data-bs-toggle', 'button');
		isRead.classList.add('btn');
    remove.classList.add('btn');
		isRead.classList.add('btn-outline-primary');
    remove.classList.add('btn-outline-primary');
		if (book.isRead) {
			isRead.classList.add('active');
		}

		title.textContent = book.title;
		author.textContent = book.author;
		pages.textContent = `${book.pages} pages`;
		isRead.textContent = 'Read';
		remove.textContent = 'Remove';

    isRead.onclick = readToggle;
    remove.onclick = removeBook;

		bookCardBody.appendChild(title);
		bookCardBody.appendChild(author);
		bookCardBody.appendChild(pages);
		bookCardBody.appendChild(isRead);
		bookCardBody.appendChild(remove);
		bookCard.append(bookCardBody);
		books.appendChild(bookCard);
	});
}


myLibrary.addBook(new Book('Think Straight: Change Your Thoughts, Change Your Life', 'Darius Foroux', 100, true));
myLibrary.addBook(new Book("Can't Hurt Me: Master Your Mind and Defy the Odds", 'David Goggins', 364, false));
updateBooks();