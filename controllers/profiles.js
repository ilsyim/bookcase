import { Profile } from "../models/profile.js"

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
      title: "All Shelves"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render('profiles/show', {
      title: `${profile.name}'s profile`,
      profile,
      isSelf,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function createList(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
      profile.list.push(req.body)
      profile.save()
      .then(() => {
        res.redirect(`/profiles/${req.user.profile._id}`)
      })
    })
}

function deleteList(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    console.log(profile)
    profile.list.remove({_id: req.params.id})
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

export {
  index,
  show,
  createList,
  deleteList

}