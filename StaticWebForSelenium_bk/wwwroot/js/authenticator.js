function handleLogin(event) {
    console.log("Login button clicked.");
    
    if (event) {
        event.preventDefault(); 
    }

    const inputEmail = document.getElementById('inputEmail').value.trim();
    const inputPassword = document.getElementById('inputPassword').value;

    if (!inputEmail || !inputPassword) {
        alert("⚠️ Please enter both email and password.");
        return;
    }
    
    const existingUsersJSON = localStorage.getItem('registeredUsers');
    
    if (!existingUsersJSON) {
        alert("🔒 No accounts found. Please register first.");
        return;
    }

    const usersArray = JSON.parse(existingUsersJSON);
    const foundUser = usersArray.find(user => 
        user.email === inputEmail && user.password === inputPassword
    );
    
    if (foundUser) {
        // --- Successful Login ---
        console.log("Login successful!", foundUser);
        alert(`🎉 Welcome back, ${foundUser.name}! You are now logged in. Redirecting to dashboard...`);
        
        window.location.href = 'dashboard.html'; 
        sessionStorage.setItem('loggedInUserId', foundUser.id);
    } else {
        console.warn("Login failed: Credentials did not match any stored account.");
        alert("❌ Login Failed: Incorrect email or password. Please try again.");
        document.getElementById('inputPassword').value = '';
    }
}

async function handleRegister(event) {
    console.log("Register button clicked.");
    if (event) {
            event.preventDefault(); 
    }
    const name = document.getElementById('inputFirstName').value.trim();
    const lname = document.getElementById('inputLastName').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const password = document.getElementById('inputPassword').value;
    const repassword = document.getElementById('inputPasswordConfirm').value;

    // ... (Your existing validation code here) ...

    if (password !== repassword) {
        alert("⚠️ Error: The entered passwords do not match. Please check and try again.");
        console.error("Password mismatch detected.");
        document.getElementById('inputPassword').value = '';
        document.getElementById('inputPasswordConfirm').value = '';
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("⚠️ Error: The email address format is invalid. Please enter a valid email (e.g., user@example.com).");
        console.error("Invalid email format detected.");
        return;
    }
    if (!name || !lname || !email || !password || !repassword) {
        alert("⚠️ Error: All fields must be filled out to register.");
        console.error("Empty fields detected.");
        return;
    }

    try {
        const existingUsersJSON = localStorage.getItem('registeredUsers');
        let usersArray = [];
        if (existingUsersJSON) {
            usersArray = JSON.parse(existingUsersJSON);
        }

        const isDuplicate = usersArray.some(user => user.email === email);
        if (isDuplicate) {
            alert("🔒 Registration Failed: An account with this email already exists.");
            console.error("Duplicate email detected:", email);
            return;
        }
        
        const user = new User(name, lname, email, password);
        console.log("Passwords match. Proceeding with registration.");
        
        usersArray.push(user);
        const updatedUsersJSON = JSON.stringify(usersArray);
        localStorage.setItem('registeredUsers', updatedUsersJSON);
        
        // 1. Show alert first
        alert(`✅ Success! User "${name}" has been registered and saved locally. Redirecting to login...`);

        // 2. Perform redirect after the user clicks 'OK' on the alert
        // 🚀 CORRECTED REDIRECT TO Index.html
        window.location.href = 'Index.html'; 
        
    } catch (error) {
        console.error("⚠️ Error during registration:", error);
        alert("⚠️ Critical Error: Could not finalize registration. User class or necessary components may be missing.");
    }
}
