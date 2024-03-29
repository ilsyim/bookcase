import axios from "axios"
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
  req.body.movieAdapt = !!req.body.movieAdapt
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

function flipMovie(req, res) {
  Book.findById(req.params.id)
  .then(book => {
    book.movieAdapt = !book.movieAdapt
    book.save()
    .then(() => {
      res.redirect(`/books/${book._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/books')
  })
}

function edit(req, res) {
  Book.findById(req.params.id)
  .then(book =>{
    res.render('books/edit', {
      title: "Edit this Book",
      book
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/books')
  })
}

function update(req, res) {
  Book.findById(req.params.id)
  .then(book => {
    if (book.owner.equals(req.user.profile._id)) {
      req.body.movieAdapt = !!req.body.movieAdapt
      book.updateOne(req.body, {new:true})
      .then(() => {
        res.redirect(`/books/${book._id}`)
      })
    } else {
      throw new Error ('Not yours!')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/books')
  })
}

function createReview(req, res) {
  req.body.owner = req.user.profile._id
  Book.findById(req.params.id)
  .then(book => {
    book.reviews.push(req.body)
    book.save()
    .then(() => {
      res.redirect(`/books/${book._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteBook(req, res) {
  Book.findById(req.params.id)
  .then(book => {
    if (book.owner.equals(req.user.profile._id)) {
      book.delete()
      .then(() => {
        res.redirect('/books')
      })
    } else {
      throw new Error ('Not Yours')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/books')
  })
}

function deleteReview(req, res) {
  Book.findById(req.params.bookId)
  .then(book => {
    const review = book.reviews.id(req.params.reviewId)
    if (review.owner.equals(req.user.profile._id)){
      book.reviews.remove({_id: req.params.reviewId})
      book.save()
      .then(() => {
        res.redirect(`/books/${book._id}`)
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/books')
  })
}
function newBookPage(req, res) {
    res.render('books/search', {
      title: 'Search all Books',
      search: req.body.search ? req.body.search : null,
      results: null
    })
}

function searchBook(req, res) {
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.search}`)
  .then(response => {
    const books = response.data.items.map((b)=> {
      return {
        title: b.volumeInfo.title,
        authors: b.volumeInfo.authors,
        pageCount: b.volumeInfo.pageCount,
        imageLinks: b.volumeInfo.imageLinks.thumbnail
      }
      console.log(books)
    })
    res.render('books/search', {
      title: 'Search Result',
      search: req.body.search ? req.body.search : null,
      results: books
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/books/new')
  })
}

export {
  index,
  create,
  show,
  flipMovie,
  edit,
  update,
  createReview,
  deleteBook,
  deleteReview,
  newBookPage,
  searchBook
}