let globalUsername = null

var url = require('url')
var express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var fs = require('fs')

// Mongo DB Setup
var mongo = require('mongodb')
const { MongoClient } = require('mongodb')
const { start } = require('repl')
const uri =
  'mongodb+srv://admin:admin@revit-db.uqmmk.mongodb.net/?retryWrites=true&w=majority&appName=Revit-DB'
const client = new MongoClient(uri)
try {
  client.connect()
} catch (e) {
  console.error(`Error connecting to database:\n ${e}`)
}

async function createDocument (client, newDocument, collection) {
  const result = await client
    .db('Users')
    .collection(collection)
    .insertOne(newDocument)
  console.log(`Inserted document. Got result id: ${result.insertedId}`)
}

async function findDocument (client, username, collection) {
  const result = await client
    .db('Users')
    .collection(collection)
    .findOne({ username: username })
  if (result) {
    return result
  } else {
    return null
  }
}

async function findDocumentByParams (client, params, collection) {
  const result = await client
    .db('Users')
    .collection(collection)
    .findOne(params)
  if (result) {
    return result
  } else {
    return null
  }
}

async function findManyDocuments (client, params, collection) {
  const result = await client
    .db('Users')
    .collection(collection)
    .find(params)
  if (result) {
    return result.toArray()
  } else {
    return null
  }
}

async function deleteDocumentByUsername (client, username, collection) {
  const result = await client
    .db('Users')
    .collection(collection)
    .deleteOne({ username: username })
  console.log(`Deleted ${result.deletedCount} document(s)`)
}

async function deleteManyDocumentsByUsername (client, username, collection) {
  const result = await client
    .db('Users')
    .collection(collection)
    .deleteMany({ username: username })
  console.log(`Deleted ${result.deletedCount} document(s)`)
}

async function deleteDocumentByParams (client, params, collection) {
  console.log(`Deleting document with params: ${JSON.stringify(params)}`)
  const result = await client
    .db('Users')
    .collection(collection)
    .deleteOne(params)
  console.log(`Deleted ${result.deletedCount} document(s)`)
  return result.deletedCount
}

async function updateDocument (client, username, collection, field, newValue) {
  const result = await client
    .db('Users')
    .collection(collection)
    .updateOne({ username: username }, { $set: { [field]: newValue } })
  console.log(`Updated ${result.modifiedCount} document(s)`)
}

const port = 3000

var app = express()

// Set up cookies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  session(
    {
      name: 'username',
      secret: 'potato',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
    },
    {
      name: 'theme',
      secret: 'potato',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
    }
  )
)

// Handle Logins
app.post('/login', async (req, res) => {
  if (req.session.userID !== undefined) {
    return res.json({ success: true, message: 'Already logged in.' })
  }
  const username = req.body.loginUsername
  const password = req.body.loginPassword
  console.log('Username:', username, 'Password:', password)
  account = await findDocument(client, username, 'Logins')
  console.log('Account:', account)
  if (account !== null) {
    if (account.password == password) {
      globalUsername = account.username
      req.session.username = username
      req.session.save()
      console.log('Username:', username)
      console.log('Logged in. redirecting to /')
      return res.json({ success: true, message: 'Logged in.' })
    } else {
      return res.json({ success: false, message: 'Incorrect password.' })
    }
  } else {
    return res.json({ success: false, message: 'Could not find username.' })
  }
})

app.post('/signUp', async (req, res) => {
  const username = req.body.signUpUsername
  const password = req.body.signUpPassword
  console.log('Username:', username, 'Password:', password)
  if (username == '' || password == '') {
    console.error('No username or password entered.')
    return res.json({
      success: false,
      message: 'Must enter a username and password.'
    })
  }
  usernameExists = await findDocument(client, username, 'Logins')
  if (usernameExists) {
    console.error('Username already exists')
    return res.json({ success: false, message: 'Username already exists' })
  } else {
    await createDocument(
      client,
      { username: username, password: password },
      'Logins'
    )
    await createDocument(
      client,
      {
        username: username,
        charges: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0
        ],
        analysis: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      'Scores'
    )
    globalUsername = username
    req.session.username = username
    req.session.save()
    console.log('Username:', username)
    console.log('Logged in. redirecting to /')
    return res.json({ success: true, message: 'Signed up and logged in.' })
  }
})

