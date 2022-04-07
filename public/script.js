'use strict'

// import the dom
import * as DOM from './dom.js';

// list item function
const writeItem = item => {
  const child = document.createElement(`li`);
  child.id = item._id;
  child.innerHTML = `${JSON.stringify(item)}`;
  DOM.listOutput.appendChild(child);
}



// GET all function
const get = () => {
  DOM.listOutput.innerHTML = ``;

  axios.get(`/read`)
    .then((response) => {
      if (!Array.isArray(response.data)) {
        writeItem(response.data);
      } else {
        for (let item of response.data) {
          writeItem(item);
        }
      }
    }).catch((err) => {
      console.log(err);
    });
}

// POST function
const post = () => {
  axios.post(`/create`, {   name : DOM.inputName.value,
                            description : DOM.inputDescription.value, 
                            price : DOM.inputPrice.value})
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    });
}

const readById = () => {
  let id = DOM.inputId.value;
  let child = DOM.listOutput;
  id = parseInt(id);
  axios.get(`/read/` + id)
    .then((response) => {
      console.log(response);
      child.innerHTML = "";
      for (let item of response.data) {
        writeItem(item);
      }
    }).catch((err) => {
      console.log(err);
    });
}

const updateById = () => {
  let id = DOM.inputId2.value
  id = parseInt(id);
  axios.put(`/update/` + id, {
        name : DOM.inputName2.value,
        description : DOM.inputDescription2.value,
        price : DOM.inputPrice2.value
  }).then((response) => {
    console.log(response);
    get();
  }).catch((err) => {
    console.log(err);
  });
}

const deleteById = () => {
  let id = DOM.inputId.value;
  id = parseInt(id);
  axios.delete(`/delete/` + id, )
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    });
}

const darkmode = () => {
  let body = document.querySelector('body');
  body.style.color = 'lightgray0';
  body.style.backgroundColor = 'black';
  document.querySelector(`html`).appendChild(body);
}

// set up the buttons' on click events
DOM.buttonCreate.onclick = () => post();
DOM.buttonRead.onclick = () => readById();
DOM.buttonUpdate.onclick = () => updateById();
DOM.buttonDelete.onclick = () => deleteById();
DOM.buttonDarkMode.onclick = () => darkmode();

// run the get function on page load
get();