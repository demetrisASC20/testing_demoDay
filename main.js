//Set database object here
const db = firebase.firestore();    
const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");
const disappear = document.getElementById("disappear");
button.addEventListener("click",updateDB);
let username;

/**
 * Updates the database with the username and message.
 */
function updateDB(event){
    event.preventDefault();
    if (username == null) {
        username = usernameElement.value;
    } 
    disappear.style.display = "none";
    const message         = messageElement.value;

    messageElement.value  = "";

    console.log(username + " : " + message);

    //Update database here
    db.collection("messages")
        .add({
            username: username,
            message: message,
            created: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function(docRef){
            const newM = document.querySelector(".allMessages");
            newM.innerHTML += username + ": " + message + '<br>';
            console.log(docRef);
        })
        .catch(function(error){
            console.error(error);
        })
}

// get database collection messages
db.collection("messages")
    .orderBy('created', 'asc')
    .get()
    .then(function(response){
        //take the response and iterate through each document
        response.forEach(function(doc){
            //for each doc use method .data() to acess its info as an object
            console.log(doc.data())
            const newM = document.querySelector(".allMessages");
            newM.innerHTML += doc.data().username + ": " + doc.data().message + '<br>';

        })
    })
