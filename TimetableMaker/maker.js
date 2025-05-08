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

const colours = [
  { letter: 'A', colour: '#e6194B' },
  { letter: 'B', colour: '#3cb44b' },
  { letter: 'C', colour: '#ffe119' },
  { letter: 'D', colour: '#4363d8' },
  { letter: 'E', colour: '#f58231' },
  { letter: 'F', colour: '#911eb4' },
  { letter: 'G', colour: '#42d4f4' },
  { letter: 'H', colour: '#f032e6' },
  { letter: 'I', colour: '#bfef45' },
  { letter: 'J', colour: '#fabed4' },
  { letter: 'K', colour: '#469990' },
  { letter: 'L', colour: '#dcbeff' },
  { letter: 'M', colour: '#9A6324' },
  { letter: 'N', colour: '#fffac8' },
  { letter: 'O', colour: '#800000' },
  { letter: 'P', colour: '#aaffc3' },
  { letter: 'Q', colour: '#808000' },
  { letter: 'R', colour: '#ffd8b1' },
  { letter: 'S', colour: '#0090FF' },
  { letter: 'T', colour: '#a9a9a9' },
  { letter: 'U', colour: '#1f77b4' },
  { letter: 'V', colour: '#ff7f0e' },
  { letter: 'W', colour: '#2ca02c' },
  { letter: 'X', colour: '#d62728' },
  { letter: 'Y', colour: '#9467bd' },
  { letter: 'Z', colour: '#8c564b' }
]

function getMonday (d) {
  d = new Date(d)
  console.log('Date:', d)
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1)
  return new Date(d.setDate(diff))
}
let week = getMonday(new Date())
console.log('week:', week)

function changeWeek () {
  console.log('Changing week')
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  let startOfWeekString = week.toISOString().split('T')[0]
  startOfWeekString =
    monthNames[Number(startOfWeekString.split('-')[1]) - 1] +
    ' ' +
    startOfWeekString.split('-')[2]
  console.log(`Start of week: ${startOfWeekString}`)
  let endOfWeek = new Date(week)
  endOfWeek.setDate(week.getDate() + 6)
  let endOfWeekString = endOfWeek.toISOString().split('T')[0]
  endOfWeekString =
    monthNames[Number(endOfWeekString.split('-')[1]) - 1] +
    ' ' +
    endOfWeekString.split('-')[2]
  console.log(`End of week: ${endOfWeekString}`)
  document.getElementById('weekDisplay').innerHTML =
    startOfWeekString + ' to ' + endOfWeekString
}

