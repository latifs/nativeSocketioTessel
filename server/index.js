const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const readline = require('readline') // facilitates user input from terminal
const moment = require('moment') // easy timestamp functionality

server.listen(3000)

// index route
app.get('/', (req, res) => {
  res.send("Hello World!")
})

// send message to connected clients via URL parameter
app.get('/messages/:message', (req, res) => {
  io.emit('message', {
    message: req.params.message,
    timestamp: moment().format('h:mm:ss a') })
  res.send('Message sent!')
});

/*
  check for client connection and set up
  event that listens for clients' 'call'
*/
io.on('connection', (socket) => {
  io.emit('message', {
    message: "Hello there.",
    timestamp: moment().format('h:mm:ss a') })
  socket.on('call', (data) => {
    socket.emit('message', {
      message: data,
      timestamp: moment().format('h:mm:ss a') })
  })
})

/*
  set up readline interface that accepts
  user input from the terminal and sends
  it to the client
*/
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const getInput = () => {
  rl.question('>', (message) => {
    io.emit('message',  { message })
    return getInput()
  })
}

getInput()
