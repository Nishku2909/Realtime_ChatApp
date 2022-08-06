const socket=io('http://localhost:8000', {transports : ['websocket']});

//Get DOM elements in respective Js variables 
const form = document.getElementById('send-container');
const messageInput= document.getElementById('messageInp')
const messageContainer= document.querySelector(".container")

//Audio that will play on receiving messages
var audio =new Audio('ting.mp3');

// Function which will append event info to the container
const apppend=(message,position)=>{
   const messageElement = document.createElement('div');
   messageElement.innerText = message;
   messageElement.classList.add('message');
   messageElement.classList.add(position);
   messageContainer.append(messageElement);
   if(position=='left') {
    audio.play(); };
}

// Ask new user for his/her name and let the server know
var cnt=1;
var name= prompt("Enter your name to join iCHATT WEB APP");
var temp;
while(temp==null || temp==""){
 temp=prompt("Enter your name to join iCHATT WEB APP");
}
name=temp;
socket.emit('new-user-joined',name)

//if a new user join ,receive his/her from the server
socket.on('user-joined',name=>{
   apppend(`${name} joined the chat`, 'right')
});

//if someone sends message,receive message message from server and display to everyone
socket.on('receive',data=>{ 
   apppend(`${data.name}: ${data.message}`, 'left')
  });
//if somebody lefts the chat,receive message from the server
socket.on('left',name=>{
     apppend(`${name}: left the chat`, 'right')
  });

//if the form gets submitted ,send server the message and display that on sender's screen as well
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    apppend(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value=''
})