function resetTimetableToClear () {
  const defaultTimetable = `<table class="table table-info table-borderless text-center" style="table-layout:fixed">
            <thead class="border border-info text-center">
                <th class="text-nowrap border-end border-info">Time</th>
                <th id="dayOfWeek" style="width: 12.5%">Monday</th>
                <th id="tue" style="width: 12.5%">Tuesday</th>
                <th id="wed" style="width: 12.5%">Wednesday</th>
                <th id="thu" style="width: 12.5%">Thursday</th>
                <th id="fri" style="width: 12.5%">Friday</th>
                <th id="sat" style="width: 12.5%">Saturday</th>
                <th id="sun" style="width: 12.5%">Sunday</th>
            </thead>
            <tbody class="border border-info">
              <tr>
                <th rowspan="2" class="border-end border-bottom border-info">
                  6:00
                </th>
                <td id="mon-0600-0630"></td>
                <td id="tue-0600-0630"></td>
                <td id="wed-0600-0630"></td>
                <td id="thu-0600-0630"></td>
                <td id="fri-0600-0630"></td>
                <td id="sat-0600-0630"></td>
                <td id="sun-0600-0630"></td>
              </tr>
              <tr>
                <td id="mon-0630-0700"></td>
                <td id="tue-0630-0700"></td>
                <td id="wed-0630-0700"></td>
                <td id="thu-0630-0700"></td>
                <td id="fri-0630-0700"></td>
                <td id="sat-0630-0700"></td>
                <td id="sun-0630-0700"></td>
              </tr>
              <tr>
                <th rowspan="2" class="border-end border-bottom border-info">
                  7:00
                </th>
                <td id="mon-0700-0730"></td>
                <td id="tue-0700-0730"></td>
                <td id="wed-0700-0730"></td>
                <td id="thu-0700-0730"></td>
                <td id="fri-0700-0730"></td>
                <td id="sat-0700-0730"></td>
                <td id="sun-0700-0730"></td>
              </tr>
              <tr>
                <td id="mon-0730-0800"></td>
                <td id="tue-0730-0800"></td>
                <td id="wed-0730-0800"></td>
                <td id="thu-0730-0800"></td>
                <td id="fri-0730-0800"></td>
                <td id="sat-0730-0800"></td>
                <td id="sun-0730-0800"></td>
              </tr>
              <tr>
                <th rowspan="2" class="border-end border-bottom border-info">
                  8:00
                </th>
                <td id="mon-0800-0830"></td>
                <td id="tue-0800-0830"></td>
                <td id="wed-0800-0830"></td>
                <td id="thu-0800-0830"></td>
                <td id="fri-0800-0830"></td>
                <td id="sat-0800-0830"></td>
                <td id="sun-0800-0830"></td>
              </tr>
              <tr>
                <td id="mon-0830-0900"></td>
                <td id="tue-0830-0900"></td>
                <td id="wed-0830-0900"></td>
                <td id="thu-0830-0900"></td>
                <td id="fri-0830-0900"></td>
                <td id="sat-0830-0900"></td>
                <td id="sun-0830-0900"></td>
              </tr>
              <tr>
                <th rowspan="2" class="border-end border-bottom border-info">
                  9:00
                </th>
                <td id="mon-0900-0930"></td>
                <td id="tue-0900-0930"></td>
                <td id="wed-0900-0930"></td>
                <td id="thu-0900-0930"></td>
                <td id="fri-0900-0930"></td>
                <td id="sat-0900-0930"></td>
                <td id="sun-0900-0930"></td>
              </tr>
              <tr>
                <td id="mon-0930-1000"></td>
                <td id="tue-0930-1000"></td>
                <td id="wed-0930-1000"></td>
                <td id="thu-0930-1000"></td>
                <td id="fri-0930-1000"></td>
                <td id="sat-0930-1000"></td>
                <td id="sun-0930-1000"></td>
              </tr>
              <tr>
                <th rowspan="2" class="border-end border-bottom border-info">
                  10:00
                </th>
                <td id="mon-1000-1030"></td>
                <td id="tue-1000-1030"></td>
                <td id="wed-1000-1030"></td>
                <td id="thu-1000-1030"></td>
                <td id="fri-1000-1030"></td>
                <td id="sat-1000-1030"></td>
                <td id="sun-1000-1030"></td>
              </tr>
              <tr>
                <td id="mon-1030-1100"></td>
                <td id="tue-1030-1100"></td>
                <td id="wed-1030-1100"></td>
                <td id="thu-1030-1100"></td>
                <td id="fri-1030-1100"></td>
                <td id="sat-1030-1100"></td>
                <td id="sun-1030-1100"></td>
              </tr>
              <tr>
                <th rowspan="2" class="border-end border-bottom border-info">
                  11:00
                </th>
                <td id="mon-1100-1130"></td>
                <td id="tue-1100-1130"></td>
                <td id="wed-1100-1130"></td>
                <td id="thu-1100-1130"></td>
                <td id="fri-1100-1130"></td>
                <td id="sat-1100-1130"></td>
                <td id="sun-1100-1130"></td>
              </tr>
              <tr>
                <td id="mon-1130-1200"></td>
                <td id="tue-1130-1200"></td>
                <td id="wed-1130-1200"></td>
                <td id="thu-1130-1200"></td>
                <td id="fri-1130-1200"></td>
                <td id="sat-1130-1200"></td>
                <td id="sun-1130-1200"></td>
              </tr>
              <tr>
                <th rowspan="2" class="border-end border-bottom border-info">
                  12:00
                </th>
                <td id="mon-1200-1230"></td>
                <td id="tue-1200-1230"></td>
                <td id="wed-1200-1230"></td>
                <td id="thu-1200-1230"></td>
                <td id="fri-1200-1230"></td>
                <td id="sat-1200-1230"></td>
                <td id="sun-1200-1230"></td>
              </tr>
              <tr>
                <td id="mon-1230-1300"></td>
                <td id="tue-1230-1300"></td>
                <td id="wed-1230-1300"></td>
                <td id="thu-1230-1300"></td>
                <td id="fri-1230-1300"></td>
                <td id="sat-1230-1300"></td>
                <td id="sun-1230-1300"></td>
              </tr>
              <tr>
                <th rowspan="2" class="border-end border-bottom border-info">
                  13:00
                </th>
                <td id="mon-1300-1330"></td>
                <td id="tue-1300-1330"></td>
                <td id="wed-1300-1330"></td>
                <td id="thu-1300-1330"></td>
                <td id="fri-1300-1330"></td>
                <td id="sat-1300-1330"></td>
                <td id="sun-1300-1330"></td>
              </tr>
              <tr>
                <td id="mon-1330-1400"></td>
                <td id="tue-1330-1400"></td>
                <td id="wed-1330-1400"></td>
                <td id="thu-1330-1400"></td>
                <td id="fri-1330-1400"></td>
                <td id="sat-1330-1400"></td>
                <td id="sun-1330-1400"></td>
              </tr>
              <tr>
                <th rowspan="2" class="border-end border-bottom border-info">
                  14:00
                </th>
                <td id="mon-1400-1430"></td>
                <td id="tue-1400-1430"></td>
                <td id="wed-1400-1430"></td>
                <td id="thu-1400-1430"></td>
                <td id="fri-1400-1430"></td>
                <td id="sat-1400-1430"></td>
                <td id="sun-1400-1430"></td>
              </tr>
              <tr>
                <td id="mon-1430-1500"></td>
                <td id="tue-1430-1500"></td>
                <td id="wed-1430-1500"></td>
                <td id="thu-1430-1500"></td>
                <td id="fri-1430-1500"></td>
                <td id="sat-1430-1500"></td>
                <td id="sun-1430-1500"></td>
              </tr>
              <tr>
                <th rowspan="2" class="border-end border-bottom border-info">
                  15:00
                </th>
                <td id="mon-1500-1530"></td>
                <td id="tue-1500-1530"></td>
                <td id="wed-1500-1530"></td>
                <td id="thu-1500-1530"></td>
                <td id="fri-1500-1530"></td>
                <td id="sat-1500-1530"></td>
                <td id="sun-1500-1530"></td>
              </tr>
              <tr>
                <td id="mon-1530-1600"></td>
                <td id="tue-1530-1600"></td>
                <td id="wed-1530-1600"></td>
                <td id="thu-1530-1600"></td>
                <td id="fri-1530-1600"></td>
                <td id="sat-1530-1600"></td>
                <td id="sun-1530-1600"></td>
              </tr>
              <tr>
                <th rowspan="2" class="border-end border-bottom border-info">
                  16:00
                </th>
                <td id="mon-1600-1630"></td>
                <td id="tue-1600-1630"></td>
                <td id="wed-1600-1630"></td>
                <td id="thu-1600-1630"></td>
                <td id="fri-1600-1630"></td>
                <td id="sat-1600-1630"></td>
                <td id="sun-1600-1630"></td>
              </tr>
              <tr>
                <td id="mon-1630-1700"></td>
                <td id="tue-1630-1700"></td>
                <td id="wed-1630-1700"></td>
                <td id="thu-1630-1700"></td>
                <td id="fri-1630-1700"></td>
                <td id="sat-1630-1700"></td>
                <td id="sun-1630-1700"></td>
              </tr>
              <tr>
                <th rowspan="2" class="border-end border-bottom border-info">
                  17:00
                </th>
                <td id="mon-1700-1730"></td>
                <td id="tue-1700-1730"></td>
                <td id="wed-1700-1730"></td>
                <td id="thu-1700-1730"></td>
                <td id="fri-1700-1730"></td>
                <td id="sat-1700-1730"></td>
                <td id="sun-1700-1730"></td>
              </tr>
              <tr>
                <td id="mon-1730-1800"></td>
                <td id="tue-1730-1800"></td>
                <td id="wed-1730-1800"></td>
                <td id="thu-1730-1800"></td>
                <td id="fri-1730-1800"></td>
                <td id="sat-1730-1800"></td>
                <td id="sun-1730-1800"></td>
              </tr>
              <tr>
                <th rowspan="2" class="border-end border-bottom border-info">
                  18:00
                </th>
                <td id="mon-1800-1830"></td>
                <td id="tue-1800-1830"></td>
                <td id="wed-1800-1830"></td>
                <td id="thu-1800-1830"></td>
                <td id="fri-1800-1830"></td>
                <td id="sat-1800-1830"></td>
                <td id="sun-1800-1830"></td>
              </tr>
              <tr>
                <td id="mon-1830-1900"></td>
                <td id="tue-1830-1900"></td>
                <td id="wed-1830-1900"></td>
                <td id="thu-1830-1900"></td>
                <td id="fri-1830-1900"></td>
                <td id="sat-1830-1900"></td>
                <td id="sun-1830-1900"></td>
              </tr>
              <tr>
                <th rowspan="2" class="border-end border-bottom border-info">
                  19:00
                </th>
                <td id="mon-1900-1930"></td>
                <td id="tue-1900-1930"></td>
                <td id="wed-1900-1930"></td>
                <td id="thu-1900-1930"></td>
                <td id="fri-1900-1930"></td>
                <td id="sat-1900-1930"></td>
                <td id="sun-1900-1930"></td>
              </tr>
              <tr>
                <td id="mon-1930-2000"></td>
                <td id="tue-1930-2000"></td>
                <td id="wed-1930-2000"></td>
                <td id="thu-1930-2000"></td>
                <td id="fri-1930-2000"></td>
                <td id="sat-1930-2000"></td>
                <td id="sun-1930-2000"></td>
              </tr>
              <tr>
                <th rowspan="2" class="border-end border-bottom border-info">
                  20:00
                </th>
                <td id="mon-2000-2030"></td>
                <td id="tue-2000-2030"></td>
                <td id="wed-2000-2030"></td>
                <td id="thu-2000-2030"></td>
                <td id="fri-2000-2030"></td>
                <td id="sat-2000-2030"></td>
                <td id="sun-2000-2030"></td>
              </tr>
              <tr>
                <td id="mon-2030-2100"></td>
                <td id="tue-2030-2100"></td>
                <td id="wed-2030-2100"></td>
                <td id="thu-2030-2100"></td>
                <td id="fri-2030-2100"></td>
                <td id="sat-2030-2100"></td>
                <td id="sun-2030-2100"></td>
              </tr>
            </tbody>
          </table>`
  document.getElementById('timetableTableDiv').innerHTML = defaultTimetable
  const defaultRevisionSessionsList = `<ul id="revisionSessionsDisplay" class="list-group list-group-flush">
            
          </ul>`
  document.getElementById('revisionSessionsDisplayDiv').innerHTML = defaultRevisionSessionsList
}

