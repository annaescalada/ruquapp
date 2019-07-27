'use strict';

const isAddPetFormFilled = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/dashboard');
  }
  next();
};

module.exports = {
  isAddPetFormFilled
};
