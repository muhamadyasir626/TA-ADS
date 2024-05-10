const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

sneaks.getProducts('Nike', 1, (err, products) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Products:', products);
  }
});
