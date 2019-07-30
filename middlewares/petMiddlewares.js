'use strict';

const isAddPetFormFilled = (req, res, next) => {
  const { status, day, month, year, hour, location, name, white, grey, black, darkBrown, lightBrown, red, size, breed, ears, tail, hair } = req.body;
  if (status === 'lost') {
    if (!status || !day || !month || !year || !hour || !location || !name || !size || !breed || !ears || !tail || !hair || (!white && !grey && !black && !darkBrown && !lightBrown && !red)) {
      req.flash('missingFields', 'All fields are required');
      if (status === 'found') {
        req.flash('statusRecoverAdd', status);
      }
      if (day) {
        req.flash('dayRecoverAdd', day);
      }
      if (month) {
        req.flash('monthRecoverAdd', month);
      }
      if (year) {
        req.flash('yearRecoverAdd', year);
      }
      if (hour) {
        req.flash('hourRecoverAdd', hour);
      }
      if (location) {
        req.flash('locationRecoverAdd', location);
      }
      if (name) {
        req.flash('nameRecoverAdd', name);
      }
      if (white) {
        req.flash('whiteRecoverAdd', white);
      }
      if (grey) {
        req.flash('greyRecoverAdd', grey);
      }
      if (black) {
        req.flash('blackRecoverAdd', black);
      }
      if (darkBrown) {
        req.flash('darkBrownRecoverAdd', darkBrown);
      }
      if (lightBrown) {
        req.flash('lightBrownRecoverAdd', lightBrown);
      }
      if (red) {
        req.flash('redRecoverAdd', red);
      }
      if (size === 'small') {
        req.flash('smallRecoverAdd', size);
      } else if (size === 'medium') {
        req.flash('mediumRecoverAdd', size);
      } else if (size === 'large') {
        req.flash('largeRecoverAdd', size);
      }
      if (breed) {
        req.flash('breedRecoverAdd', breed);
      }
      if (ears === 'up') {
        req.flash('upRecoverAdd', ears);
      } else if (ears === 'down') {
        req.flash('downRecoverAdd', ears);
      }
      if (tail === 'longTail') {
        req.flash('longTailRecoverAdd', tail);
      } else if (tail === 'longHairy') {
        req.flash('longHairyRecoverAdd', tail);
      } else if (tail === 'shortTail') {
        req.flash('shortTailRecoverAdd', tail);
      }
      if (hair === 'long') {
        req.flash('longRecoverAdd', hair);
      } else if (hair === 'short') {
        req.flash('shortRecoverAdd', hair);
      }
      return res.redirect('/pet/add');
    }
  } else {
    if (!status || !day || !month || !year || !hour || !location) {
      req.flash('missingFields', 'Location, date and hour fields are required');
      if (status === 'found') {
        req.flash('statusRecoverAdd', status);
      }
      if (day) {
        req.flash('dayRecoverAdd', day);
      }
      if (month) {
        req.flash('monthRecoverAdd', month);
      }
      if (year) {
        req.flash('yearRecoverAdd', year);
      }
      if (hour) {
        req.flash('hourRecoverAdd', hour);
      }
      if (location) {
        req.flash('locationRecoverAdd', location);
      }
      if (name) {
        req.flash('nameRecoverAdd', name);
      }
      if (white) {
        req.flash('whiteRecoverAdd', white);
      }
      if (grey) {
        req.flash('greyRecoverAdd', grey);
      }
      if (black) {
        req.flash('blackRecoverAdd', black);
      }
      if (darkBrown) {
        req.flash('darkBrownRecoverAdd', darkBrown);
      }
      if (lightBrown) {
        req.flash('lightBrownRecoverAdd', lightBrown);
      }
      if (red) {
        req.flash('redRecoverAdd', red);
      }
      if (size === 'small') {
        req.flash('smallRecoverAdd', size);
      } else if (size === 'medium') {
        req.flash('mediumRecoverAdd', size);
      } else if (size === 'large') {
        req.flash('largeRecoverAdd', size);
      }
      if (breed) {
        req.flash('breedRecoverAdd', breed);
      }
      if (ears === 'up') {
        req.flash('upRecoverAdd', ears);
      } else if (ears === 'down') {
        req.flash('downRecoverAdd', ears);
      }
      if (tail === 'longTail') {
        req.flash('longTailRecoverAdd', tail);
      } else if (tail === 'longHairy') {
        req.flash('longHairyRecoverAdd', tail);
      } else if (tail === 'shortTail') {
        req.flash('shortTailRecoverAdd', tail);
      }
      if (hair === 'long') {
        req.flash('longRecoverAdd', hair);
      } else if (hair === 'short') {
        req.flash('shortRecoverAdd', hair);
      }
      return res.redirect('/pet/add');
    }
  }
  next();
};

const isEditPetFormFilled = (req, res, next) => {
  const { dogID } = req.params;
  const { status, day, month, year, hour, location, name, white, grey, black, darkBrown, lightBrown, red, size, breed, ears, tail, hair } = req.body;
  if (status === 'lost') {
    if (!status || !day || !month || !year || !hour || !location || !name || !size || !breed || !ears || !tail || !hair || (!white && !grey && !black && !darkBrown && !lightBrown && !red)) {
      req.flash('missingFields', 'All fields are required');
      return res.redirect(`/pet/${dogID}/edit`);
    }
  } else {
    if (!status || !day || !month || !year || !hour || !location) {
      req.flash('missingFields', 'Location, date and hour fields are required');
      return res.redirect(`/pet/${dogID}/edit`);
    }
  }
  next();
};

module.exports = {
  isAddPetFormFilled,
  isEditPetFormFilled
};
