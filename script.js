function Book(title, author, pages, read) {
	this.id = bookId;
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function () {
		return {
			id,
			title,
			author,
			pages,
			read,
		};
	};
}

const bookForm = document.getElementById('addBook');
const bookModal = document.getElementById('bookModal');
const myLibrary = [];
let bookId = 0;

addBookToLibrary(new Book('Elon Musk', 'Walter Issacson', 688, false));
addBookToLibrary(new Book('Think Straight: Change Your Thoughts, Change Your Life', 'Darius Foroux', 100, true));
addBookToLibrary(new Book("Can't Hurt Me: Master Your Mind and Defy the Odds", 'David Goggins', 364, false));

bookForm.addEventListener('submit', () => {
	let booktitle = document.getElementById('booktitle').value;
	let bookauthor = document.getElementById('bookauthor').value;
	let bookpages = document.getElementById('bookpages').value;
	let bookhaveread = document.getElementById('bookhaveread').checked;
  addBookToLibrary(new Book(booktitle, bookauthor, bookpages, bookhaveread));
});

function addBookToLibrary(newBook) {
	myLibrary.push(newBook);
	bookId++;

	// HTML stuff
	let bookCard = document.createElement('div');
	bookCard.style.width = '15rem';
	bookCard.classList.add('card');
	bookCard.classList.add('m-2');

	let bookCardBody = document.createElement('div');
	bookCardBody.classList.add('card-body');

	let title = document.createElement('h5');
	title.classList.add('card-title');
	title.innerHTML = newBook.title;
	bookCardBody.appendChild(title);

	let author = document.createElement('h6');
	author.classList.add('card-subtitle');
	author.classList.add('mb-2');
	author.classList.add('text-body-secondary');
	author.innerHTML = newBook.author;
	bookCardBody.appendChild(author);

	let pages = document.createElement('p');
	pages.classList.add('card-text');
	pages.innerHTML = `${newBook.pages} pages`;
	bookCardBody.appendChild(pages);

	// let haveReadInput = document.createElement("input");
	// haveReadInput.type = "checkbox";
	// haveReadInput.classList.add('btn-check');
	// haveReadInput.setAttribute("id", `${newBook.id}`);
	// bookCardBody.appendChild(haveReadInput);

	// let haveReadLabel = document.createElement("label");
	// haveReadLabel.classList.add('btn');
	// haveReadLabel.classList.add('btn-outline-primary');
	// haveReadLabel.setAttribute('for', `${newBook.id}`);
	// haveReadLabel.innerHTML = 'Read';
	// bookCardBody.appendChild(haveReadLabel);

	let haveRead = document.createElement('button');
	haveRead.setAttribute('type', 'button');
	haveRead.setAttribute('data-bs-toggle', 'button');
	haveRead.classList.add('btn');
	haveRead.classList.add('btn-outline-primary');

	if (newBook.read) {
		haveRead.setAttribute('aria-pressed', 'true');
		haveRead.classList.add('active');
	}
	haveRead.innerHTML = 'Read';
	bookCardBody.appendChild(haveRead);

	bookCard.append(bookCardBody);

	let books = document.getElementById('books');
	books.appendChild(bookCard);
}
