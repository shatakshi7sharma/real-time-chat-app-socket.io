const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)

const currentUser = name;

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

var addedUsers = {}

socket.on('new-user-connected', data => {

  const {id, users} = data

  delete users[id]
 

  for(var key in users) {
    addedUsers[key] = 1
    add_field(key, users[key]);
  }

})

socket.on('user-connected', data => {
   
  appendMessage(`${data.name} connected`)
  
  var usersObj = data.users

    const {id} = data
    for(var key in usersObj) {
    
      if(addedUsers[key] != 1 && usersObj[key] != currentUser){
        addedUsers[key] = 1
        add_field(key, usersObj[key]);
      }    
    }

})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message},${selectedSocketId}`)
  
  socket.emit('send-chat-message', {message,selectedSocketId})
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  
  messageElement.innerText = message
  messageContainer.append(messageElement)
 
}

var selectedSocketId = "";

function onChangeFunction() {
selectedSocketId = document.querySelector('input[name="socket"]:checked').value;

}


function add_field(socketId, name){
       var x = document.getElementById("socket-form");// create an input field to insert
       var new_field = document.createElement("input"); // set input field data type to text
       new_field.setAttribute("type", "radio");  // set input field name 
       new_field.setAttribute("name", "socket"); // select last position to insert element before it
       var pos = x.childElementCount;
       new_field.setAttribute("value", socketId);
       new_field.onchange = onChangeFunction; // insert element
       x.insertBefore(new_field, x.childNodes[pos]);
          

       var label_field = document.createElement("label");
       label_field.innerHTML = name;
       x.insertBefore(label_field, x.childNodes[pos+1]);        

                
 }
    
        