async function loadTimetable (weekToDisplay) {
  console.log('Loading user timetable')
  if (weekToDisplay == 'previous') {
    week.setDate(week.getDate() - 7)
  }
  if (weekToDisplay == 'next') {
    week.setDate(week.getDate() + 7)
  }
  console.log('week:', week)
  changeWeek()
  const weekYMD = week.toISOString().split('T')[0]
  urlParams = new URLSearchParams('weekToGet=' + weekYMD)
  console.log(`URL params: ${urlParams}`)
  let timetable = await fetch('/getTimetable', {
    method: 'POST',
    body: urlParams
  })
  timetable = await timetable.json()
  if (timetable.success) {
    timetable = timetable.message
    console.log('Loaded user timetable:', timetable)
    resetTimetableToClear()
    displayTimetable(timetable)
  } else {
    console.log(
      `Could not find user's timetable. Got message ${timetable.message}`
    )
  }
  getTheme()
}

function displayTimetable (timetable) {
  console.log('Displaying timetable')
  for (let session of timetable) {
    //console.log(`Session: ${session}`)
    startTime = session.startTime
    endTime = session.endTime
    const difference = endTime - startTime
    if (difference == 30 || difference == 70) {
      const sessionId = `${session.day}-${startTime}-${endTime}`
      const deleteSessionButton =
        '<button class="btn text-end p-0" type="button" id="delete-' +
        sessionId +
        `" onclick="deleteSessionFromButton('${sessionId}')"><i class="bs bi bi-x-circle"></i></button>`
      const editSessionButton =
        '<button class=btn text-end p-0" type="button" id="edit-' +
        sessionId +
        `" onclick="editSessionFromButton('${sessionId}')"><i class="bs bi bi-pencil-square"></i></button>`
      document.getElementById(sessionId).innerHTML =
        session.subject + '<br>' + deleteSessionButton + editSessionButton
      document.getElementById(sessionId).style.backgroundColor = getLetterColor(
        session.type
      )
      document.getElementById(sessionId).classList = 'rounded-3'
      // If revision session, add to revision session list
      if (session.type == 'Revision') {
        const revisionSession = document.createElement('li')
        const sessionInfo =
          session.subject +
          ` (${session.day}-${session.startTime}-${session.endTime})`
        const markAsDoneButton =
          '<button class="btn text-end p-0" type="button" id="markAsDone-' +
          sessionId +
          `" onclick="markSessionAsDone('${sessionId}')"><i class="bs bi bi-check2-square"></i></button>`
        revisionSession.innerHTML =
          sessionInfo +
          deleteSessionButton +
          editSessionButton +
          markAsDoneButton
        document
          .getElementById('revisionSessionsDisplay')
          .appendChild(revisionSession)
      }
    } else {
      let miniEndTime = getMiniEndTime(startTime)
      let miniStartTime
      while (miniEndTime <= endTime) {
        //console.log(`Mini 2 end time: ${miniEndTime}`)
        if (miniEndTime.toString()[2] == 0) {
          miniStartTime = miniEndTime - 70
        } else {
          miniStartTime = miniEndTime - 30
        }
        if (miniEndTime.toString()[2] == 6) {
          miniEndTime = Number(miniEndTime) + 40
        }
        if (miniEndTime.toString().length == 3) {
          miniEndTime = `0${miniEndTime}`
        }
        if (miniStartTime.toString().length == 3) {
          miniStartTime = `0${miniStartTime}`
        }
        const sessionId = `${session.day}-${miniStartTime}-${miniEndTime}`
        //console.log(`Session ID: ${sessionId}`)
        document.getElementById(sessionId).style.backgroundColor =
          getLetterColor(session.type)
        if (miniStartTime == startTime) {
          document.getElementById(sessionId).classList = 'rounded-top-3'
          document.getElementById(sessionId).innerHTML = session.subject
        }
        if (miniEndTime == endTime) {
          document.getElementById(sessionId).classList = 'rounded-bottom-3'
          const deleteSessionButton =
            '<br><button class="btn text-end p-0" type="button" id="delete-' +
            sessionId +
            `" onclick="deleteSessionFromButton('${sessionId}')"><i class="bs bi bi-x-circle"></i></button>`
          const editSessionButton =
            '<button class=btn text-end p-0" type="button" id="edit-' +
            sessionId +
            `" onclick="editSessionFromButton('${sessionId}')"><i class="bs bi bi-pencil-square"></i></button>`
          document.getElementById(sessionId).innerHTML =
            deleteSessionButton + editSessionButton
          // If revision session, add to revision session list
          if (session.type == 'Revision') {
            const revisionSession = document.createElement('li')
            const sessionInfo =
              session.subject +
              ` (${session.day}-${session.startTime}-${session.endTime})`
            const markAsDoneButton =
              '<button class="btn text-end p-0" type="button" id="markAsDone-' +
              sessionId +
              `" onclick="markSessionAsDone('${sessionId}')"><i class="bs bi bi-check2-square"></i></button>`
            revisionSession.innerHTML =
              sessionInfo +
              deleteSessionButton +
              editSessionButton +
              markAsDoneButton
            document
              .getElementById('revisionSessionsDisplay')
              .appendChild(revisionSession)
          }
        }
        // If revision session, add to revision session list
        miniEndTime = Number(miniEndTime) + 30
        if (miniEndTime.toString().length == 3) {
          miniEndTime = `0${miniEndTime}`
        }
      }
    }
  }
}

