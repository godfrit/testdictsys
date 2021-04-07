if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const trainingRouter = require('./routes/trainings')
const partnerRouter = require('./routes/partners')
const assessmentRouter = require('./routes/assessments')
const proficiencyRouter = require('./routes/proficiencys')
const userRouter = require('./routes/users')
const loginRouter = require('./routes/login')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/trainings', trainingRouter)
app.use('/partners', partnerRouter)
app.use('/assessments', assessmentRouter)
app.use('/proficiencys', proficiencyRouter)
app.use('/users', userRouter)
app.use('/login', loginRouter)

app.listen(process.env.PORT || 3000)