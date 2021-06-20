/*let User = require('mongoose').model('User');*/
let express = require('express');
let router = express.Router();
let userControllers = require('../controllers/userController.js')
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});


router.get('/', (req, res, next) => {
  //res.send('respond with a resource');
  return User.find(function (err, clients) {
    if (!err) {
      res.render('detail.ejs', {
        title: 'Details',
        clients: clients
      });
    } else {
      return console.log(err);
    }
  });
});

router.post('/', (req, res, next) => {
  // res.json(req.body);
  let personInfo = req.body; //Get the parsed information   

  if (!personInfo.username || !personInfo.fullname || !personInfo.age) {
    res.send();
  } else {

    let c = 1;
    User.findOne({}, (err, data) => {

      if (data) {
        c = data.unique_id + 1;
      }

      let newPerson = new User({
        unique_id: c,
        username: personInfo.username,
        fullname: personInfo.fullname,
        age: personInfo.age
      });

      newPerson.save((err, Person) => {
        /* if (err)
          console.log(err);
        else
          console.log('Success'); */
      });

    }).sort({ _id: -1 }).limit(1);

  }
  res.json({ Success: '1' });
});

router.get('/show', (req, res, next) => {

  User.find((err, response) => {
    res.json(response);
  });

});

router.put('/user/:id', (req, res) => {
  let id = req.params.id;
  let personInfo = req.body;

  User.update({ unique_id: id }, {
    username: personInfo.username,
    fullname: personInfo.fullname,
    age: personInfo.age
  }, (err, rawResponse) => {
    // console.log(rawResponse);
  });

});

router.delete('/user/:id', (req, res) => {
  let id = req.params.id;
  /*User.find({unique_id:id}, function(err, data) {
    data.remove();
  });*/
  User.findOneAndRemove({ 'unique_id': id }, (err, offer) => {});
  res.send("Success");
});

module.exports = router;
