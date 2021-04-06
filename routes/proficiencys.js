const express = require('express')
const router = express.Router()
const Proficiency = require('../models/proficiency')

// All Proficiency Route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.examination != null && req.query.examination !== '') {
    searchOptions.examination = new RegExp(req.query.examination, 'i')
  }
  try {
    const proficiencys = await Proficiency.find(searchOptions)
    res.render('proficiencys/index', {
      proficiencys: proficiencys,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New Proficiency Route
router.get('/new', (req, res) => {
  res.render('proficiencys/new', { proficiency: new Proficiency() })
})

// Create Proficiency Route
router.post('/', async (req, res) => {
  const proficiency = new Proficiency({
    examination: req.body.examination,
    ratio: req.body.ratio,
    total: req.body.total,
    examinationDate: new Date(req.body.examinationDate)
  })
  try {
    const newProficiency = await proficiency.save()
    res.redirect(`proficiencys/${newProficiency.id}`)
  } catch {
    res.render('proficiencys/new', {
      proficiency: proficiency,
      errorMessage: 'Error Adding Proficiency'
    })
  }
})

// View Proficiency Route
router.get('/:id', async (req, res) => {
  try {
    const proficiency = await Proficiency.findById(req.params.id)
    res.render('proficiencys/view', {
      proficiency: proficiency
    })
  } catch {
    res.redirect('/')
  }
})


// Edit Proficiency Route
router.get('/:id/edit', async (req, res) => {
  try {
    const proficiency = await Proficiency.findById(req.params.id)
    res.render('proficiencys/edit', { proficiency: proficiency })
  } catch {
    res.redirect('/proficiencys')
  }

})

// Update Proficiency Route
router.put('/:id', async (req, res) => {
  let proficiency
  try {
    proficiency = await Proficiency.findById(req.params.id)
    proficiency.examination = req.body.examination,
      proficiency.ratio = req.body.ratio,
      proficiency.total = req.body.total,
      proficiency.examinationDate = new Date(req.body.examinationDate)
    await proficiency.save()
    res.redirect(`/proficiencys/${proficiency.id}`)
  } catch {
    if (proficiency == null) {
      res.redirect('/')
    } else {
      res.render('proficiencys/new', {
        proficiency: proficiency,
        errorMessage: 'Error Updating Proficiency'
      })
    }
  }
})

// Delete Proficiency Route
router.delete('/:id', async (req, res) => {
  let proficiency
  try {
    proficiency = await Proficiency.findById(req.params.id)
    await proficiency.remove()
    res.redirect('/proficiencys')
  } catch {
    if (proficiency == null) {
      res.redirect('/')
    } else {
      res.redirect(`/proficiencys/${proficiency.id}`)
    }
  }
})

module.exports = router