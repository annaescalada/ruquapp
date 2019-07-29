#RUQU
Has your dog been lost? Have you found a dog and you want to find the owner? With Ruqus - lost and found you can register a lost dog and the app will notify you if there is a match with a found dog, or vice versa!

#User Stories
404 - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
500 - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
homepage - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
sign up - As a user I want to sign up on the webpage so that I can see all the events that I could attend
login - As a user I want to be able to log in on the webpage so that I can get back to my account
dashboard - As a user I want to be able to acces my dashboard so that I can see a list of my lost or found pets.
dashboard - As a user I want to be able to add a new lost or found pet so that I can see the list on the dashboard.
add new pet - As a user I want to be able to select if I have lost or found a pet so that I can update the information in my dashboard.
add new pet - As a user who has lost a pet I want to be able to describe my lost pet so that it can match other pets that have been found.
add new pet - As a user who has found a pet I want to be able to describe it (indicating only the information I am sure about) so that it can match other pets that have been lost.
dashboard - As a user I want to be able to edit, delete, turn off notifications so that I can make sure that my list of pets is updated.
daschboard - As an owner of a lost pet kind of user I want to be able to set my pet as found so that the lost pet won't appear in my list anymore.
dashboard - As a user I want to be able to see any new matches or messages in my dasboard so that I can check any updates in the moment.
my account - As a user I want to be able to access my pofile from the dashboard so that I can edit my data or log out.
matches - As a user I want to be able to see a list of pets that match my lost or found pet so that I find the owner of the pet or my own pet.
matches - As an owner of a lost pet kind of user I want to be able to discard matches so that I can make sure that the list of matches is correct.
matches - As an owner of a lost pet kind of user I want to be able to send my contact information to the person who have found the pet.
matches - As a user I want to be able to see a short description of the pet that I have found or lost so that I can make sure it's correct in the match page.
matches - As a user I want to be able to edit my lost or found pet in the match page so that I can correct any errors.

Backlog
map - As a user I want be able to see the lost or found pets that match mine in a map so that I can see which matches are close to me.
matches - As a user I want to see a % of compatibility in the match list so that I can see the pets that are more likely to match mine.
dashboard - As a user I want to be able to see the a new matches notifications everytime I acces my dashboard so that I can know how many new matches have been found from my last visit.

##User profile:

sign up and log in
add lost or found pet
edit pet
delete pet
set pet as found
turn on and off notifications
access dashboard
view matches
send contact information
discard match
view matches in map
edit profile
log out


#ROUTES:
GET /

  redirects to /dashboard if user logged in
  renders the homepage

GET /auth/signup

  redirects to /dashboard if user logged in
  renders the signup form (with flash msg if form is incorrect)

POST /auth/signup

  redirects to /dashboard if user logged in
  body:
  name*
  surname*
  telf*
  email* unique
  password*

  redirects to /add

POST /auth/login

  redirects to /dashboard if user logged in
  body:
  email
  password

  redirects to dashboard

GET /dashboard:

redirects to / if not logged in

renders the dashboard view

GET /pet/add

redirects to / if not logged in
renders add pet form (with flash msg if form is incorrect)

POST /pet/add

redirects to / if not logged in

body:
name*
color*
size*
breed*
ears*
tail*
hair*
picture
day*
month*
year*
hour*
location*

redirection to dashboard


GET /profile

  redirects to / if not logged in
  renders profile page
  button edit (/my-profile/edit) and logout (/)

GET /profile/edit:

  redirects to / if not logged in
  renders edit profile form (filled)

  POST /profile/edit

  body:
  name
  surname
  telf

  redirects to dashboard

POST /profile/logout

  body: (empty)
  redirects to /

  redirects to / if not logged in
  render of map

GET /pet/:dogID/matches

  renders matches view

GET /pet/edit/:dogID

redirects to / if not logged in
renders lost pet form filled
red

POST /pet/edit/:dogID

redirects to / if not logged in

body:
name*
color*
size*
breed*
ears*
tail*
hair*
picture
day*
hour*
location*

redirection to dashboard

#Models

  User

    name: String
    surname: String
    phone: String
    mail: String
    password: String
    timestamps
    
  Dog

    day: Number
    month: Number
    year: Number
    hour: Number
    location: String
    name: String
    color: []
    size: String
    breed: String
    ears: String
    tail: String
    hair: String
    picture: String
    userID: objectID
    notification: Boolean
    status: String (lost or found)
    timestamp

  Match

    idLostDog: objectID
    idFoundDog: objectID
    commonAttributes: Object
    compatibility: Number
    new: Boolean
    message: Boolean
    messageRead: Boolean
    timestamps


#Links
Trello
https://trello.com/b/f4nr4P18/ruqu

#Git
The url to your repository and to your deployed project

#Repository Link
https://github.com/annaescalada/ruquapp

#Deploy Link

#Slides
The url to your presentation slides

#Slides Link