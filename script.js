const modal = document.getElementById('modal');
const newBookBtn = document.querySelector('.new-book');
const span = document.getElementsByClassName('close')[0];
const formContainer = document.querySelector('.form-container');
const author =  document.getElementById('author');
const title = document.getElementById('title');
const pages = document.getElementById('pages'); 
const readStatus = document.getElementById('readStatus'); 
const submitBtn = document.getElementById('submitBtn');
const tableCont = document.querySelector('.table-container');
const table = document.querySelector('.table');

let myLibrary = [];


//Book object class

class Book {
  constructor(author, title, pages, bookStatus) {
    this.id = title;
    this.author =  author;
    this.title = title;
    this.pages = pages;
    this.bookStatus = bookStatus;
  }
  changeStatus() {
    if (this.bookStatus === 'not read') {
      this.bookStatus = 'read';
    } else {
      this.bookStatus = 'not read';
    }
  }

  getReadStatus() {
    return this.bookStatus;
  }
}


//Open the modal on user click

newBookBtn.onclick = function() {
  modal.style.display = "block";
}


// When the user clicks on <span> (x), close the modal

span.addEventListener('click', hideModal);


// When the user clicks anywhere outside of the modal, close it

window.onclick = function(e) {
  if (e.target == modal) hideModal(); 
}


//Create entry when user clicks "Submit"

submitBtn.addEventListener('click', createEntry);


function resetForm() {
  document.forms[0].reset();
}

function hideModal() {
  modal.style.display = "none";
}

let id = 0;

// let book = {};

function createEntry(e) {
  e.preventDefault();
  if (pages.value.includes('-') || pages.value === '' || author.value === '' || title.value === '' || readStatus.value === '') return;
  else {
    book = new Book(author.value, title.value, pages.value, readStatus.value);
    myLibrary.push(book);
    book.id = myLibrary.indexOf(book) + 1;
    
    const entry = document.createElement('tr'); 
    const removeBtnCell = document.createElement('td');
    entry.appendChild(removeBtnCell);

    const removeBtn = document.createElement('i');
    removeBtn.classList.add('far');
    removeBtn.classList.add('fa-times-circle');
    removeBtn.setAttribute('data-id', book.id);
    removeBtnCell.appendChild(removeBtn);
    


    const nrCell = document.createElement('td');
    nrCell.textContent = myLibrary.indexOf(book) + 1;
    nrCell.classList.add('numberCell');

    objectId = Number(book.id);

    entry.appendChild(nrCell);
  
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
  
    const statusBtn = document.createElement('div');
    statusBtn.textContent = readStatus.value;
    statusBtn.classList.add('statusButton');
    if (readStatus.value === 'read') {
      statusBtn.classList.add('green')
    }
    if (readStatus.value === 'not read') {
      statusBtn.classList.add('red')
    }
    statusBtn.setAttribute('id', book.id);
    statusCell.appendChild(statusBtn);

    

    table.appendChild(entry);
    
    resetForm();
  }
  myLibrary[myLibrary.length - 1].id = objectId;
  hideModal();
}


table.addEventListener('click', (e) => {
  
  let statusBtnId = e.target.id;
  let removeBtnId = e.target.dataset.id;
  let index;
 

  // change the text content and class of the button
  if (e.target.className === 'far fa-times-circle') {
    index = myLibrary.findIndex(item => item.id == removeBtnId);
    myLibrary.splice(index, 1);
    e.target.closest('tr').remove();
    reassignBookId();
    reassignRemoveBtnId();
    reassignStatusBtnId();
    updateNrCell();

  } else if (e.target.textContent === 'read') {
    statusBtnId = e.target.id;
    index = myLibrary.findIndex(item => item.id == statusBtnId);
   e.target.textContent = 'not read';
   e.target.classList.remove('green');
   e.target.classList.add('red');
   myLibrary[index].readStatus = e.target.textContent;

  } else if (e.target.textContent === 'not read') {
    statusBtnId = e.target.id;
    index = myLibrary.findIndex(item => item.id == statusBtnId);
    e.target.textContent = 'read';
    e.target.classList.remove('red');
    e.target.classList.add('green');
    myLibrary[index].readStatus = e.target.textContent;
    
  } else return
})


function reassignBookId() {
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].id = i + 1;
  }
}

function reassignRemoveBtnId() {
  let removeButtons = Array.from(document.getElementsByClassName('far'));
  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].dataset.id = i + 1;
  }
}

function reassignStatusBtnId() {
  let statusButtons = Array.from(table.getElementsByClassName('statusButton'));
  for (let i = 0; i < statusButtons.length; i++) {
    statusButtons[i].id = i + 1;
  }
}


function updateNrCell() {
  let nrCells = Array.from(table.getElementsByClassName('numberCell'));
  for (let i = 0; i < nrCells.length; i++) {
    nrCells[i].textContent = i + 1;
  }
}

