import { Book } from '../models/book.js'

function index(req, res) {
  Book.find({})
  .then(books => {
    res.render('books/index', {
      title: 'All Books',
      books,
      user: req.user ? req.user : null
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Book.create(req.body)
  .then(book => {
    res.redirect('/books')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/books')
  })
}

function show(req, res) {
  Book.findById(req.params.id)
  .populate('owner')
  .then(book => {
    res.render('books/show', {
      book,
      title: 'This Book'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/books')
  })
}


export {
  index,
  create,
  show,
}