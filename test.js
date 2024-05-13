const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

// sneaks.getMostPopular( 1, (err, products) => {
//   if (err) {
//     console.error('Error:', err);
//   } else {
//     console.log('Products:', products);
//   }
// });

sneaks.getProductPrices("nike", function(err, product){
  console.log(product)
})