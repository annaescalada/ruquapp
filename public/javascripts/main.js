'use strict';
const main = () => {
  // Profile page
  function editInfo () {
    const editInfoButton = document.querySelector('.edit-info');
    editInfoButton.addEventListener('click', event => {
      const inputsInfo = document.querySelectorAll('.edit-info-input');
      inputsInfo.forEach(input => {
        input.removeAttribute('disabled');
      });
      const button = document.createElement('button');
      button.setAttribute('type', 'submit');
      button.innerHTML = 'Save changes';
      // const mailInput = document.querySelector('#email');
      // mailInput.innerHTML = mailInput.value;
      const formInfo = document.querySelector('.edit-info-form');
      formInfo.appendChild(button);
    });
  }

  function editPassword () {
    const editPasswordButton = document.querySelector('.edit-password');
    editPasswordButton.addEventListener('click', event => {
      const inputPassword = document.querySelector('.edit-password-input');
      inputPassword.removeAttribute('disabled');
      inputPassword.removeAttribute('value');
      const button = document.createElement('button');
      const a = document.createElement('a');
      a.setAttribute('href', '/profile');
      a.innerHTML = 'Cancel';
      button.setAttribute('type', 'submit');
      button.innerHTML = 'Save changes';
      const formPassword = document.querySelector('.edit-password-form');
      formPassword.appendChild(button);
      formPassword.appendChild(a);
    });
  }
  // Dashboard page

  // Delete pet and found
  // Lost found toggle

  // Matches page
  // notification on and off
  // delete match
  // send information
  // list map toggle
  // map

  editInfo();
  editPassword();
};

window.addEventListener('load', main);
