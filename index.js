
const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const app = express()
const port =  process.env.PORT ||  5000;


app.use(cors());
app.use(bodyParser.json());


// console.log(process.env.DB_USER);

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fomhs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {

  const eventCollection = client.db("volunteer").collection("events");

app.get('/events',(req,res)=>{
    eventCollection.find()
  .toArray((err,items)=>{
res.send(items)

  
  })
})





app.post('/eventsadd',(req,res)=>{
const newEvent = req.body;
console.log('adding new event' ,newEvent);
eventCollection.insertOne(newEvent)
.then(result => {
 
 res.send(result.insertedCount > 0 )
})

})

app.delete('/deleteEvent/:id',(req,res)=> {

const id =  ObjectID(req.params.id);
console.log('delete',id);
eventCollection.findOneAndDelete({_id:id})
.then(document => res.send(!!document.value))

})





});





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})