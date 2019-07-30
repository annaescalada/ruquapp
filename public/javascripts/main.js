'use strict';
const main = () => {
  // Profile page

  function editInfo () {
    const editInfoButton = document.querySelector('.edit-info');
    if (editInfoButton) {
      editInfoButton.addEventListener('click', event => {
        editInfoButton.remove();
        const inputsInfo = document.querySelectorAll('.edit-info-input');
        inputsInfo.forEach(input => {
          input.removeAttribute('disabled');
        });
        const button = document.createElement('button');
        const a = document.createElement('a');
        a.setAttribute('href', '/profile');
        a.innerHTML = 'Cancel';
        button.setAttribute('type', 'submit');
        button.innerHTML = 'Save changes';
        const formInfo = document.querySelector('.edit-info-form');
        formInfo.appendChild(button);
        formInfo.appendChild(a);
      });
    }
  }

  function editPassword () {
    const editPasswordButton = document.querySelector('.edit-password');
    if (editPasswordButton) {
      editPasswordButton.addEventListener('click', event => {
        editPasswordButton.remove();
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
  }

  // petForm page

  function removeNameIfFound () {
    const lostRadius = document.querySelector('.addPetForm input.lost');
    const foundRadius = document.querySelector('.addPetForm input.found');
    const nameLabel = document.querySelector('.addPetForm label.name');
    const nameInput = document.querySelector('.addPetForm #name');
    const requiredInputs = document.querySelectorAll('.addPetForm .required');
    if (lostRadius || foundRadius) {
      lostRadius.addEventListener('click', event => {
        if (nameLabel.hasAttribute('style')) {
          nameLabel.removeAttribute('style');
          nameInput.removeAttribute('style');
          nameInput.setAttribute('required', '');
          requiredInputs.forEach(input => {
            input.setAttribute('required', '');
          });
        }
      });
      foundRadius.addEventListener('click', event => {
        if (!nameLabel.classList.contains('displayNone')) {
          nameLabel.setAttribute('style', 'display: none');
          nameInput.setAttribute('style', 'display: none');
          nameInput.removeAttribute('required');
          requiredInputs.forEach(input => {
            input.removeAttribute('required');
          });
        }
      });
    }
  }

  removeNameIfFound();

  // Dashboard page

  function dashboardToggle () {
    const lostButton = document.querySelector('.lostToggle');
    const foundButton = document.querySelector('.foundToggle');
    const lostSectionDashboard = document.querySelector('.lostSectionDashboard');
    const foundSectionDashboard = document.querySelector('.foundSectionDashboard');
    if (lostButton || foundButton) {
      lostButton.addEventListener('click', event => {
        if (lostSectionDashboard.classList.contains('displayNone')) {
          lostSectionDashboard.classList.toggle('displayNone');
          foundSectionDashboard.classList.toggle('displayNone');
        }
      });
      foundButton.addEventListener('click', event => {
        if (foundSectionDashboard.classList.contains('displayNone')) {
          lostSectionDashboard.classList.toggle('displayNone');
          foundSectionDashboard.classList.toggle('displayNone');
        }
      });
    }
  }

  function deleteOrFoundPet () {
    const foundOrDeleteDogButton = document.querySelectorAll('.foundOrDeleteDogButton');
<<<<<<< HEAD
    // console.log(foundOrDeleteDogButton);
=======
>>>>>>> 59b98d8a74f5cd61ca320a771a371702888485a2
    if (foundOrDeleteDogButton) {
      foundOrDeleteDogButton.forEach(button => {
        button.addEventListener('click', async event => {
          const dogIDLost = event.target.parentElement.id;
<<<<<<< HEAD
          // console.log(dogIDLost);
=======
>>>>>>> 59b98d8a74f5cd61ca320a771a371702888485a2
          await axios.post(`/pet/${dogIDLost}/delete`);
          const article = event.target.parentElement;
          article.remove();
        });
      });
    }
  }

  dashboardToggle();
  deleteOrFoundPet();

  // Matches page

  function notificationsOnOff () {
    const notificationButton = document.querySelector('img.notifications');
<<<<<<< HEAD
    const dogID = notificationButton.id;
    // console.log(notificationButton);
=======
    if (notificationButton) {
      const dogID = notificationButton.id;
    }
>>>>>>> 59b98d8a74f5cd61ca320a771a371702888485a2
    if (notificationButton) {
      notificationButton.addEventListener('click', async event => {
        await axios.post(`/pet/${dogID}/notification`);
        const src = notificationButton.src;
<<<<<<< HEAD
        // console.log(src);
=======
>>>>>>> 59b98d8a74f5cd61ca320a771a371702888485a2
        if (src.includes('true')) {
          notificationButton.src = '/images/notifications-false.png';
        } else {
          notificationButton.src = '/images/notifications-true.svg';
        }
      });
    }
  }

  notificationsOnOff();

  // delete match
  // send information
  // list map toggle
  // map

  editInfo();
  editPassword();
};

window.addEventListener('load', main);
