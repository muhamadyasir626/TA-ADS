const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

sneaks.getProducts('Nike', 9, (err, products) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Products:', products);
  }
});