app.get('/logOut', async (req, res) => {
  req.session.destroy()
  res.clearCookie('username')
  res.clearCookie('theme')
  globalUsername = null
  console.log('Logged out. redirecting to /')
  res.redirect('index.html')
})

app.post('/deleteAccount', async (req, res) => {
  if (req.session.username) {
    await deleteDocumentByUsername(client, req.session.username, 'Logins')
    await deleteDocumentByUsername(client, req.session.username, 'Scores')
    req.session.destroy()
    res.clearCookie('username')
    res.clearCookie('theme')
    return res.json({ success: true, message: 'Deleted account.' })
  } else {
    return res.json({ success: false, message: 'Not logged in.' })
  }
})

app.get('/getUserInfo', async (req, res) => {
  console.log('requested user ID session', req.session.username)
  if (req.session.username) {
    const userData = await findDocument(client, req.session.username, 'Logins')
    console.log('Retrieved user data:', userData)
    const userDataJSON = {
      success: true,
      username: userData.username,
      password: userData.password
    }
    return res.json(userDataJSON)
  } else {
    console.error('Not logged in.')
    return res.json({ success: false, message: 'Not logged in.' })
  }
})

app.post('/updateUserData', async (req, res) => {
  const field = req.body.field
  const newValue = req.body.newValue
  if (req.session.username) {
    console.log('Updating field:', field, 'with value:', newValue)
    await updateDocument(
      client,
      req.session.username,
      'Logins',
      field,
      newValue
    )
    res.json({ success: true, message: 'Updated user data.' })
  } else {
    console.error('Not logged in.')
    return res.json({ success: false, message: 'Not logged in.' })
  }
})

app.get('/getUserScores', async (req, res) => {
  const test = req.query.test
  console.log('Requested test:', test)
  if (req.session.username) {
    const userScores = await findDocument(
      client,
      req.session.username,
      'Scores'
    )
    console.log('Retrieved user scores:', userScores)
    const testScores = userScores[test]
    console.log('Retrieved specific test scores:', testScores)
    return res.json({ success: true, scores: testScores })
  } else {
    console.error('Not logged in.')
    return res.json({ success: false, message: 'Not logged in.' })
  }
})

app.post('/updateUserScores', async (req, res) => {
  const test = req.body.test
  const newScores = req.body.newScores.split(',')
  console.log('Requested update scores for test:', test)
  console.log('Updating to: ', newScores)
  if (req.session.username) {
    await updateDocument(
      client,
      req.session.username,
      'Scores',
      test,
      newScores
    )
    return res.json({ success: true, message: 'Updated user data.' })
  } else {
    console.error('Not logged in.')
    return res.json({ success: false, message: 'Not logged in.' })
  }
})

app.post('/getTimetable', async (req, res) => {
  if (req.session.username) {
    const week = req.body.weekToGet
    let userTimetable = await findManyDocuments(
      client,
      {
        username: req.session.username,
        week: week
      },
      'Timetables'
    )
    console.log(`Found user's timetable documents.`)
    return res.json({ success: true, message: userTimetable })
  } else {
    console.error('Not logged in.')
    return res.json({ success: false, message: 'Not logged in.' })
  }
})

app.post('/getTimetableSession', async (req, res) => {
  if (req.session.username) {
    const week = req.body.weekToGet
    const day = req.body.day
    const endTime = req.body.endTime
    let session = await findDocumentByParams(
      client,
      {
        username: req.session.username,
        week: week,
        day: day,
        endTime: endTime
      },
      'Timetables'
    )
    if (session) {
      console.log(`Found user's timetable session: ${session.day}.`)
      return res.json({ success: true, message: session })
    } else {
      console.error('No session found.')
      return res.json({ success: false, message: 'No such session found.' })
    }
  }
  else {
    console.error('Not logged in.')
    return res.json({ success: false, message: 'Not logged in.' })
  }
})

