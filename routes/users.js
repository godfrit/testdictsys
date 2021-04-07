const express = require('express')
const router = express.Router()
const User = require('../models/user')

// All Trainee Route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const users = await User.find(searchOptions)
    res.render('users/index', {
      users: users,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New Trainee Route
router.get('/new', (req, res) => {
  res.render('users/new', { user: new User() })
})

// Create Trainee Route
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    privilage: req.body.privilage
  })
  try {
    const newUser = await user.save()
    res.redirect(`users/${newUser.id}`)
  } catch {
    res.render('users/new', {
      user: user,
      errorMessage: 'Error Adding Trainee'
    })
  }
})

// View Trainee Route
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.render('users/view', {
      user: user
    })
  } catch {
    res.redirect('/')
  }
})


// Edit Trainee Route
router.get('/:id/edit', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.render('users/edit', { user: user })
  } catch {
    res.redirect('/users')
  }

})

// Update Trainee Route
router.put('/:id', async (req, res) => {
  let user
  try {
    user = await User.findById(req.params.id)
    user.name = req.body.name,
      user.email = req.body.email,
      user.password = req.body.password,
      user.privilage = req.body.privilage
    await user.save()
    res.redirect(`/users/${user.id}`)
  } catch {
    if (user == null) {
      res.redirect('/')
    } else {
      res.render('users/new', {
        user: user,
        errorMessage: 'Error Updating Trainee'
      })
    }

  }
})

// Delete Trainee Route
router.delete('/:id', async (req, res) => {
  let user
  try {
    user = await User.findById(req.params.id)
    await user.remove()
    res.redirect('/users')
  } catch {
    if (user == null) {
      res.redirect('/')
    } else {
      res.redirect(`/users/${user.id}`)
    }
  }
})

module.exports = router