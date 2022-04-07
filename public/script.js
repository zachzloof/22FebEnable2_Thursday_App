'use strict'

// import the dom
import * as DOM from './dom.js';
// let array = [];
// list item function
const writeItem = item => {
  let child = document.createElement(`li`);
  child.id = item._id;
  child.innerHTML = `${JSON.stringify(item)}`;
  DOM.listOutput.appendChild(child);
  // setTimeout(function() {
  //   child = child + " fade show";
  // }, 10);
  // setTimeout();
}
// const checkItem = item => {
//   array.push(item.id);
//   console.log(array);
// }



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
  axios.post(`/create`, {
    name: DOM.inputName.value,
    description: DOM.inputDescription.value,
    price: DOM.inputPrice.value
  })
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    });
}

const readById = () => {
  let id = DOM.inputId3.value;
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
    name: DOM.inputName2.value,
    description: DOM.inputDescription2.value,
    price: DOM.inputPrice2.value
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
  axios.delete(`/delete/` + id)
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    });
}
// store all id's in an array
// const checkAll = () => {
//   axios.get(`/read`)
//     .then((response) => {
//       if (!Array.isArray(response.data)) {
//         checkItem(response.data);
//       } else {
//         axios.delete(`/delete/` + item.id)
//           .then((response) => {
//             console.log(response);
//             get();
//           }).catch((err) => {
//             console.log(err);
//           });
//       }
//     }).catch((err) => {
//       console.log(err);
//     });
// }
// const deleteAll = () => {
//   axios.delete(`/delete/`)
//     .then((response) => {
//       console.log(response);
//     }).catch((err) => {
//       console.log(err);
//     })
// }

const darkmode = () => {
  let body = document.querySelector('body');
  body.style.color = 'lightgray';
  body.style.backgroundColor = 'black';
  document.querySelector(`html`).appendChild(body);
}

// set up the buttons' on click events
DOM.buttonCreate.onclick = () => post();
DOM.buttonRead.onclick = () => readById();
DOM.buttonReadAll.onclick = () => get();
DOM.buttonUpdate.onclick = () => updateById();
DOM.buttonDelete.onclick = () => deleteById();
DOM.buttonDeleteAll.onclick = () => checkAll();
DOM.buttonDarkMode.onclick = () => darkmode();

// run the get function on page load
get();