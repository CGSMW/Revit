async function loadAccount() {
    getTheme()
    console.log("Loading account page");
    let userData = await fetch("/getUserInfo", {
        method: "GET"
    })
    userData = await userData.json();
    if (userData.success) {
        console.log("Loaded user data:", userData);
        document.getElementById("username").value = userData.username;
        document.getElementById("password").value = userData.password;
    }
}

async function changePassword() {
    event.preventDefault();
    const newPassword = document.getElementById("newPassword").value;
    const response = await fetch("/updateUserData", {
        method: "POST",
        body: new URLSearchParams("newValue=" + newPassword + "&field=password")
    })
    const result = await response.json();
    console.log("result:", result);
    if (result.success) {
        document.getElementById("changePasswordResponse").innerHTML = "Password changed.";
        document.getElementById("changePassword").className = "container-fluid m-2 p-2 bg-success-subtle text-success-emphasis border border-2 border-success rounded-2";
    }
    else {
        document.getElementById("changePasswordResponse").innerHTML = "Error changing password: "+ result.message;
        document.getElementById("changePassword").className = "container-fluid m-2 p-2 bg-danger-subtle text-danger-emphasis border border-2 border-danger rounded-2";
    }
    loadAccount();
}

// async function changeUsername() {
//     event.preventDefault();
//     const newUsername = document.getElementById("newUsername").value;
//     const response = await fetch("/updateUserData", {
//         method: "POST",
//         body: new URLSearchParams("newValue=" + newUsername + "&field=username")
//     })
//     const result = await response.json();
//     console.log("result:", result);
//     if (result.success) {
//         document.getElementById("changeUsernameResponse").innerHTML = "Username changed.";
//         document.getElementById("changeUsername").className = "container-fluid m-2 p-2 bg-success-subtle text-success-emphasis border border-2 border-success rounded-2";
//     }
//     else {
//         document.getElementById("changeUsernameResponse").innerHTML = "Error changing username: "+ result.message;
//         document.getElementById("changeUsername").className = "container-fluid m-2 p-2 bg-danger-subtle text-danger-emphasis border border-2 border-danger rounded-2";
//     }
//     loadAccount();
// }

async function deleteAccount() {
    event.preventDefault();
    const response = await fetch("/deleteAccount", {
        method: "POST"
    })
    const result = await response.json();
    console.log("result:", result);
    if (result.success) {
        document.getElementById("deleteAccountResponse").innerHTML = "Account deleted.";
        document.getElementById("deleteAccount").className = "container-fluid m-2 p-2 bg-success-subtle text-success-emphasis border border-2 border-success rounded-2";
        loadAccount();
    }
    else {
        document.getElementById("deleteAccountResponse").innerHTML = "Error deleting account. Please try again";
        document.getElementById("deleteAccount").className = "container-fluid m-2 p-2 bg-danger-subtle text-danger-emphasis border border-2 border-danger rounded-2";
    }
    loadAccount();
}

function setThemeLight () {
    document.getElementById('parentHTML').setAttribute('data-bs-theme', 'light')
    setThemeCookie('light')
  }
  
  function setThemeDark () {
    document.getElementById('parentHTML').setAttribute('data-bs-theme', 'dark')
    setThemeCookie('dark')
  }
  
  async function setThemeCookie (theme) {
    console.log('Setting theme cookie')
    let response = await fetch('/setTheme', {
      method: 'POST',
      body: new URLSearchParams('theme='+ theme)
    })
    response = await response.json()
    console.log('Got response:', response)
  }
  
  async function getTheme () {
    console.log('Fetching theme')
    let response = await fetch('/getTheme', {
      method: 'GET'
    })
    response = await response.json()
    if (response.success) {
      if (response.theme == 'light') {
          document.getElementById('parentHTML').setAttribute('data-bs-theme', 'light')
      } else {
          document.getElementById('parentHTML').setAttribute('data-bs-theme', 'dark')
      }
    } else {
      console.log('Could not find stored theme.')
    }
  }