const express = require('express');
const session = require('express-session');
const { OAuth2Client } = require('google-auth-library');
const { Pool } = require('pg');
const fs = require('fs');
const questionBank = require('./questions');
const novels = require('./data/novels.json');
const waec = require('./data/waec.json');



const app = express();
const PORT = process.env.PORT || 3000;

const GOOGLE_CLIENT_ID = '493300249244-497u57o2ol526sh9qc7q5taclblprtq9.apps.googleusercontent.com';
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

pool.query(`
  CREATE TABLE IF NOT EXISTS activations (
    id SERIAL PRIMARY KEY,
    google_id TEXT UNIQUE,
    email TEXT,
    activation_code TEXT UNIQUE,
    payment_reference TEXT UNIQUE,
    activated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`).then(() => {
  console.log('Activation database ready');
}).catch((error) => {
  console.error('Activation database error:', error.message);
});

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'anox-local-session-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: false
  }
}));
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

app.use(express.static(__dirname));

app.post('/api/activate', (req, res) => {
  const { code } = req.body;

  if (code !== 'ANOX2026') {
    return res.status(400).json({
      success: false,
      error: 'Invalid activation code'
    });
  }

  req.session.activated = true;

  res.json({
    success: true,
    message: 'App activated successfully'
  });
});



const subjects = [
  "English Language",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Government",
  "Literature in English",
  "Geography",
  "Commerce",
  "Accounting",
  "Christian Religious Studies",
  "Islamic Religious Studies",
  "Agricultural Science",
  "Computer Studies",
  "Civic Education",
  "History",
  "Igbo",
];

app.get('/api/auth/config', (req, res) => {
  res.json({
    clientId: GOOGLE_CLIENT_ID
  });
});

app.get('/api/auth/me', (req, res) => {
  if (!req.session.user) {
    return res.json({ authenticated: false });
  }

  res.json({
    authenticated: true,
    user: req.session.user,
    activated: !!req.session.activated
  });
});

app.post('/api/auth/google', async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        error: 'Google credential is required'
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.sub) {
      return res.status(401).json({
        error: 'Invalid Google account'
      });
    }

    req.session.user = {
      id: payload.sub,
      name: payload.name || '',
      email: payload.email || '',
      picture: payload.picture || ''
    };

    res.json({
      success: true,
      user: req.session.user
    });

  } catch (error) {
    console.error('Google authentication error:', error.message);

    res.status(401).json({
      error: 'Google authentication failed'
    });
  }
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

app.get('/api/data', (req, res) => {
  res.json({ questionBank, subjects, novels: novels.novels, waec });
});
app.get('/', (req, res) => {
  res.redirect('/anox');
});
app.get("/anox", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
  console.log(`ANOX JAMB app running at http://localhost:${PORT}/anox`);
});
