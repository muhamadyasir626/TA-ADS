const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./db');
const wishlist = require('./db');
const async = require('hbs/lib/async');
const app = express();
const port = 443;
const axios = require('axios');
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Setup session
app.use(session({
  secret: 'your_secret_key', // Replace with your own secret key
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/sneakersessions' }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // Session valid for 1 day
}));

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Convert data to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to pass user data to templates
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/sneaker', (req, res) => {
  res.render('sneaker');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/home', (req, res) => {
  if (req.session.user) {
    res.render('home-login', { user: req.session.user });
  } else {
    res.send('<script>alert("Please login first."); window.location.href = "/login";</script>');
  }
});
app.get('/sneaker-login', (req, res) => {
  if (req.session.user) {
    res.render('sneaker-login', { user: req.session.user });
  } else {
    res.send('<script>alert("Please login first."); window.location.href = "/login";</script>');
  }
});

//add wishlist
app.post('/add-to-wishlist', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: 'User not logged in.' });
  }

  const { shoeName, brand, releaseDate, description, colorway, make, retailPrice, styleID, thumbnail } = req.body;
  const userId = req.session.user._id;  // Ensure the user ID is correctly sourced from the session

  try {
    const wishlistItem = new wishlist({
      userId: userId,
      shoeName: shoeName,
      brand: brand,
      releaseDate: new Date(releaseDate),  // Ensure date is correctly formatted
      description: description,
      colorway: colorway,
      make: make,
      retailPrice: retailPrice,
      styleID: styleID,
      thumbnail: thumbnail
    });

    // Save wishlist item to database
    const insertwishlist = await wishlist.insertMany([wishlistItem])

    res.json({ success: true, message: 'Sneaker added to wishlist.' });
  } catch (error) {
    console.error('Error adding sneaker to wishlist:', error);
    res.status(500).json({ success: false, message: `An error occurred: ${error.message}` });
  }
});

//remove wishlist
app.post('/remove-from-wishlist', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: 'User not logged in.' });
  }
  try {
    await wishlist.deleteOne({
      userId: req.session.user._id,
      styleID: req.body.styleID
    });
    res.json({ success: true, message: 'Sneaker removed from wishlist.' });
  } catch (error) {
    console.error('Error removing sneaker from wishlist:', error);
    res.status(500).json({ success: false, message: `An error occurred: ${error.message}` });
  }
});

//page wishlist
app.get('/wishlist', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  try {
    const userId = req.session.user._id; // Adjust this according to how user session is stored
    const wishlistItems = await wishlist.find({ userId: userId }); // Assuming 'wishlist' is the model for wishlist items
    res.render('wishlist', { items: wishlistItems, user: req.session.user });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).send('Error fetching wishlist items');
  }
});




// New route to handle sneaker search via Sneaks API
app.get('/api/search', (req, res) => {
  const query = req.query.q || 'Nike';  // Default search query
  const limit = parseInt(req.query.limit, 10) || 9;  // Default limit
  const offset = parseInt(req.query.offset, 10) || 0;  // Default offset

  console.log(`Searching for sneakers with query: ${query}, limit: ${limit}, and offset: ${offset}`);

  sneaks.getProducts(query, 100, (err, products) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Product not found or error occurred.' });
    }

    if (!products || !Array.isArray(products)) {
      console.error('Invalid products array received');
      return res.status(500).json({ error: 'Invalid product data received.' });
    }

    const slicedProducts = products.slice(offset, offset + limit);
    const formattedProducts = slicedProducts.map((product) => {
      return {
        shoeName: product.shoeName,
        brand: product.brand,
        releaseDate: product.releaseDate,
        description: product.description,
        colorway: product.colorway,
        make: product.make,
        retailPrice: product.retailPrice,
        styleID: product.styleID,
        thumbnail: product.thumbnail,
        description: product.description,
        resellLinks: {
          goat: product.resellLinks.goat,
          flightClub: product.resellLinks.flightClub,
          stockX: product.resellLinks.stockX,

        },
        lowestResellPrice: {
          stockX: product.lowestResellPrice.stockX,
          flightClub: product.lowestResellPrice.flightClub,
          goat: product.lowestResellPrice.goat,
        }
      };
    });

    res.json(formattedProducts);
  });
});

// Register
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
    // const insertedUserData = await collection_register.insertMany([userDataToInsert]);
    const insertedUserData = await collection.insertMany([userDataToInsert]);
    console.log(insertedUserData)

    // Respond with a success message
    console.log("Registration successful. Please log in.");
    res.status(200).send('<script>alert("Registration successful. Please log in."); window.location.href = "/login";</script>');
  } catch (error) {
    // Handle any errors
    console.error('Error during registration:', error);
    res.status(500).send('<script>alert("An error occurred during registration."); window.location.href = "/signup";</script>');
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const checkEmail = await collection.findOne({ email: req.body.email });

    if (!checkEmail) {
      return res.send('<script>alert("Email not found");window.location.href="/login";</script>');
    }

    const checkPassword = await bcrypt.compare(req.body.password, checkEmail.password);
    if (checkPassword) {
      req.session.user = {
        name: checkEmail.name,
        email: checkEmail.email
      };
      return res.send('<script>alert("Login Successful");window.location.href="/home";</script>');
    } else {
      return res.send('<script>alert("Wrong Password!");window.location.href="/login";</script>');
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.send('<script>alert("Wrong details!");window.location.href="/login";</script>');
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
    }
    res.send('<script>alert("You have been logged out."); window.location.href = "/login";</script>');
  });
});

//display most popular
app.get('/api/most-popular', (req, res) => {
  const limit = parseInt(req.query.limit) || 9;
  const offset = parseInt(req.query.offset) || 0;

  console.log(`Fetching most popular sneakers with limit: ${limit}, offset: ${offset}`);

  // Fetch a large enough number to handle pagination properly
  sneaks.getMostPopular(100, (err, products) => {
    if (err) {
      console.error('Error fetching most popular products:', err);
      return res.status(500).json({ error: 'Error occurred while fetching most popular products.' });
    }

    const slicedProducts = products.slice(offset, offset + limit);
    const formattedProducts = slicedProducts.map((product) => {
      return {
        shoeName: product.shoeName,
        brand: product.brand,
        releaseDate: product.releaseDate,
        description: product.description,
        colorway: product.colorway,
        make: product.make,
        retailPrice: product.retailPrice,
        styleID: product.styleID,
        thumbnail: product.thumbnail,
        description: product.description,
        resellLinks: {
          goat: product.resellLinks.goat,
          flightClub: product.resellLinks.flightClub,
          stockX: product.resellLinks.stockX,

        },
        lowestResellPrice: {
          stockX: product.lowestResellPrice.stockX,
          flightClub: product.lowestResellPrice.flightClub,
          goat: product.lowestResellPrice.goat,
        }
      };
    });

    res.json(formattedProducts);
  });
});
 
app.get('/not-found', (req, res) => {
  res.status(404).send("404 - Page Not Found");
});


// 404 Error Page
app.use((req, res) => {
  res.status(404);
  res.send("404 - Page Not Found");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
