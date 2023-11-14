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
			if (this.books[i].title === title) this.books.splice(i, 1);
		}
	};

	this.getBook = (title) => {
		for (let i = 0; i < this.books.length; i++) {
			if (this.books[i].title === title) return this.books[i];
		}
	};
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
	return false;
};

const addBookToLibrary = () => {
	myLibrary.addBook(getBookFromInput());
	updateBooks();
};

const getBookFromInput = () => {
	const title = document.getElementById('booktitle').value;
	const author = document.getElementById('bookauthor').value;
	const pages = document.getElementById('bookpages').value;
	const isRead = document.getElementById('bookhaveread').checked;
	return new Book(title, author, pages, isRead);
};

const readToggle = (e) => {
	const title = e.target.parentNode.parentNode.firstChild.textContent;
	const book = myLibrary.getBook(title);
	book.isRead = !book.isRead;
	updateBooks();
};

const removeBook = (e) => {
	const title = e.target.parentNode.parentNode.firstChild.textContent;
	myLibrary.removeBook(title);
	updateBooks();
};

const updateBooks = () => {
	resetBooks();

	myLibrary.books.forEach((book) => {
		let bookCard = document.createElement('div');
		let bookCardBody = document.createElement('div');
		let title = document.createElement('h5');
		let author = document.createElement('h6');
		let pages = document.createElement('p');
		let buttonGroup = document.createElement('div');
		let isRead = document.createElement('button');
		let remove = document.createElement('button');
		let books = document.getElementById('books');

		bookCard.style.width = '15rem';
		bookCard.classList.add('card');
		bookCard.classList.add('m-2');
		bookCardBody.classList.add('card-body');
		bookCardBody.classList.add('text-center');
		bookCardBody.classList.add('d-flex');
		bookCardBody.classList.add('flex-column');

		title.classList.add('card-title');
		author.classList.add('card-subtitle');
		author.classList.add('mb-2');
		author.classList.add('text-body-secondary');
		pages.classList.add('card-text');
		buttonGroup.classList.add('d-flex');
		buttonGroup.classList.add('justify-content-around');
		buttonGroup.classList.add('mt-auto');
		isRead.classList.add('btn');
		isRead.classList.add('btn-outline-success');
		isRead.setAttribute('type', 'button');
		isRead.setAttribute('data-bs-toggle', 'button');
		remove.classList.add('btn');
		remove.classList.add('btn-outline-danger');
		remove.setAttribute('type', 'button');
		remove.setAttribute('data-bs-toggle', 'button');
		if (book.isRead) {
			isRead.classList.add('active');
			isRead.setAttribute('aria-pressed', 'true');
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
		buttonGroup.appendChild(isRead);
		buttonGroup.appendChild(remove);
		bookCardBody.appendChild(buttonGroup);
		bookCard.append(bookCardBody);
		books.appendChild(bookCard);
	});
};

const resetBooks = () => {
	books.innerHTML = '';
};