function getMiniEndTime (startTime) {
  let miniEndTime = Number(startTime) + 30

  if (miniEndTime.toString().length == 3) {
    miniEndTime = `0${miniEndTime}`
  }
  if (miniEndTime.toString()[2] == 6) {
    miniEndTime = Number(miniEndTime) + 40
  }
  if (miniEndTime.toString().length == 3) {
    miniEndTime = `0${miniEndTime}`
  }
  //console.log(`Mini end time: ${miniEndTime}`)
  return miniEndTime
}

function getLetterColor (subject) {
  const letter = subject[0].toUpperCase()
  const color = colours.find(colour => colour.letter === letter).colour
  return color
}

async function validateFormData (formData) {
  console.log('Validating form data')
  const startTime = formData.get('startTime')
  const endTime = formData.get('endTime')
  console.log('2')
  if (startTime >= endTime) {
    console.log('Start time is not before end time')
    return {
      success: false,
      message: 'Start time must be before end time.'
    }
  }
  console.log('1')
  let available = await fetch('/checkSessionAvailability', {
    method: 'POST',
    body: new URLSearchParams(formData)
  })
  console.log(`Available: ${available}`)
  available = await available.json()
  if (available.success) {
    console.log('Session available')
    return {
      success: true
    }
  } else {
    console.log('Session not available')
    return {
      success: false,
      message: 'This session overlaps with an existing session.'
    }
  }
}

