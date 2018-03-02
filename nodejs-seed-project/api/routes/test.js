var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/seproject');
var Schema = mongoose.Schema;

var productsSchema = new Schema({
  id: {type: Number},
  name: {type: String, required: true},
  price: {type: Number, required: true},
  createdat: {type: date},
  updatedat: {type: date},
  seller: {type: String}
}, {collection: 'tbl_products'});

var ProductsData = mongoose.model('ProductsData', productsSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  ProductsData.find()
      .then(function(doc) {
        res.render('index', {items: doc});
      });
});

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  var data = new ProductsData(item);
  data.save();

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  var id = req.body.id;

  ProductsData.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.title = req.body.title;
    doc.content = req.body.content;
    doc.author = req.body.author;
    doc.save();
  })
  res.redirect('/');
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  ProductsData.findByIdAndRemove(id).exec();
  res.redirect('/');
});

module.exports = router;
