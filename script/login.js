function login(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if(username === 'admin' && password === 'admin123'){
            window.location.assign("./home.html");
    }
    else{
        alert('Please provide correct Username and Password')
    }
}