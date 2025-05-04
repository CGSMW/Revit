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

const posIons = [
    {name:'Hydrogen', charge:'1+', symbol:'H'},
    {name:'Sodium', charge:'1+', symbol:'Na'},
    {name:'Silver', charge:'1+', symbol:'Ag'},
    {name:'Potassium', charge:'1+', symbol:'K'},
    {name:'Lithium', charge:'1+', symbol:'Li'},
    {name:'Ammonium', charge:'1+', symbol:'NH₄'},
    {name:'Barium', charge:'2+', symbol:'Ba'},
    {name:'Calcium', charge:'2+', symbol:'Ca'},
    {name:'Copper', charge:'2+', symbol:'Cu'},
    {name:'Magnesium', charge:'2+', symbol:'Mg'},
    {name:'Zinc', charge:'2+', symbol:'Zn'},
    {name:'Lead', charge:'2+', symbol:'Pb'},
    {name:'Iron(II)', charge:'2+', symbol:'Fe'},
    {name:'Iron(III)', charge:'3+', symbol:'Fe'},
    {name:'Aluminium', charge:'3+', symbol:'Al'}
]
const negIons = [ 
    {name:'Chloride', charge:'1-', symbol:'Cl' }, 
    {name:'Bromide', charge:'1-', symbol:'Br' }, 
    {name:'Flouride', charge:'1-', symbol:'F' }, 
    {name:'Iodide', charge:'1-', symbol:'I' }, 
    {name:'Hydroxide', charge:'1-', symbol:'OH' }, 
    {name:'Nitrate', charge:'1-', symbol:'NO₃' }, 
    {name:'Oxide', charge:'2-', symbol:'O' }, 
    {name:'Sulfide', charge:'2-', symbol:'S' }, 
    {name:'Sulfate', charge:'2-', symbol:'SO₄'}, 
    {name:'Carbonate', charge:'2-', symbol:'CO₃'}
]

function populateData() {
    getTheme()
    const posNames = posIons.map(element =>{
        return '<p class="m-0">'+element.name+'</p>';
    });
    console.log('posNames',posNames);
    const posCharges = posIons.map(element =>{
        return '<p class="m-0">'+element.charge+'</p>';
    })
    console.log('posCharges',posCharges);
    const posSymbols = posIons.map(element =>{
        return '<p class="m-0">'+element.symbol+'</p>';
    })
    console.log('possymbols',posSymbols);
    document.getElementById('posName').innerHTML = posNames.join('');
    document.getElementById('posCharge').innerHTML = posCharges.join('');
    document.getElementById('posSymbol').innerHTML = posSymbols.join('');
    
    const negNames = negIons.map(element =>{
        return '<p class="m-0">'+element.name+'</p>';
    });
    console.log('negNames',negNames);
    const negCharges = negIons.map(element =>{
        return '<p class="m-0">'+element.charge+'</p>';
    })
    console.log('negCharges',negCharges);
    const negSymbols = negIons.map(element =>{
        return '<p class="m-0">'+element.symbol+'</p>';
    })
    console.log('negsymbols',negSymbols);
    document.getElementById('negName').innerHTML = negNames.join('');
    document.getElementById('negCharge').innerHTML = negCharges.join('');
    document.getElementById('negSymbol').innerHTML = negSymbols.join('');

}