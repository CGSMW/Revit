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

const ions = [
    { name: "Lithium", colour: "crimson red", test: "flame", wrongTimes: 0 },
    { name: "Potassium", colour: "lilac", test: "flame", wrongTimes: 0 },
    { name: "Calcium", colour: "brick red", test: "flame", wrongTimes: 0 },
    { name: "Copper", colour: "blue-green", test: "flame", wrongTimes: 0 },
    { name: "Sodium", colour: "yellow", test: "flame", wrongTimes: 0 },
    { name: "Copper", colour: "light blue", test: "sodiumHydroxide", wrongTimes: 0 },
    { name: "Iron(II)", colour: "green", test: "sodiumHydroxide", wrongTimes: 0 },
    { name: "Iron(III)", colour: "reddish-brown", test: "sodiumHydroxide", wrongTimes: 0 },
    { name: "Calcium", colour: "white", test: "sodiumHydroxide", wrongTimes: 0 },
    { name: "Aluminium", colour: "white", test: "sodiumHydroxide", wrongTimes: 0 },
    { name: "Ammonium", colour: "no precipitate", test: "sodiumHydroxide", wrongTimes: 0 },
    { name: "Chloride", colour: "white", test: "silverNitrate", wrongTimes: 0 },
    { name: "Iodide", colour: "yellow", test: "silverNitrate", wrongTimes: 0 },
    { name: "Bromide", colour: "cream", test: "silverNitrate", wrongTimes: 0 },
    { name: "Sulfate", colour: "white", test: "bariumChloride", wrongTimes: 0 },
    { name: "Carbonate", colour: "bubbles", test: "nitricAcid", wrongTimes: 0 }
]

let ion;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createWeighting(wrongTimes) {
    console.log("wrongTimes:", wrongTimes);
    let pos = false; let neg = false;
    let weighting
    for (let num of wrongTimes) {
        if (num >= 0) {
            pos = true;
        }
        if (num < 0) {
            neg = true;
        }
    }
    if (pos && !neg) {
        console.log("only positive")
        const min = Math.min(...wrongTimes);
        weighting = wrongTimes.map(element => element - min);
    }
    else if (neg && !pos) {
        weighting = wrongTimes.map(element => element * -1);
        const min = Math.min(...weighting);
        weighting = weighting.map(element => element - min);
    }
    else {
        console.log("mixed")
        const min = Math.min(...wrongTimes) * -1;
        weighting = wrongTimes.map(element => element + min);
        console.log("0 weighting:", weighting)
    }
    const max = Math.max(...weighting);
    weighting = weighting.map(element => {
        const offset = Math.random() * 0.1;
        if (element + offset < 0 || element + offset > 1) {element -= offset}
        else {element += offset}
        if (max == 0) { return element }
        else { return element / max }
    });
    console.log("weighting:", weighting)
    return weighting; // Lower weighting = less likely to be chosen because fewer wrong answers
}

function createProgressTable() {
    const flameProgress = ions.slice(0, 5).map(element => {
        return '<td class="--bs-secondary-bg border-bottom border-primary-subtle" id="' + element.name + '">' + element.name + '</td>';
    });
    document.getElementById('flameProgress').innerHTML = flameProgress.join('');

    const NaOHProgress = ions.slice(5, 11).map(element => {
        if (element.name == "Copper") {return '<td class="--bs-secondary-bg border-bottom border-primary-subtle" id="Copper2">' + element.name + '</td>';}
        else if (element.name == "Calcium") {return '<td class="--bs-secondary-bg border-bottom border-primary-subtle" id="Calcium2">' + element.name + '</td>';}
        else {return '<td class="--bs-secondary-bg border-bottom border-primary-subtle" id="' + element.name + '">' + element.name + '</td>';}
    });
    document.getElementById('NaOhProgress').outerHTML = NaOHProgress.join('');
    const otherProgress = ions.slice(11, 16).map(element => {
        return '<td class="--bs-secondary-bg border-bottom border-primary-subtle" id="' + element.name + '">' + element.name + '</td>';
    });
    document.getElementById('otherProgress').innerHTML = otherProgress.join('');
}

function createQuestion() {
    let start, colour, question, extra
    const end = ' What ion is present?'
    if (ion.test == "flame") {
        start = 'I do a flame test of the sample and get a <b>'
        colour = ion.colour + " flame</b>."
        question = start + colour + end
    }
    else if (ion.test == "sodiumHydroxide") {
        start = 'I add <b>sodium hydroxide</b> solution to the sample and get a '
        colour = '<b>' + ion.colour + ' precipitate</b>.'
        extra = ''
        if (ion.name == 'Calcium' || ion.name == 'Aluminium' || ion.name == 'Ammonium') {
            if (ion.name == 'Calcium') {
                extra = ' It does <b>not dissolve</b> when excess sodium hydroxide is added.'
            }
            else if (ion.name == 'Aluminium') {
                extra = ' It <b>dissolves</b> when excess sodium hydroxide is added.'
            }
            else if (ion.name == 'Ammonium') {
                question = "I add <b>sodium hydroxide</b> solution to the sample and get <b>no precipitate</b>. I then hover damp red <b>litmus paper which turns blue</b>." + end
                return question
            }
        }
        question = start + colour + extra + end
    }
    else if (ion.test == "silverNitrate") {
        start = "I add <b>silver nitrate</b> solution to a salt solution and get a <b>"
        middle = ion.colour + "</b> precipitate."
        question = start + middle + end
    }
    else if (ion.test == "bariumChloride") {
        question = "I add <b>barium chloride</b> solution to a salt solution and get a <b>white precipitate</b>. " + end
    }
    else if (ion.test == "nitricAcid") {
        question = "I add <b>nitric acid</b> to a salt solution and see <b>bubbles</b>. " + end
    }
    return question
}

