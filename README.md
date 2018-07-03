![cf](https://i.imgur.com/7v5ASc8.png) Lab 16: Basic Authentication
======

## Submission Instructions
* Work in a fork of this repository
* Work in a branch on your fork called `lab-<current lab number>`
* Set up Travis on your forked repo
* **Deploy to Heroku**
* Open a pull request to this repository
* Submit on canvas 
  * a question and observation
  * your original estimate
  * how long you spent, 
  * a link to your pull request (**You will get a 0 if you have a failing PR or haven't hooked up Travis CI**)
  * a link to your deployed Heroku URL (**You will get a 0 if you don't submit this**)

## Resources
* [express docs](http://expressjs.com/en/4x/api.html)
* [mongoose guide](http://mongoosejs.com/docs/guide.html)
* [mongoose api docs](http://mongoosejs.com/docs/api.html)

### Configuration
Configure the root of your repository with the following files and directories. Thoughtfully name and organize any additional configuration or module files.
* **README.md** - contains documentation
* **.env** - contains env variables **(should be git ignored)**
* **.gitignore** - contains a [robust](http://gitignore.io) `.gitignore` file
* **.eslintrc.json** - contains the course linter configuration
* **.eslintignore** - contains the course linter ignore configuration
* **package.json** - contains npm package config
  * create a `test` script for running tests
  * create `dbon` and `dboff` scripts for managing the mongo daemon
* **db/** - contains mongodb files **(should be git ignored)**
* **index.js** - entry-point of the application
* **src/** - contains the remaining code
  * **src/lib/** - contains module definitions
  * **src/model/** - contains module definitions
  * **src/route/** - contains module definitions
  * **src/\_\_test\_\_/** - contains test modules
  * **main.js** - starts the server

## Feature Tasks  
For this assignment you will be building a RESTful HTTP server with basic authentication using express.

#### Account
Create a user `Account` model that keeps track of a username, email, hashed password, and token seed. The model should be able to regenerate tokens using json web token. 

#### Server Endpoints
* `POST /signup` 
  * pass data as stringifed JSON in the body of a **POST** request to create a new account
  * on success respond with a 200 status code and an authentication token
  * on failure due to a bad request send a 400 status code

## Tests
* POST should test for 200, 400, and 409 (if any keys are unique)

## Stretch Goal
* Create a **very rudimentary** front end using jQuery/vanilla Javascript to make a request to your API to authenticate yourself as a user. You can start by making a signup form that has username/password/email input fields. Upon form submission, send those fields to your server via a front end AJAX request, and send a response back to display to your front end that confirms you successfully signed up. 
* **This is a heavy stretch goal and should be prioritized last. The instructional team will not assist you with this goal**. 

## Documentation
Add your Travis badge to the top of your README. List all of your registered routes and describe their behavior. Describe what your resouce is. Imagine you are providing this API to other developers who need to research your API in order to use it. Describe how a developer should be able to make requests to your API. Refer to the PokeAPI docs for a good example to follow.

