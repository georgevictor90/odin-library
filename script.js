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


//Book object constructor

function Book(author, title, pages, readStatus) {
  this.id = title;
  this.author =  author;
  this.title = title;
  this.pages = pages;
  this.readStatus = readStatus;
}


//Book prototype function

Book.prototype.changeStatus = function() {
  console.log(readStatus.value);
  if (readStatus.value === 'not read') {
    readStatus.value = 'read';
  } else {
    readStatus.value = 'not read';
  }
  console.log(readStatus.value);
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

let book = {};

function createEntry(e) {
  e.preventDefault();
  if (pages.value.includes('-') || pages.value === '' || author.value === '' || title.value === '' || readStatus.value === '') return;
  else {
    book = new Book(author.value, title.value, pages.value, readStatus.value);
    myLibrary.push(book);
    
    const entry = document.createElement('tr'); 

    const nrCell = document.createElement('td');
    nrCell.textContent = myLibrary.indexOf(book) + 1;

    objectId = Number(nrCell.textContent);

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
    if (readStatus.value === 'read') {
      statusBtn.classList.add('green')
    }
    if (readStatus.value === 'not read') {
      statusBtn.classList.add('red')
    }
    statusBtn.setAttribute('id', objectId);
    statusCell.appendChild(statusBtn);
    table.appendChild(entry);
    
    resetForm();
  }
  myLibrary[myLibrary.length - 1].id = objectId;
  hideModal();
}


table.addEventListener('click', (e) => {
  let buttonId = Number(e.target.id);

  // change the text content and class of the button
  if (e.target.textContent === 'read') {
   e.target.textContent = 'not read';
   e.target.classList.remove('green');
   e.target.classList.add('red');

  } else if (e.target.textContent === 'not read') {
    e.target.textContent = 'read';
    e.target.classList.remove('red');
    e.target.classList.add('green');
    
  }
  // find object with id value of buttonId in the myLibrary array
  const index = myLibrary.findIndex(item => item.id == buttonId);

  // change that object's readStatus to the text content of the button
  myLibrary[index].readStatus = e.target.textContent;
})








