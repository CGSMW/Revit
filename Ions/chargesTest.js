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
    body: new URLSearchParams('theme=' + theme)
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
      document
        .getElementById('parentHTML')
        .setAttribute('data-bs-theme', 'light')
    } else {
      document
        .getElementById('parentHTML')
        .setAttribute('data-bs-theme', 'dark')
    }
  } else {
    console.log('Could not find stored theme.')
  }
}

const ions = [
  { name: 'Hydrogen', charge: '1+', symbol: 'H', row: '1', wrongTimes: 0 },
  { name: 'Sodium', charge: '1+', symbol: 'Na', row: '1', wrongTimes: 0 },
  { name: 'Silver', charge: '1+', symbol: 'Ag', row: '1', wrongTimes: 0 },
  { name: 'Potassium', charge: '1+', symbol: 'K', row: '1', wrongTimes: 0 },
  { name: 'Lithium', charge: '1+', symbol: 'Li', row: '1', wrongTimes: 0 },
  { name: 'Ammonium', charge: '1+', symbol: 'NH₄', row: '1', wrongTimes: 0 },
  { name: 'Barium', charge: '2+', symbol: 'Ba', row: '1', wrongTimes: 0 },
  { name: 'Calcium', charge: '2+', symbol: 'Ca', row: '1', wrongTimes: 0 },
  { name: 'Copper', charge: '2+', symbol: 'Cu', row: '1', wrongTimes: 0 },
  { name: 'Magnesium', charge: '2+', symbol: 'Mg', row: '1', wrongTimes: 0 },
  { name: 'Zinc', charge: '2+', symbol: 'Zn', row: '1', wrongTimes: 0 },
  { name: 'Lead', charge: '2+', symbol: 'Pb', row: '1', wrongTimes: 0 },
  { name: 'Iron(II)', charge: '2+', symbol: 'Fe', row: '1', wrongTimes: 0 },
  { name: 'Iron(III)', charge: '3+', symbol: 'Fe', row: '2', wrongTimes: 0 },
  { name: 'Aluminium', charge: '3+', symbol: 'Al', row: '2', wrongTimes: 0 },
  { name: 'Chloride', charge: '1-', symbol: 'Cl', row: '2', wrongTimes: 0 },
  { name: 'Bromide', charge: '1-', symbol: 'Br', row: '2', wrongTimes: 0 },
  { name: 'Flouride', charge: '1-', symbol: 'F', row: '2', wrongTimes: 0 },
  { name: 'Iodide', charge: '1-', symbol: 'I', row: '2', wrongTimes: 0 },
  { name: 'Hydroxide', charge: '1-', symbol: 'OH', row: '2', wrongTimes: 0 },
  { name: 'Nitrate', charge: '1-', symbol: 'NO₃', row: '2', wrongTimes: 0 },
  { name: 'Oxide', charge: '2-', symbol: 'O', row: '2', wrongTimes: 0 },
  { name: 'Sulfide', charge: '2-', symbol: 'S', row: '2', wrongTimes: 0 },
  { name: 'Sulfate', charge: '2-', symbol: 'SO₄', row: '2', wrongTimes: 0 },
  { name: 'Carbonate', charge: '2-', symbol: 'CO₃', row: '2', wrongTimes: 0 }
]
let index

function createWeighting (wrongTimes) {
  wrongTimes = wrongTimes.map(element => {
    return Number(element)
  })
  console.log('wrongTimes:', wrongTimes)
  let weighting
  const wTmax = Math.max(...wrongTimes)
  const wTmin = Math.min(...wrongTimes)
  // Make all elements positive
  if (wTmin < 0) {
    weighting = wrongTimes.map(element => {
      return element + Math.abs(wTmin) + 1
    })
  } else {
    weighting = wrongTimes.map(element => {
      return element - wTmin + 1
    })
  }
  console.log('0 weighting:', weighting)
  // Normalise to 0-1
  const max = Math.max(...weighting)
  weighting = weighting.map(element => {
    return element / max
  })
  console.log('normalised weighting:', weighting)
  // Add random offset to each element
  weighting = weighting.map(element => {
    const offset = Math.random() * 0.2
    if (element + offset < 0 || element + offset > 1) {
      element -= offset
    } else {
      element += offset
    }
    return element
  })
  console.log('randomised weighting:', weighting)
  return weighting
}

