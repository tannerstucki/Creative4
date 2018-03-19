var app = new Vue({
  el: '#app',
  data: {
    items: [],
    text: '',
    amount: 1,
    price: 0,
    totalPrice: 0,
    cost: 0,
  },
  created: function() {
    this.getItems();
  },
  computed: {
    activeItems: function() {
      return this.items.filter(function(item) {
	return !item.completed;
      });
    },
    filteredItems: function() {
      if (this.show === 'active')
	return this.items.filter(function(item) {
	  return !item.completed;
	});
      if (this.show === 'completed')
	return this.items.filter(function(item) {
	  return item.completed;
	});
      return this.items;
    },
  },
  totalPrice: function(){
    for (i = 0; i < items.length(); i++){
      totalPrice += items[i].price;
    }
    return totalPrice;
  },
  methods: {
    getItems: function() {
      axios.get("http://167.99.111.214:4000/api/items").then(response => {
	      this.items = response.data;
        for (i = 0; i < this.items.length(); i++){
          console.log(totalPrice);
          totalPrice += this.items[i].price;
        }
        res.sendStatus(200);
	      return true;
      }).catch(err => {
      });
    },
    addItem2: function(text,price) {
      cost = price;
      amount = this.amount;
      price = price * amount;
      this.totalPrice += price;
      axios.post("http://167.99.111.214:4000/api/items", {
        text: text,
        amount: amount,
        price: price,
        cost: cost,
        completed: false,
        totalPrice: this.totalPrice
      }).then(response => {
        this.text = "";
        this.amount = 1,
        this.getItems();
        return true;
      }).catch(err => {
      });
    },
    deleteItem: function(item) {
      axios.delete("http://167.99.111.214:4000/api/items/" + item.id).then(response => {
        this.getItems();
        return true;
      }).catch(err => {
      });
    },
    incrementUp: function(item){
      temp = Number(item.amount);
      temp = temp+1;
      console.log(typeof temp);
      price = temp * item.cost;
      item.totalPrice += item.price;
      //console.log(item.totalPrice);
      axios.put("/api/items/" + item.id, {
        text: item.text,   
        amount: temp,
        price: price,
        totalPrice: item.totalPrice,
        orderChange: false,
        sortChange: false,
      }).then(response => {
	      this.getItems();
        return true;
      }).catch(err => {
      });
    },
    incrementDown: function(item){
      temp = (item.price / item.amount);
      amount = item.amount - 1;
      price = amount * item.cost;
      item.totalPrice += item.price;
      axios.put("/api/items/" + item.id, {
        text: item.text,   
        amount: item.amount - 1,
        price: price,
        totalPrice: item.totalPrice,
        orderChange: false,
        sortChange: false,
      }).then(response => {
	      this.getItems();
        return true;
      }).catch(err => {
      });
    },
  }
});