function mark() {
    input = document.getElementById('answer').value;
    console.log('input:', input, ' answer:', ion.name)
    if (input.toLowerCase() == ion.name.toLowerCase()) {
        document.getElementById('mark').innerHTML = 'Correct'
        document.getElementById('tester').className = 'p-3 m-2 h-100 w-50 col bg-success-subtle border border-right border-4 border-primary-subtle text-center'
        ion.wrongTimes -= 1;
    }
    else {
        document.getElementById('mark').innerHTML = 'Wrong.'
        ions[index].wrongTimes += 1;
        document.getElementById('tester').className = 'p-3 m-2 h-100 w-50 col bg-danger-subtle border border-right border-4 border-primary-subtle text-center'
    }
    changeProgress(index);
    nextIon()
}

function changeProgress(changeIndex) {
    let ionColor;
    if (changeIndex == "5" ) {ionColor = document.getElementById("Copper2");}
    else if (changeIndex == "8") {ionColor = document.getElementById("Calcium2"); }
    else {ionColor = document.getElementById(ion.name);}
    if (ions[changeIndex].wrongTimes < 0) {
        ionColor.className = 'bg-success';
    }
    else if (ions[changeIndex].wrongTimes == 0) {
        ionColor.className = 'bg-body';
    }
    else if (ions[changeIndex].wrongTimes <= 3) {
        ionColor.className = 'bg-warning';
    }
    else {
        ionColor.className = 'bg-danger';
    }
}

function nextIon() {
    document.getElementById('mark').innerHTML = ''
    document.getElementById('tester').className = 'p-3 m-2 h-100 w-50 col bg-info-subtle border border-right border-4 border-primary-subtle text-center'
    let weighting = createWeighting(ions.map(element => element.wrongTimes));
    const totalWeight = weighting.reduce((sum, weight) => sum + weight, 0);
    const random = Math.random() * totalWeight;
    let sum = 0;
    index = 0;
    for (let i = 0; i < weighting.length; i++) {
        sum += weighting[i];
        if (random < sum) {
            index = i;
            break;
        }
    }
    console.log("index:", index)
    console.log("ion:", ions[index])
    ion = ions[index]
    output = '<p>' + createQuestion(ions[index]) + '</p>'
    console.log(output)
    document.getElementById('question').innerHTML = output;
}

async function saveScore() {
    scores = ions.map(element => element.wrongTimes);
    console.log("saving array of scores:", scores)
    const response = await fetch("/updateUserScores", {
        method: "POST",
        body: new URLSearchParams("newScores=" + scores + "&test=charges")
    })
    const result = await response.json();
    console.log("result:", result);
    if (result.success) {
        console.log("Scores saved.")
        document.getElementById('saveScoreResponse').innerHTML = "Scores saved.";
        document.getElementById('progressButtons').className = "p-3 m-2 bg-success-subtle border border-right border-4 border-success text-center rounded-2 text-success-emphasis"
    }
    else {
        console.log("Error saving scores.")
        document.getElementById('saveScoreResponse').innerHTML = "Error saving scores. Please try again and check that you are logged in.";
        document.getElementById('progressButtons').className = "p-3 m-2 bg-danger-subtle border border-right border-4 border-danger text-center rounded-2 text-danger-emphasis";
    }
}

async function getScore() {
    console.log("Getting scores");
    let userData = await fetch("/getUserScores?test=tests", {
        method: "GET",
    })
    const result = await userData.json();
    console.log("result:", result);
    if (!result.success) {
        console.log("Error getting scores/Not logged in.");
    }
    else {
        const scores = result.scores;
        for (let i = 0; i < 16; i++) {
            ions[i].wrongTimes = result.scores[i];
            changeProgress(i);
        }
        console.log("new ions:", ions);
    }
}

function reset() {
    console.log("Resetting scores");
    for (let i = 0; i < 24; i++) {
        ions[i].wrongTimes = 0;
        changeProgress(i);
        document.getElementById('saveScoreResponse').innerHTML = "Scores reset. Press 'Save progress' to save changes to your account.";
        document.getElementById('progressButtons').className = "p-3 m-2 bg-success-subtle border border-right border-4 border-success text-center rounded-2"
    }
}

function start() {
    getTheme()
    var input = document.getElementById("answer");
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            document.getElementById("submitButton").click();
        }
    })
    createProgressTable()
    getScore()
    nextIon()
}
