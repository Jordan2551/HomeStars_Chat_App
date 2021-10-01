# README

The features picked for this assignment are the following:
* Frontend: 
  * 1. As a User of the web-app, I can see a list of all the channels 
  * 2. As a User of the web-app, I can join a channel and see the history of it 
  * 3. As a User of the web-app, I can send messages to a channel after I have joined it 

* Backend:
  * 1. As a consumer of the API, I can persist my chat messages 
  * 2. As a consumer of the API, I can persist messages in specific channels I join. 
  * 3. As a consumer of the API, I can see the list of all the available channels

Reasoning for selecting features:
* I believe the features I picked are vital to the core of any chat application. A user should be able to chat with other people / channels as well as persist and see the history of these messages.
* I chose to implement the chat mechanism via websockets. I strongly believe that it is crucial to ensure delivery of messages in realtime and provide a more robust and efficient solution than http long polling would.

If I had additional time / next steps:
* I would of liked to implement Redux for the front end, as there is a little bit of prop drilling as a result of not having a universal store of state. This is of course a lot more important when an application grows much larger.
* Adding end-to-end testing for React using Jest
* Polishing up some styling on some React components in order to ensure more reusability.
* Adding a color indicator in chat channels that shows which messages they sent.

Instructions on how to run codebase:

Rails API:
* Run **rails db:setup** for first time setup or rails db:reset to reset the database (the setup includes preloaded data located in seeds.rb)
* Run **bundle install** to install the needed gems included in gemfile
* IMPORTANT: the app uses JWT for user authentication, which means it needs a token to issue signatures to clients. Therefore please add a secret named "jwt_secret_key" in the rails stored credentials by doing the following:
  * Run **EDITOR=vim bin/rails credentials:edit**
  * In this file add the following: **jwt_secret: --YOUR GENERATED SECRET HERE--**
* IMPORTANT: the app uses redis to facilitate the content of chat channels connected via websockets.
  * Simply install redis on the system and make sure a redis server is found at **"redis://localhost:6379/1"** (this is configurable in cable.yml)
  
 * Testing
    * To run the various unit and integration tests, run **rails test test**



React UI:
  * Run **npm install** to install all required packages located in package.json

Running the App:
  * Run **rails s** to run both the react and rails apps then navigate to **http://localhost:3000**
  * In order to use chatting / messaging features, make sure to log in first. You can use any of the username, password combinations found in **seeds.rb**
    * Example user:sodales@port.org password:gVOnJJOYp56N3sOi

