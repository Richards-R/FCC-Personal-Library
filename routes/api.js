/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const mongodb = require("mongodb");
const mongoose = require("mongoose");


module.exports = function (app) {
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let bookSchema = new mongoose.Schema({
    title: String,
    commentcount: Number
  });

  let Book = mongoose.model("Book", bookSchema);

  app.route('/api/books')
    // .get(function (req, res){
    //   //response will be array of book objects
    //   //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    // })
    
    .post(function (req, res){
      let title = req.body.title;
      console.log('Anew book title', newBook);
      if (!title){
        return res.json({ error: "missing required field title" });
      }
      let newBook = new Book({
        title: title
      });
      console.log('Bnew book title', newBook);
      newBook.save();
      return res.json(newBook);
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
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
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
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      Book.findByIdAndRemove(bookid)
      res.send("delete successful")
    });

};
