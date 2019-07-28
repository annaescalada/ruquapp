'use strict';

const isAddLostPetFormFilled = (req, res, next) => {
  // console.log(req.body);
  // const { status, day, month, year, hour, location, name, white, grey, black, darkBrown, lightBrown, red, size, breed, ears, tail, hair } = req.body;

  // console.log(status, day, month, year, hour, location, name, size, breed, ears, tail, hair);
  // if (!status || !day || !month || !year || !hour || !location || !name || !size || !breed || !ears || !tail || !hair /* || (!white && !grey && !black && !darkBrown && !lightBrown && !red) */) {
  //   return res.redirect('/404');
  // }
  next();
};

const isAddFoundPetFormFilled = (req, res, next) => {
  console.log(req);
  const { status, day, month, year, hour, location } = req.body;
  console.log(req.body);
  if (!status || !day || !month || !year || !hour || !location) {
    req.flash('missingFields', 'Location, date and hour fields are required');

    return res.redirect('/pet/add');
  }
  next();
};
module.exports = {
  isAddLostPetFormFilled,
  isAddFoundPetFormFilled
};
