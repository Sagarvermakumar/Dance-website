const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const body = require('body-parser')
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/contectDance');
}
const port = 5500;

// define mongoose scheema
const contectSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    address: String,
    password: String
  });
// compile models
  var Contect = mongoose.model('Contect', contectSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('home.pug', params);
});
app.get('/contect', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('contect.pug', params);
});

app.post('/contect', (req, res)=>{
    var mydata = new Contect(req.body);
    mydata.save().then(()=>{
        res.send(" your data has been submited succesfully")
        
    }).catch(()=>{
        res.status(400).send(" your data will not submited ")
    })
    // res.status(200).render('contect.pug', params);
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});