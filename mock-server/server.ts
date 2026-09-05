import express from 'express';

const app = express();
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Real DIGIPULSE bug replicate: wrong creds pe status 200 hi aata hai, error body mein hota hai
  if (email === 'test@digipulse.com' && password === 'wrongpass') {
    return res.status(200).json({ status: 401, message: 'Unauthorized' });
  }

  return res.status(200).json({ success: true, token: 'fake-jwt-abc123' });
});

app.post('/api/contacts', (req, res) => {
  const { name, email } = req.body;

  // Real DIGIPULSE bug replicate: missing email 500 crash deta hai, 400/422 nahi
  if (!email) {
    throw new Error('Cannot read property of undefined - email is required');
  }

  return res.status(201).json({ id: 101, name, email });
});

app.listen(4000, () => {
  console.log('Mock server running on http://localhost:4000');
});