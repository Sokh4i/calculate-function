let btnShow = document.getElementById("btnShow");
btnShow.addEventListener('click', show);

function show(){
    let getUsername = document.getElementById("txtUsername").value;
    let getPassword = document.getElementById("txtPassword").value;

    if (getUsername == "admin" && getPassword == "1122") {
        window.location.href = "fixedPayment.html";
    }
    else {
        alert("Incorrect username or password!");
    }
}