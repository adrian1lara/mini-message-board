const express = require('express');
const router = express.Router();

// default message

const messages = [
  {
    text: "Hello World",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello man",
    user: "Charles",
    added: new Date()
  }
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini Messageboard', messages: messages })
})

router.get('/new', function(req, res, next) {
  res.render('form')
})

router.post('/new', async (req, res) => {
  let messageText = req.body.txtMessage
  let usertText = req.body.txtAuthor

  messages.push({ text: messageText, user: usertText, added: new Date() })

  res.redirect('/')

})

module.exports = router;
