sneaks.getMostPopular( 1, (err, products) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Products:', products);
  }
});