function deleteSessionFromButton (sessionId) {
  console.log('Delete session button clicked')
  sessionId = sessionId.split('-')
  document.getElementById('deleteSessionForm').day.value = sessionId[0]
  document.getElementById('deleteSessionForm').endTime.value = sessionId[2]
  document
    .getElementById('deleteSessionForm')
    .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
}

async function getTimetableSession (day, endTime) {
  const weekYMD = week.toISOString().split('T')[0]
  urlParams = new URLSearchParams('weekToGet=' + weekYMD)
  urlParams.append('day', day)
  urlParams.append('endTime', endTime)
  console.log(`URL params: ${urlParams}`)
  let sessionReq = await fetch('/getTimetableSession', {
    method: 'POST',
    body: urlParams
  })
  console.log('Session request:', sessionReq)
  const session = await sessionReq.json()
  console.log('Session response:', session)
  return session
}

async function editSessionFromButton (sessionId) {
  console.log('Edit session button clicked')
  sessionId = sessionId.split('-')
  const day = sessionId[0]
  const endTime = sessionId[2]
  let session = await getTimetableSession(day, endTime)
  if (session.success) {
    session = session.message
    console.log('Loaded timetable session:', session)
    document.getElementById('addSessionForm').subject.value = session.subject
    document.getElementById('addSessionForm').type.value = session.type
    document.getElementById('addSessionForm').startTime.value =
      session.startTime
    document.getElementById('addSessionForm').day.value = day
    document.getElementById('addSessionForm').endTime.value = endTime
    document.getElementById('deleteSessionForm').day.value = day
    document.getElementById('deleteSessionForm').endTime.value = endTime
    document
      .getElementById('deleteSessionForm')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
  } else {
    console.log(
      `An error occurred while loading the session: ${session.message}.`
    )
  }
}

