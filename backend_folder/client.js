const socket = io('http://localhost:8000');

const form = document.getElementById("form");
const msg_np = document.getElementById("message_input");

const message_container = document.getElementById("message_container");

const audio = new Audio('tone.mp3');

const append_message = (name, message, position) => {   //position = left/right
    let str;
    if (position == "left") {
        str = `
        <tr>
                <th scope="col" style="border-top: none; border-bottom: none; border-width: 0ch; border-radius: 0%; padding: 1%;">
                    <div class="alert alert-success" role="alert" style="width: 40%; margin-bottom: 0ch;">
                    ${name}: ${message}
                    </div>
                </th>
              </tr>
    `
    }
    else {
        str = `
        <tr>
        <th scope="col" style="border-top: none; border-bottom: none; border-width: 0ch; border-radius: 0%; padding: 2px;">
            <div class="alert alert-secondary" role="alert" style="width: 40%; float: right; margin-bottom: 0ch;">
            ${name}: ${message}
            </div>
        </th>
      </tr>
    `
    }
    document.getElementById("message_container_table").innerHTML+=str;
    if (position == "left")
    audio.play();
}

var append_joined_alert = function(name){   //position = left/right
    let str = `
    <tr>
                <th scope="col" style="border-top: none; border-bottom: none; border-width: 0ch; border-radius: 0%; padding: 2px;">
                    <div class="alert alert-danger" role="alert" style="width: 100%; text-align:center; float: right; margin-bottom: 0ch;">
                    ${name} joined the chat
                    </div>
                </th>
              </tr>
    `
    document.getElementById("message_container_table").innerHTML+=str;
    audio.play();
}
const append_left_alert = function(name){   //position = left/right
    let str = `
    <tr>
                <th scope="col" style="border-top: none; border-bottom: none; border-width: 0ch; border-radius: 0%; padding: 2px;">
                    <div class="alert alert-danger" role="alert" style="width: 100%; text-align:center; float: right; margin-bottom: 0ch;">
                    ${name} left the chat
                    </div>
                </th>
              </tr>
    `
    document.getElementById("message_container_table").innerHTML+=str;
    audio.play();
}
// we will fire an event

const n = prompt("Enter your name to get joined");
//console.log("n = " + n);
socket.emit('new-user-joined', n);

socket.on('user-joined', function(name){
    console.log("func running")
    append_joined_alert(name)
})

socket.on('receive-message', function(obj){
    console.log("receiving happening")
    append_message(obj.name, obj.message, 'left');
})

socket.on('left-user', function(name){
    console.log("left happening")
    append_left_alert(name)
})


document.getElementById("sendbtn").addEventListener('click', (e)=>{
    e.preventDefault();
    const msg = msg_np.value;
    console.log("msg = ", msg);
    append_message("You", msg, "right");
    socket.emit('send-message', msg);
    document.getElementById("message_input").value="";
})


let modee = 1;

document.getElementById("mode_change").addEventListener("click", ()=>{
    if (modee % 3 == 1)
    {
        document.getElementsByTagName("body")[0].style.backgroundImage="url('night.jpeg')"
        document.getElementById("navBar").className="navbar navbar-expand-lg navbar-dark bg-dark"
        modee++;
    }
    else if (modee % 3 == 2)
    {
        document.getElementsByTagName("body")[0].style.backgroundImage="url('day.jpeg')"
        document.getElementById("navBar").className="navbar navbar-expand-lg navbar-light bg-light"
        modee++;
    }
    else
    {
        document.getElementsByTagName("body")[0].style.backgroundImage=""
        modee++;
    }
})