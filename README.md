https://travis-ci.org/noahmvf/16-19-auth-asset-mgt

`List all of your registered routes and describe their behavior.` 

`POST ROUTE`
Our Post route takes the arguments (response, request, and next) and creates a new Account schema with the properties: passwordhash, username, email, and tokenseed. If any of these properties is missing from the post we'll receive an error. 

On success, when we return our created account, we delete the password from the body of our Schema for security purposes. We then create a new promise for our token which will log success when a token is returned in JSON format to our database. If unsuccessful, our catch will move us to the next operation.

`GET ROUTE`
Our GET route takes the arguments (response, request, and next) and requests an account based on its token. On success, we receive a 200 status code, and create a new token promise which returns a token response in JSON format.


`Describe what your resouce is. Imagine you are providing this API to other developers who need to research your API in order to use it.`
Our resource is an account Schema, which has the properties: passwordhash, username, email, and tokenseed.

`Describe how a developer should be able to make requests to your API. Refer to the PokeAPI docs for a good example to follow.`
A developer should be able to make requests to create new accounts as well as fetch accounts with the POST and GET routes. 

`get('/api/login'`
{
    "passwordHash":
    "username": 
    "email": 
    "tokenSeed":
}

`post('/api/login')`
{
    "passwordHash":
    "username": 
    "email": 
    "tokenSeed":
}


