const form = document.querySelector('#contactForm'); //form 
const tableBody = document.querySelector('#contactTable tbody'); //contact print in tbody

let contacts = []; //store the contacts

function addContactToTable(contact) {
  const row = tableBody.insertRow(); //adding a row
  const nameCell = row.insertCell();  //name
  const emailCell = row.insertCell(); //email
  const phoneCell = row.insertCell();  //phone
  const actionsCell = row.insertCell(); 

  nameCell.textContent = contact.name;
  emailCell.textContent = contact.email;
  phoneCell.textContent = contact.phone;

  const editButton = document.createElement('button'); //creating a button
  editButton.textContent = 'Edit';  //edit
  editButton.classList.add('btn', 'btn-primary', 'mr-2');
  editButton.addEventListener('click', () => {
    editContact(contact);  //edit the contact
  });

  const deleteButton = document.createElement('button'); 
  deleteButton.textContent = 'Delete'; //delete
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.addEventListener('click', () => {
    deleteContact(contact);  //delete the contact
  });

  actionsCell.appendChild(editButton);
  actionsCell.appendChild(deleteButton);
}

function renderContacts() {  //render the contacts in the table

  tableBody.innerHTML = '';  

  contacts.forEach((contact) => { // add contact to the table
    addContactToTable(contact);
  });
}


function addContact(contact) {  //contacts array and local storage
  contacts.push(contact);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  renderContacts();
}

function editContact(contact) {  //edit a contact in the contacts array
  const index = contacts.findIndex((c) => c.id === contact.id);
  const newContact = {
    ...contact,
    name: prompt('Enter name', contact.name),  //edit the name
    email: prompt('Enter email', contact.email), //edit the email
    phone: prompt('Enter phone', contact.phone),  //edit the phone
  };
  contacts.splice(index, 1, newContact);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  renderContacts();
}

function deleteContact(contact) { // delete a contact from the array
  const index = contacts.findIndex((c) => c.id === contact.id);
  contacts.splice(index, 1);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  renderContacts();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();  //form submission

  // get the form data
  const name = form.name.value;
  const email = form.email.value;
  const phone = form.phone.value;

  // create a new contact object
  const contact = {
    id: Date.now(),
    name,
    email,
    phone,
  };

  // add the contact to the table and local storage
  addContact(contact);

  // reset the form
  form.reset();
});

// initialize the contacts array from local storage
const storedContacts = localStorage.getItem('contacts');
if (storedContacts) {
  contacts = JSON.parse(storedContacts);
}

// render the contacts in the table
renderContacts();