function changeProgress (changeIndex) {
  //   console.log(
  //     'changing progress colour for:',
  //     ions[changeIndex].name,
  //     'with index',
  //     changeIndex
  //   )
  let ionColor = document.getElementById(ions[changeIndex].name)
  if (ions[changeIndex].wrongTimes < 0) {
    ionColor.className = 'bg-success'
  } else if (ions[changeIndex].wrongTimes == 0) {
    ionColor.className = 'bg-body'
  } else if (ions[changeIndex].wrongTimes <= 3) {
    ionColor.className = 'bg-warning'
  } else {
    ionColor.className = 'bg-danger'
  }
}

async function saveScore () {
  scores = ions.map(element => element.wrongTimes)
  console.log('saving array of scores:', scores)
  const response = await fetch('/updateUserScores', {
    method: 'POST',
    body: new URLSearchParams('newScores=' + scores + '&test=charges')
  })
  const result = await response.json()
  console.log('result:', result)
  if (result.success) {
    console.log('Scores saved.')
    document.getElementById('saveScoreResponse').innerHTML = 'Scores saved.'
    document.getElementById('progressButtons').className =
      'container-fluid m-2 p-2 bg-success-subtle text-success-emphasis border border-2 border-success rounded-2'
  } else {
    console.log('Error saving scores.')
    document.getElementById('saveScoreResponse').innerHTML =
      'Error saving scores. Please try again and check that you are logged in.'
    document.getElementById('progressButtons').className =
      'container-fluid p-2 bg-danger-subtle text-danger-emphasis border border-2 border-danger rounded-2'
  }
}

async function getScore () {
  console.log('Getting scores')
  let userData = await fetch('/getUserScores?test=charges', {
    method: 'GET'
  })
  const result = await userData.json()
  console.log('result:', result)
  if (!result.success) {
    console.log('Error getting scores/Not logged in.')
  } else {
    const scores = result.scores
    for (let i = 0; i < 24; i++) {
      ions[i].wrongTimes = scores[i]
      changeProgress(i)
    }
    console.log('new ions:', ions)
  }
}

function reset () {
  console.log('Resetting scores')
  for (let i = 0; i < 24; i++) {
    ions[i].wrongTimes = 0
    changeProgress(i)
    document.getElementById('saveScoreResponse').innerHTML =
      "Scores reset. Press 'Save progress' to save changes to your account."
    document.getElementById('progressButtons').className =
      'container-fluid m-2 p-2 bg-success-subtle text-success-emphasis border border-2 border-success rounded-2'
  }
}

const answerInputElement = document.getElementById('answer')
answerInputElement.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault()
    mark()
  }
})

function mark () {
  console.log('Submit button pressed.')
  let answer = document.getElementById('answer').value
  if (answer == ions[index].charge) {
    console.log('Correct')
    ions[index].wrongTimes = Number(ions[index].wrongTimes)- 1
    changeProgress(index)
    nextIon()
  } else {
    document.getElementById('mark').innerHTML = 'Wrong'
    ions[index].wrongTimes = Number(ions[index].wrongTimes) + 1
    changeProgress(index)
    document.getElementById('tester').className =
      'container-flex m-4 p-2 bg-danger-subtle border border-4 border-danger rounded-2 text-center'
  }
  console.log('New wrongtimes: \n', ions[index].wrongTimes)
}

function nextIon () {
  let weighting = createWeighting(ions.map(element => element.wrongTimes))
  const totalWeight = weighting.reduce((sum, weight) => sum + weight, 0)
  const random = Math.random() * totalWeight
  let sum = 0
  index = 0
  for (let i = 0; i < weighting.length; i++) {
    sum += weighting[i]
    if (random < sum) {
      index = i
      break
    }
  }
  console.log('index:', index)
  console.log('ion:', ions[index])
  document.getElementById('ion').innerHTML = ions[index].name
  document.getElementById('mark').innerHTML = ''
  document.getElementById('tester').className =
    'container-flex m-4 p-2 bg-info-subtle border border-4 border-info rounded-2 text-center'
}

function populateData () {
  const row1 = ions.slice(0, 13).map(element => {
    return (
      '<td class="--bs-secondary-bg" id="' +
      element.name +
      '">' +
      element.symbol +
      '</td>'
    )
  })
  document.getElementById('row1').innerHTML = row1.join('')

  const row2 = ions.slice(13, 25).map(element => {
    return (
      '<td class="--bs-secondary-bg" id="' +
      element.name +
      '">' +
      element.symbol +
      '</td>'
    )
  })
  document.getElementById('row2').innerHTML = row2.join('')
}

function ready () {
  getTheme()
  populateData()
  getScore()
  nextIon()
}
