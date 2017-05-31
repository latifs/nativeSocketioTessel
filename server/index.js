const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const readline = require('readline')
const moment = require('moment')

// set up interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

server.listen(3000)

// index route
app.get('/', (req, res) => {
  res.send("Hello World!")
})

// send message to connected clients
app.get('/messages/:message', (req, res) => {
  io.emit('message', {
    message: req.params.message,
    timestamp: moment().format('h:mm:ss a') })
  res.send('Message sent!')
});

// set up call event to listen for message from client
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

// get user input and send to client
const getInput = () => {
  rl.question('>', (message) => {
    io.emit('message',  { message })
    return getInput()
  })
}

getInput()