async function markSessionAsDone (sessionId) {
  console.log('Mark session as done button clicked with sessionId:', sessionId)
  sessionId = sessionId.split('-')
  const day = sessionId[0]
  const endTime = sessionId[2]
  let session = await getTimetableSession(day, endTime)
  if (session.success) {
    console.log('Loaded timetable session:', session)
    session = session.message
    // Delete old session
    document.getElementById('deleteSessionForm').day.value = day
    document.getElementById('deleteSessionForm').endTime.value = endTime
    document.getElementById('deleteSessionForm').subject.value = session.subject
    document
      .getElementById('deleteSessionForm')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    // Add new session with done type
    document.getElementById('addSessionForm').subject.value = session.subject
    document.getElementById('addSessionForm').type.value = 'Done'
    document.getElementById('addSessionForm').startTime.value =
      session.startTime
    document.getElementById('addSessionForm').day.value = day
    document.getElementById('addSessionForm').endTime.value = endTime
    document
      .getElementById('addSessionForm')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
  }
}

async function deleteAllSessions () {
  console.log('Delete all sessions button clicked')
  const deleteAllSessions = confirm(
    'Are you sure you want to delete all sessions?'
  )
  if (deleteAllSessions) {
    const response = await fetch('/deleteAllSessions', {
      method: 'POST'
    })
    const result = await response.json()
    if (result.success) {
      document.getElementById('deleteAllMessage').innerHTML = result.message
      document.getElementById('deleteAllDiv').className =
        'p-3 bg-success-subtle border border-success text-center rounded-4'
      resetTimetableToClear()
    } else {
      document.getElementById('deleteAllMessage').innerHTML = result.message
      document.getElementById('deleteAllDiv').className =
        'p-3 bg-danger-subtle border border-danger text-center rounded-4'
    }
  }
}

