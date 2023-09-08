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
      let bookList = req.params;
      console.log(req.params);
            
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //console.log('Anew book title', newBook);
      if (!title){
        return res.json({ error: "missing required field title" });
      }
      const newBook = new Book({
        title,
        comments: []
      });
      console.log('Bnew book title', newBook);
      newBook.save();
      return res.json({_id: newBook._id, title: newBook.title});
      //response will contain new book object including atleast _id and title
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
