import express from 'express';

const app = express();
app.use(express.json());

let loginCallCount = 0;
app.post('/api/login', (req, res) => {
  loginCallCount++;
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

app.get('/api/login/call-count', (req, res) => {
  res.json({ count: loginCallCount });
});


// Item 5 — same endpoint, different response based on the REQUEST BODY, not the URL.
// Item 6 — delay support, via an optional field in the same request body.
app.post('/api/payment', async (req, res) => {
  const { cardNumber, simulateDelayMs } = req.body;

  if (simulateDelayMs) {
    await new Promise(resolve => setTimeout(resolve, simulateDelayMs));
  }

  if (cardNumber === '4000000000000002') {
    // test card for a decline — same URL, same method, different outcome
    return res.status(402).json({ status: 'declined', reason: 'card_declined' });
  }

  return res.status(200).json({ status: 'success', transactionId: 'txn_abc123' });
});

app.listen(4000, () => {
  console.log('Mock server running on http://localhost:4000');
});