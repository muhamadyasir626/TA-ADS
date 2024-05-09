const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./db');
const async = require('hbs/lib/async');
const app = express()
const port = 4000
const axios = require('axios');
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();


app.set('view engine', 'ejs');

app.use(express.static('public'));

//convert data to json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/sneaker', (req, res) => {
  res.render('sneaker');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/home', (req, res) => {
  res.render('home-login');
});

// New route to handle sneaker search via Sneaks API
app.get('/api/search', (req, res) => {
  const query = req.query.q || 'Nike';
  const limit = parseInt(req.query.limit) || 9;

  console.log(`Searching for sneakers with query: ${query} and limit: ${limit}`);

  sneaks.getProducts(query, limit, (err, products) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Product not found or error occurred.' });
    }

    const formattedProducts = products.map((product) => ({
      thumbnail: product.thumbnail,
      description: product.shoeName,
      resellLinks: product.resellLinks.stockX, // Adjust to your preferred link
    }));

    res.json(formattedProducts);
  });
})

//register
app.post('/signup', async (req, res) => {
  const { name, email, password1, password2 } = req.body;

  try {
    // Check if email already exists
    const checkEmail = await collection.findOne({ email: email });
    if (checkEmail) {
      console.log("Email already exists.");
      return res.status(400).send('<script>alert("Email already exists."); window.location.href = "/signup";</script>');
    }

    // Check if password1 and password2 match
    if (password1 !== password2) {
      console.log("Passwords do not match.");
      return res.status(400).send('<script>alert("Passwords do not match."); window.location.href = "/signup";</script>');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password1, 10);

    // Create an object with user data
    const userDataToInsert = {
      name: name,
      email: email,
      password: hashedPassword // Store the hashed password
    };

    // Save user data to the database
    const insertedUserData = await collection.insertMany(userDataToInsert);

    // Respond with a success message
    console.log("Registration successful. Please log in.");
    res.status(200).send('<script>alert("Registration successful. Please log in."); window.location.href = "/login";</script>');
  } catch (error) {
    // Handle any errors
    console.error('Error during registration:', error);
    res.status(500).send('<script>alert("An error occurred during registration."); window.location.href = "/signup";</script>');
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const checkEmail = await collection.findOne({ email: req.body.email });

    if (!checkEmail) {
      res.send('<script>alert("Email not found");window.location.href="/login";</script>');
    }
    const checkPassword = await bcrypt.compare(req.body.password, checkEmail.password);
    if (checkPassword) {
      res.send('<script>alert("Login Succesesfull");window.location.href="/home";</script>');
    } else {
      res.send('<script>alert("Wrong Password!");window.location.href="/login";</script>');
    }
    
  }catch {
    res.send('<script>alert("Wrong details!");window.location.href="/login";</script>');
  }
  

  
});




app.use('/', (req, res) => {
  res.status(404);
  res.send("404");
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});