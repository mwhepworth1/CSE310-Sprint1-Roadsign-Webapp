const express = require('express');
const path = require('path');
const app = express();
const port = 5500;

// Add body parser middleware
app.use(express.json());

// In-memory storage for shared messages (replace with database in production)
const messages = new Map();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
//app.use(express.static(path.join(__dirname, 'public')));

// Render index.ejs for the root route and pass a message
app.get('/', (req, res) => {
  res.render('index', { shared: false, phrase: 'Created By:[NL]Matthew[NL]Hepworth' });
});

// Share endpoint
app.post('/share', (req, res) => {
  const { message } = req.body;
  const id = Math.random().toString(36).substring(2, 8); // Generate random ID
  messages.set(id, message);
  res.json({ id });
});

// View shared message
app.get('/:id', (req, res) => {
  const message = messages.get(req.params.id);
  if (message) {
    res.render('index', { shared: true, phrase: message });
  } else {
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
