const express = require('express');
const dotenv = require('dotenv');
const moongose = require('mongoose');


const router = express.Router();
dotenv.config()


const dbUser = process.env.DB_USER
const database = process.env.DATABASE
const password = process.env.DB_PASSWORD

const url = `mongodb+srv://${dbUser}:${password}@cluster0.uq02s3f.mongodb.net/${database}?retryWrites=true&w=majority`

main().catch(err => console.log(err));

async function main() {
  await moongose.connect(url);
}

const MessageSchema = new moongose.Schema({
  user: String,
  message: String,
  added: Date
})

const MessageCollection = moongose.model('Message', MessageSchema)


// default message

/* GET home page. */
router.get('/', async function(req, res, next) {

  try {

    const messages = await MessageCollection.find()

    res.render('index', { title: 'Mini Messageboard', messages: messages })

  } catch (err) {
    console.error(err)
    next(err)
  }

})

router.get('/new', function(req, res, next) {
  res.render('form')
})

router.post('/new', async (req, res) => {
  let messageText = req.body.txtMessage
  let usertText = req.body.txtAuthor


  const messageDetail = new MessageCollection({
    user: usertText,
    message: messageText,
    added: new Date()
  })

  try {
    const messageSave = await messageDetail.save()
    if (messageSave) {
      res.redirect('/')
    } else {

    }

  } catch (err) {
    console.error(err)
  }



})

module.exports = router;
