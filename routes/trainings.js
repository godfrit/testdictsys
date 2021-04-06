const express = require('express')
const router = express.Router()
const Training = require('../models/training')

// All Trainee Route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const trainings = await Training.find(searchOptions)
    res.render('trainings/index', {
      trainings: trainings,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New Trainee Route
router.get('/new', (req, res) => {
  res.render('trainings/new', { training: new Training() })
})

// Create Trainee Route
router.post('/', async (req, res) => {
  const training = new Training({
    name: req.body.name,
    gender: req.body.gender,
    title: req.body.title,
    location: req.body.location
  })
  try {
    const newTraining = await training.save()
    res.redirect(`trainings/${newTraining.id}`)
  } catch {
    res.render('trainings/new', {
      training: training,
      errorMessage: 'Error Adding Trainee'
    })
  }
})

// View Trainee Route
router.get('/:id', async (req, res) => {
  try {
    const training = await Training.findById(req.params.id)
    res.render('trainings/view', {
      training: training
    })
  } catch {
    res.redirect('/')
  }
})


// Edit Trainee Route
router.get('/:id/edit', async (req, res) => {
  try {
    const training = await Training.findById(req.params.id)
    res.render('trainings/edit', { training: training })
  } catch {
    res.redirect('/trainings')
  }

})

// Update Trainee Route
router.put('/:id', async (req, res) => {
  let training
  try {
    training = await Training.findById(req.params.id)
    training.name = req.body.name,
      training.gender = req.body.gender,
      training.title = req.body.title,
      training.location = req.body.location
    await training.save()
    res.redirect(`/trainings/${training.id}`)
  } catch {
    if (training == null) {
      res.redirect('/')
    } else {
      res.render('trainings/new', {
        training: training,
        errorMessage: 'Error Updating Trainee'
      })
    }

  }
})

// Delete Trainee Route
router.delete('/:id', async (req, res) => {
  let training
  try {
    training = await Training.findById(req.params.id)
    await training.remove()
    res.redirect('/trainings')
  } catch {
    if (training == null) {
      res.redirect('/')
    } else {
      res.redirect(`/trainings/${training.id}`)
    }
  }
})

module.exports = router