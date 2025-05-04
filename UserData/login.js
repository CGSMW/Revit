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

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    console.log("Login form submitted");
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch("/login", {
        method: "POST",
        body: new URLSearchParams(formData)
    })
    const result = await response.json();
    document.getElementById("loginResponse").innerHTML = result.message;
    if (result.success) {
        document.getElementById("loginContainer").className = "container-flex d-flex bg-success-subtle border border-4 border-success rounded-4 p-4 m-4 justify-content-center"
    }
    else {
        document.getElementById("loginContainer").className = "container-flex d-flex bg-danger-subtle border border-4 border-danger rounded-4 p-4 m-4 justify-content-center"
    }
});