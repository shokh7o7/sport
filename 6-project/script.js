document.getElementById('signupForm').addEventListener('submit', function(event) { 
    event.preventDefault(); 
    
    const emailInput = document.getElementById('email').value; 
    const passwordInput = document.getElementById('password').value; 
    
    if (emailInput === '' && passwordInput === '') {
        console.log('please enter your email and password');
        return; 
    }

    else if (emailInput === '') {
        console.log('please enter your email');
        return; 
    }
    else if (passwordInput === '') {
        console.log('please enter your password');
        return; 
    }
    
    else if(emailInput === "shohjaxontursunov50@gmail.com" && passwordInput === "shtursunov777"){
        console.log("This your email", emailInput)
        console.log("This your password", passwordInput)
    }
    else{
        console.log("please try")
    }
   
    
    const statusNotification = document.getElementById('statusNotification'); 
    statusNotification.classList.remove('hidden'); 
    
    document.getElementById('signupForm').reset(); 
});
