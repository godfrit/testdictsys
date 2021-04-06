const express = require('express')
const router = express.Router()
const Assessment = require('../models/assessment')

// All Assessment Route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.examination != null && req.query.examination !== '') {
    searchOptions.examination = new RegExp(req.query.examination, 'i')
  }
  try {
    const assessments = await Assessment.find(searchOptions)
    res.render('assessments/index', {
      assessments: assessments,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New Assessment Route
router.get('/new', (req, res) => {
  res.render('assessments/new', { assessment: new Assessment() })
})

// Create Assessment Route
router.post('/', async (req, res) => {
  const assessment = new Assessment({
    examination: req.body.examination,
    region: req.body.region,
    ratio: req.body.ratio,
    total: req.body.total,
    assessmentDate: new Date(req.body.assessmentDate)
  })
  try {
    const newAssessment = await assessment.save()
    res.redirect(`assessments/${newAssessment.id}`)
  } catch {
    res.render('assessments/new', {
      assessment: assessment,
      errorMessage: 'Error Adding Assessment'
    })
  }
})

// View Assessment Route
router.get('/:id', async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id)
    res.render('assessments/view', {
      assessment: assessment
    })
  } catch {
    res.redirect('/')
  }
})


// Edit Assessment Route
router.get('/:id/edit', async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id)
    res.render('assessments/edit', { assessment: assessment })
  } catch {
    res.redirect('/assessments')
  }

})

// Update Assessment Route
router.put('/:id', async (req, res) => {
  let assessment
  try {
    assessment = await Assessment.findById(req.params.id)
    assessment.examination = req.body.examination,
      assessment.region = req.body.region,
      assessment.ratio = req.body.ratio,
      assessment.total = req.body.total,
      assessment.assessmentDate = new Date(req.body.assessmentDate)
    await assessment.save()
    res.redirect(`/assessments/${assessment.id}`)
  } catch {
    if (assessment == null) {
      res.redirect('/')
    } else {
      res.render('assessments/new', {
        assessment: assessment,
        errorMessage: 'Error Updating Assessment'
      })
    }
  }
})

// Delete Assessment Route
router.delete('/:id', async (req, res) => {
  let assessment
  try {
    assessment = await Assessment.findById(req.params.id)
    await assessment.remove()
    res.redirect('/assessments')
  } catch {
    if (assessment == null) {
      res.redirect('/')
    } else {
      res.redirect(`/assessments/${assessment.id}`)
    }
  }
})

module.exports = router