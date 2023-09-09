/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const Book = require('../models').Book;

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      Book.find({})
      .then(data => {
        const formatData = data.map((book) => {
          return{
            _id : book._id,
            title: book.title,
            comments: book.comments,
            commentcount: book.comments.length
          }
        })
          res.json(formatData)}
      )
      .catch(err=> {
          res.send(err)});
       })
  
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      .post(function (req, res){
      let title = req.body.title;
      if (!title){
        return res.json({ error: "missing required field title" });
      }
      const newBook = new Book({
        title,
        comments: []
      });
      console.log('new book title', newBook);
      newBook.save();
      return res.json({_id: newBook._id, title: newBook.title});
      //response will contain new book object including atleast _id and title
    })
    
    .delete (async function(req, res){
      //if successful response will be 'complete delete successful'
        await Book.deleteMany({})
        res.send("complete delete successful")
      });

  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      Book.findById({bookid})
      .then(data => {
        return res.json({
            _id : data._id,
            title: data.title,
            comments: data.comments,
            commentcount: data.comments.length})
          })
      .catch(err=> {
          res.send(err)});
       })
      
    .post(async function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!comment){
        res.send("please enter a comment");
        return;
      }else{
        await Book.findById({bookid})
                  .then(data => {
                    data.comments.push(comment);
                    data.commentcount = data.comments.length;
                    data.save();
                    return res.json(data);
                    })
                  .catch(err=> {
                    return res.send(err)});
                }
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      Book.findByIdAndRemove(bookid)
      res.send("delete successful")
    });

};