app.post('/addTimetableSession', async (req, res) => {
  if (req.session.username) {
    const subject = req.body.subject
    const type = req.body.type
    const day = req.body.day
    const startTime = req.body.startTime
    const endTime = req.body.endTime
    const week = req.body.week
    console.log(
      `Adding timetable session: ${subject}, ${type}, ${day}, ${startTime}, ${endTime}, ${week}`
    )
    await createDocument(
      client,
      {
        username: req.session.username,
        subject: subject,
        day: day,
        startTime: startTime,
        endTime: endTime,
        type: type,
        week: week
      },
      'Timetables'
    )
    return res.json({ success: true, message: 'Added timetable session.' })
  } else {
    console.error('Not logged in.')
    return res.json({ success: false, message: 'Not logged in.' })
  }
})

app.post('/deleteTimetableSession', async (req, res) => {
  if (req.session.username) {
    const subject = req.body.subject
    console.log(`subject: ${subject}d`)
    const day = req.body.day
    const startTime = req.body.startTime
    const endTime = req.body.endTime
    let params = {
      username: req.session.username,
      day: day,
      endTime: endTime
    }
    if (subject && subject.trim() !== '') {
      console.log('subject exists')
      params.subject = subject
    }
    if (startTime && startTime.trim() !== '') {
      params.startTime = startTime
    }
    console.log(`params: ${JSON.stringify(params)}`)
    console.log(`Deleting timetable session: ${params}`)
    const deletedCount = await deleteDocumentByParams(
      client,
      params,
      'Timetables'
    )
    if (deletedCount == 0) {
      console.error('No timetable session found to delete.')
      return res.json({
        success: false,
        message: 'No timetable session found.'
      })
    }
    return res.json({ success: true, message: 'Deleted timetable session.' })
  } else {
    console.error('Not logged in.')
    return res.json({ success: false, message: 'Not logged in.' })
  }
})

app.post('/deleteAllSessions', async (req, res) => {
  if (req.session.username) {
    console.log('Deleting all sessions.')
    const deletedCount = await deleteManyDocumentsByUsername(
      client,
      req.session.username,
      'Timetables'
    )
    return res.json({ success: true, message: `Deleted all sessions.` })
  }
  else {return res.json({ success: false, message: 'Not logged in.' }) }
})

app.post('/checkSessionAvailability', async (req, res) => {
  if (req.session.username) {
    const day = req.body.day
    const startTime = req.body.startTime
    const endTime = req.body.endTime
    console.log(
      `Checking session availability: ${day}, ${startTime}, ${endTime}`
    )
    const userTimetable = await findManyDocuments(
      client,
      {username: req.session.username},
      'Timetables'
    )
    console.log(`Found user's timetable documents: ${userTimetable}`)
    let isAvailable = true
    for (let session of userTimetable) {
      if (session.day == day) {
        if (
          !(startTime <= session.startTime && endTime <= session.startTime) ||
          !(startTime >= session.endTime && endTime >= session.endTime) ||
          startTime == session.startTime ||
          endTime == session.endTime
        ) {
          console.log('Session overlaps.')
          isAvailable = false
          break
        }
      }
    }
    console.log(`Session availability: ${isAvailable}`)
    if (isAvailable) {
      return res.json({ success: true })
    } else {
      return res.json({ success: false })
    }
  }
})

app.get('logError', async (req, res) => {
  console.error('Error:', req.query.error)
  res.json({ success: true, message: 'Logged error.' })
})

app.post('/setTheme', (req, res) => {
  console.log('req', req.body)
  const theme = req.body.theme
  console.log(`Setting theme cookie to: ${theme}`)
  req.session.theme = theme
  req.session.save()
  return res.json({
    success: true,
    message: `Stored theme as ${req.session.theme}`
  })
})

app.get('/getTheme', (req, res) => {
  const theme = req.session.theme
  console.log('Getting theme.')
  if (theme) {
    return res.json({ success: true, theme: theme })
  } else {
    return res.json({ success: false })
  }
})

app.get('*', (req, res) => {
  let filename
  if (url.parse(req.url, true).pathname == '/') {
    filename = './index.html'
  } else {
    filename = '.' + url.parse(req.url, true).pathname
  }
  console.log('moving to file:' + filename)
  fs.readFile(filename, function (err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      return res.end('Error 404: Content Not Found')
    }
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(data)
    return res.end()
  })
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
