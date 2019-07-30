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
    if (foundOrDeleteDogButton) {
      foundOrDeleteDogButton.forEach(button => {
        button.addEventListener('click', async event => {
          let dogIDLost = event.target.parentElement.id;
          let article = event.target.parentElement;
          if (!dogIDLost) {
            dogIDLost = event.target.parentElement.parentElement.parentElement.id;
            article = event.target.parentElement.parentElement.parentElement;
          }
          await axios.post(`/pet/${dogIDLost}/delete`);
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
    if (notificationButton) {
      const dogID = notificationButton.id;
      notificationButton.addEventListener('click', async event => {
        await axios.post(`/pet/${dogID}/notification`);
        const src = notificationButton.src;
        if (src.includes('true')) {
          notificationButton.src = '/images/notifications-false.png';
        } else {
          notificationButton.src = '/images/notifications-true.svg';
        }
      });
    }
  }

  function deleteMatch () {
    const deleteMatchButton = document.querySelectorAll('.deleteMatch');
    if (deleteMatchButton) {
      deleteMatchButton.forEach(button => {
        button.addEventListener('click', async event => {
          const article = event.target.parentElement.parentElement;
          const currentMatchId = event.target.parentElement.parentElement.id;
          await axios.post(`/pet/matches/${currentMatchId}/delete`);
          article.remove();
        });
      });
    }
  }

  function sendContactInfo () {
    const matchContactButton = document.querySelectorAll('.matchContactButton');
    if (matchContactButton) {
      matchContactButton.forEach(button => {
        button.addEventListener('click', async event => {
          const parentDiv = event.target.parentElement;
          const currentMatchId = event.target.parentElement.parentElement.id;
          await axios.post(`/pet/matches/${currentMatchId}/message`);
          button.remove();
          const p = document.createElement('p');
          p.innerHTML = 'Contact information sent';
          parentDiv.appendChild(p);
        });
      });
    }
  }

  notificationsOnOff();
  deleteMatch();
  sendContactInfo();
  // list map toggle
  // map

  editInfo();
  editPassword();
};

window.addEventListener('load', main);
