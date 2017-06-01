# React Native Boilerplate

* Simple example of a React Native app communicating with an express server using socket.io

## How to use it

### Step 1 - install && run the server
* in terminal:
* npm install
* npm run server

### Step 2 - Enter the URL of your server in your client app
* open index.ios.js and index.android.js
* find the line below and change the IP for your server' IP
* const io = socket.connect('http://xxx.xx.xx.x:3000')

### Step 3 - Run the react native app
* in terminal:
* react-native run-ios or react-native run-android

### Step 4 - Using the app
There are 3 ways for the server to send messages to the App
* the terminal, by just typing the message
* the browser, by hitting the endpoint /messages/:message (where :message is what you're sending)
* the app, by typing a message in the input, it will get sent back to the client automatically

### Running tests

Coming soon!

### Receiving updates from upstream

Just fetch the changes and merge them into your project with git.

## Contact

Hit us up here on github

## License
MIT
