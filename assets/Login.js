function redirectRegister(){
    const form1 = document.getElementById('form1');
    const form2 = document.getElementById('form2');
    form1.style.display = 'none';
    form2.style.display = 'block'
}

function redirectRegister2(){
    const form1 = document.getElementById('form1');
    const form2 = document.getElementById('form2');
    form2.style.display = 'none';
    form1.style.display = 'block'
    
}
function login() {
    location.replace("http://127.0.0.1:5500/C1SE.05/Home.html")
}

function logout() {
    location.replace("http://127.0.0.1:5500/C1SE.05/Login.html")
}

function user() {
    location.replace("http://127.0.0.1:5500/C1SE.05/User.html")
}

function notification() {
    location.replace("http://127.0.0.1:5500/C1SE.05/Notification.html")
}

function setting() {
    location.replace("http://127.0.0.1:5500/C1SE.05/Setting.html")
}

function home() {
    location.replace("http://127.0.0.1:5500/C1SE.05/Home.html")
}

function backtologin() {
    location.replace("http://127.0.0.1:5500/C1SE.05/Login.html")
}
function donate() {
    location.replace("http://127.0.0.1:5500/C1SE.05/donate.html")
}
// function setting2(){ 
//     const form1 = document.getElementById('settingNotification');
//     const form2 = document.getElementById('deletenotification');
//     settingNotification.style.display = 'none';
//     deletenotification.style.display = 'block'
// }
function editinformation(){
    const form1 = document.getElementById('userpage');
    const form2 = document.getElementById('form-edit');
    form1.style.display = 'none';
    form2.style.display = 'block'
}

function backuser(){
    const form1 = document.getElementById('userpage');
    const form2 = document.getElementById('form-edit');
    form2.style.display = 'none';
    form1.style.display = 'block'
    
}

function saveback(){
    const form1 = document.getElementById('userpage');
    const form2 = document.getElementById('form-edit');
    form2.style.display = 'none';
    form1.style.display = 'block'
    
}
