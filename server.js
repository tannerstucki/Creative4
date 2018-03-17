const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({credentials: true, origin: true}));

app.use(express.static('public'))

let items = [];
let id = 0;
let totalPrice = 0;

app.get('/api/items', (req, res) => {
  for (i = 0; i < items.length; i++){
    if (items[i].amount < 0){
      items[i].amount = 0;
      items[i].price = 0;
    }
    //console.log(items[0]);
    totalPrice += items[i].price;
    //console.log(this.totalPrice)
  }
  //console.log(this.totalPrice);
  res.send(items);
});

app.post('/api/items', (req, res) => {
  id = id + 1;
  let item = {id:id, text:req.body.text, amount:req.body.amount, price:req.body.price, totalPrice: req.body.totalPrice, cost: req.body.cost};
  items.push(item);
  res.send(item);
});

app.delete('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = items.map(item => { return item.id; }).indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that item doesn't exist");
    return;
  }
  items.splice(removeIndex, 1);
  res.sendStatus(200);
});

app.put('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let itemsMap = items.map(item => { return item.id; });
  let index = itemsMap.indexOf(id);
  let item = items[index];
  item.text = req.body.text;
  item.amount = req.body.amount;
  item.price = req.body.price;
  item.totalPrice = req.body.totalPrice;
  res.send(item);
});

app.listen(4000, () => console.log('Server listening on port 4000!'))