document
  .getElementById('addSessionForm')
  .addEventListener('submit', async function (event) {
    console.log('Add session form submitted')
    event.preventDefault()
    const formData = new FormData(event.target)
    console.log(`Form data: ${formData}`)
    let valid = { success: true } // Default to valid. Need to make valid check function work.
    if (valid.success) {
      document.getElementById('addFormResponse').innerHTML = 'Adding session...'
      const shortWeek = week.toISOString().split('T')[0]
      const urlParams = new URLSearchParams(formData)
      urlParams.append('week', shortWeek)
      console.log(`URL params: ${urlParams}`)
      const response = await fetch('/addTimetableSession', {
        method: 'POST',
        body: urlParams
      })
      const result = await response.json()
      if (result.success) {
        document.getElementById('addFormResponse').innerHTML = result.message
        document.getElementById('addFormResponse').className =
          'bg-success-subtle border border-success text-success rounded-2 mt-2'
        loadTimetable()
      } else {
        document.getElementById('addFormResponse').innerHTML = result.message
        document.getElementById('addFormResponse').className =
          'bg-danger-subtle border border-danger text-danger rounded-2 mt-2'
      }
    } else {
      document.getElementById('addFormResponse').innerHTML = valid.message
      document.getElementById('addFormResponse').className =
        'bg-danger-subtle border border-danger text-danger rounded-2 mt-2'
    }
    resetTimetableToClear()
    loadTimetable()
  })

document
  .getElementById('deleteSessionForm')
  .addEventListener('submit', async function (event) {
    console.log('Delete session form submitted')
    event.preventDefault()
    const formData = new FormData(event.target)
    console.log(`Form data: ${formData}`)
    const shortWeek = week.toISOString().split('T')[0]
    const urlParams = new URLSearchParams(formData)
    urlParams.append('week', shortWeek)
    console.log(`URL params: ${urlParams}`)
    document.getElementById('removeFormResponse').innerHTML =
      'Deleting session...'
    const response = await fetch('/deleteTimetableSession', {
      method: 'POST',
      body: urlParams
    })
    const result = await response.json()
    if (result.success) {
      document.getElementById('removeFormResponse').innerHTML = result.message
      document.getElementById('removeFormResponse').className =
        'bg-success-subtle border border-success text-success rounded-2 mt-2'
    } else {
      document.getElementById('removeFormResponse').innerHTML = result.message
      document.getElementById('removeFormResponse').className =
        'bg-danger-subtle border border-danger text-danger rounded-2 mt-2'
    }
    resetTimetableToClear()
    loadTimetable()
  })
