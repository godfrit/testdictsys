const express = require('express')
const router = express.Router()
const Partner = require('../models/partner')

// All Partner Route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.companyName != null && req.query.companyName !== '') {
    searchOptions.companyName = new RegExp(req.query.companyName, 'i')
  }
  try {
    const partners = await Partner.find(searchOptions)
    res.render('partners/index', {
      partners: partners,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New Partner Route
router.get('/new', (req, res) => {
  res.render('partners/new', { partner: new Partner() })
})

// Create Partner Route
router.post('/', async (req, res) => {
  const partner = new Partner({
    companyName: req.body.companyName,
    companyDescription: req.body.companyDescription,
    companyAddress: req.body.companyAddress,
    partnershipStartedDate: new Date(req.body.partnershipStartedDate),
    partnershipExpirationDate: new Date(req.body.partnershipExpirationDate)
  })
  try {
    const newPartner = await partner.save()
    res.redirect(`partners/${newPartner.id}`)
  } catch {
    res.render('partners/new', {
      partner: partner,
      errorMessage: 'Error Adding Partner'
    })
  }
})

// View Partner Route
router.get('/:id', async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id)
    res.render('partners/view', {
      partner: partner
    })
  } catch {
    res.redirect('/')
  }
})


// Edit Partner Route
router.get('/:id/edit', async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id)
    res.render('partners/edit', { partner: partner })
  } catch {
    res.redirect('/partners')
  }

})

// Update Partner Route
router.put('/:id', async (req, res) => {
  let partner
  try {
    partner = await Partner.findById(req.params.id)
    partner.companyName = req.body.companyName,
      partner.companyDescription = req.body.companyDescription,
      partner.companyAddress = req.body.companyAddress,
      partner.partnershipStartedDate = new Date(req.body.partnershipStartedDate),
      partner.partnershipExpirationDate = new Date(req.body.partnershipExpirationDate)
    await partner.save()
    res.redirect(`/partners/${partner.id}`)
  } catch {
    if (partner == null) {
      res.redirect('/')
    } else {
      res.render('partners/new', {
        partner: partner,
        errorMessage: 'Error Updating Partner'
      })
    }
  }
})

// Delete Partner Route
router.delete('/:id', async (req, res) => {
  let partner
  try {
    partner = await Partner.findById(req.params.id)
    await partner.remove()
    res.redirect('/partners')
  } catch {
    if (partner == null) {
      res.redirect('/')
    } else {
      res.redirect(`/partners/${partner.id}`)
    }
  }
})

module.exports = router