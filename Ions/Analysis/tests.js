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

const flameIons = [
    { name: "Li⁺", colour: "Crimson red", img: "Crimson.png" },
    { name: "K⁺", colour: "Lilac", img: "Lilac.png" },
    { name: "Ca²⁺", colour: "Brick Red", img: "BrickRed.png" },
    { name: "Cu²⁺", colour: "Blue-green", img: "BlueGreen.png" },
    { name: "Na⁺", colour: "Yellow", img: "Yellow.png" }
]
const halides = [
    {name:"Cl⁻", colour:"White"},
    {name:"I⁻", colour:"Yellow"},
    {name:"Br⁻", colour:"Cream"}
]

function popFlames() {
    for (var i = 0; i < flameIons.length; i++) {
        const rowOuter = '<div class="row align-items-start bg-secondary-subtle" id="row' + i + '" style="height:100px">'
        const element = flameIons[i]
        const name = '<div class="h-100 col border border-right border-4 border-primary-subtle bg-success-subtle p-0"><p class="m-0">' + element.name + '</p></div>'
        const colour = '<div class="col h-100 bg-warning-subtle border border-right border-4 border-primary-subtle p-0"><p class="m-0">' + element.colour + '</p></div>'
        const img = '<div class="h-100 col border border-right border-4 border-primary-subtle p-0"><img height="100" class="p-2 align-top" src="Images/' + element.img + '"></div>'
        const row = rowOuter + img + colour + name + '</div>';
        document.getElementById('flameTestsTable').innerHTML += row;
    }
}

function popHalides() {
    for (var i = 0; i < halides.length; i++) {
        const rowOuter = '<div class="row align-items-start bg-secondary-subtle" id="row' + i + '">'
        const element = halides[i]
        const name = '<div class="col border border-right border-4 border-primary-subtle bg-success-subtle p-0"><p class="m-0">' + element.name + '</p></div>'
        const colour = '<div class="col border border-right border-4 border-primary-subtle bg-warning-subtle p-0"><p class="m-0">' + element.colour + '</p></div>'
        console.log(name, colour)
        const row = rowOuter + colour + name + '</div>';
        console.log("row", row);;
        document.getElementById('halidesTable').innerHTML += row;
    }
}


function populateData() {
    getTheme()
    popFlames()
    popHalides()
}