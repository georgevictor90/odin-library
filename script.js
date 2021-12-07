const modal = document.getElementById('modal');
const newBookBtn = document.querySelector('.new-book');
const span = document.getElementsByClassName('close')[0];
const formContainer = document.querySelector('.form-container');
const bookList = document.querySelector('.book-list');
const author =  document.getElementById('author');
const title = document.getElementById('title');
const pages = document.getElementById('pages'); 
const readStatus = document.getElementById('readStatus'); 
const submitBtn = document.getElementById('submitBtn');
const gridCont = document.querySelector('.grid-container');


// When the user clicks on the button, open the modal
newBookBtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

let myLibrary = [];

function Book(author, title, pages, readStatus) {
  this.id = title;
  this.author =  author;
  this.title = title;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.changeStatus = function() {
  if (this.readStatus === 'Not read yet') {
    this.readStatus = 'Read';
  } else {
    this.readStatus = 'Not read yet';
  }
  //then also update the display;
}

function addBookToLibrary() {

}

// const createEntry = (e) => {
//   e.preventDefault();
//   if (pages.value.includes('-') || pages.value === '' || author.value === '' || title.value === '' || readStatus.value === '') {
//     return
//   } else {
//     book = new Book(author.value, title.value, pages.value, readStatus.value);
//     const entry1 = document.createElement('li');
//     entry1.innerHTML = book.title + ', <br>by ' + book.author;
//     bookList.appendChild(entry1);
//     myLibrary.push(book);
//     document.forms[0].reset();
//   }
//   modal.style.display = "none";
//   console.table(myLibrary);
// }



// const createEntry = (e) => {
//   e.preventDefault();
//   if (pages.value.includes('-') || pages.value === '' || author.value === '' || title.value === '' || readStatus.value === '') {
//     return
//   } else {
//     book = new Book(author.value, title.value, pages.value, readStatus.value);
//     const entry1 = document.createElement('div');
//     entry1.innerHTML = book.title + ', <br>by ' + book.author;
//     entry1.classList.add('grid-item');
//     gridCont.appendChild(entry1);
//     myLibrary.push(book);
//     document.forms[0].reset();
//   }
//   modal.style.display = "none";
//   console.table(myLibrary);
// }

const tableCont = document.querySelector('.table-container');
const table = document.querySelector('.table');

const createEntry = (e) => {
  e.preventDefault();
  if (pages.value.includes('-') || pages.value === '' || author.value === '' || title.value === '' || readStatus.value === '') {
    return
  } else {
    book = new Book(author.value, title.value, pages.value, readStatus.value);
    const entry = document.createElement('tr');

    const titleCell = document.createElement('td');
    titleCell.textContent = title.value;
    entry.appendChild(titleCell);

    const authorCell = document.createElement('td');
    authorCell.textContent = author.value;
    entry.appendChild(authorCell);

    const pagesCell = document.createElement('td');
    pagesCell.textContent = pages.value;
    entry.appendChild(pagesCell);

    const statusCell = document.createElement('td');
    entry.appendChild(statusCell);
    const statusBtn = document.createElement('button');
    statusBtn.textContent = readStatus.value;
    statusCell.appendChild(statusBtn);
    

    entry.appendChild(statusCell);

    table.appendChild(entry);

    myLibrary.push(book);
    
    document.forms[0].reset();
  }
  modal.style.display = "none";
  console.table(myLibrary);
}

submitBtn.addEventListener('click', createEntry);




