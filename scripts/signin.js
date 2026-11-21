document.getElementById("sign-button").addEventListener("click", (e) => {
    e.preventDefault();
    const userInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;
    console.log(passwordInput, userInput);
    if (userInput === "admin" && passwordInput === "admin123") {
        alert("Login Successful");
        // window.location.replace("/home.html");
        // window.location.assign("/home.html");
        window.location.assign("../home.html");
    } else {
        alert("Failed to Login");
    }
});


