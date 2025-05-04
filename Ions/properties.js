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