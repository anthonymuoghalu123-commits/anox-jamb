const express = require('express');
const session = require('express-session');
const { OAuth2Client } = require('google-auth-library');
const { Pool } = require('pg');
const crypto = require('crypto');
const fs = require('fs');
const questionBank = require('./questions');
const novels = require('./data/novels.json');
const waec = require('./data/waec.json');



const app = express();
const PORT = process.env.PORT || 3000;

const GOOGLE_CLIENT_ID = '493300249244-497u57o2ol526sh9qc7q5taclblprtq9.apps.googleusercontent.com';
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

function generateActivationCode() {
  return 'ANOX-' + crypto.randomBytes(4).toString('hex').toUpperCase();
}

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

app.post('/api/activate', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        error: 'Please sign in with Google first'
      });
    }

    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        error: 'Activation code is required'
      });
    }

    const result = await pool.query(
      `SELECT id, activation_code
       FROM activations
       WHERE activation_code = $1
         AND activated = FALSE`,
      [code.trim()]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or already used activation code'
      });
    }

    await pool.query(
      `UPDATE activations
       SET google_id = $1,
           email = $2,
           activated = TRUE
       WHERE id = $3`,
      [
        req.session.user.id,
        req.session.user.email,
        result.rows[0].id
      ]
    );

    req.session.activated = true;

    res.json({
      success: true,
      message: 'App activated successfully'
    });

  } catch (error) {
    console.error('Activation error:', error.message);

    res.status(500).json({
      success: false,
      error: 'Activation failed'
    });
  }
});

app.post('/api/payment/verify', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        error: 'Please sign in with Google first'
      });
    }

    const { reference } = req.body;

    if (!reference) {
      return res.status(400).json({
        success: false,
        error: 'Payment reference is required'
      });
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return res.status(500).json({
        success: false,
        error: 'Paystack is not configured'
      });
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok || !data.status || !data.data) {
      return res.status(400).json({
        success: false,
        error: 'Unable to verify payment'
      });
    }

    const transaction = data.data;

    if (
      transaction.status !== 'success' ||
      transaction.currency !== 'NGN' ||
      transaction.amount !== 200000
    ) {
      return res.status(400).json({
        success: false,
        error: 'Payment verification failed'
      });
    }

    const activationCode = generateActivationCode();

    await pool.query(
      `INSERT INTO activations
        (google_id, email, activation_code, payment_reference, activated)
       VALUES ($1, $2, $3, $4, FALSE)`,
      [
        req.session.user.id,
        req.session.user.email,
        activationCode,
        transaction.reference
      ]
    );

    res.json({
      success: true,
      message: 'Payment verified successfully',
      reference: transaction.reference,
      activationCode
    });

  } catch (error) {
    console.error('Paystack verification error:', error.message);

    res.status(500).json({
      success: false,
      error: 'Payment verification failed'
    });
  }
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
    clientId: GOOGLE_CLIENT_ID,
    paystackPublicKey: process.env.PAYSTACK_PUBLIC_KEY || ''
  });
});

app.get('/api/auth/me', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.json({ authenticated: false });
    }

    const result = await pool.query(
      `SELECT activated
       FROM activations
       WHERE google_id = $1
         AND activated = TRUE
       LIMIT 1`,
      [req.session.user.id]
    );

    const activated = result.rows.length > 0;

    req.session.activated = activated;

    res.json({
      authenticated: true,
      user: req.session.user,
      activated
    });

  } catch (error) {
    console.error('Authentication status check failed:', error.message);

    res.status(500).json({
      authenticated: true,
      user: req.session.user,
      activated: false
    });
  }
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
