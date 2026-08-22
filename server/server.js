import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Data Store for QA Management
let testCases = [
  { id: "TC-101", title: "User Authentication via JWT Token", module: "Auth & Security", status: "Passed", priority: "Critical" },
  { id: "TC-102", title: "SQL Injection Prevention on Search Endpoint", module: "Auth & Security", status: "Passed", priority: "Critical" },
  { id: "TC-103", title: "Payment Gateway Checkout Flow", module: "Billing & Cart", status: "Failed", priority: "High" }
];

let defects = [
  { id: "BUG-301", title: "Payment Gateway returns 500 Internal Error during Stripe webhook callback", severity: "Critical", status: "Open" }
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'QAFlow Pro Backend API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test-cases', (req, res) => {
  res.json({ success: true, count: testCases.length, data: testCases });
});

app.post('/api/test-cases', (req, res) => {
  const newCase = {
    id: `TC-${Math.floor(100 + Math.random() * 900)}`,
    ...req.body,
    status: req.body.status || 'Untested',
    createdAt: new Date().toISOString()
  };
  testCases.unshift(newCase);
  res.status(201).json({ success: true, data: newCase });
});

app.get('/api/defects', (req, res) => {
  res.json({ success: true, count: defects.length, data: defects });
});

app.post('/api/defects', (req, res) => {
  const newBug = {
    id: `BUG-${Math.floor(300 + Math.random() * 600)}`,
    ...req.body,
    status: 'Open',
    createdAt: new Date().toISOString()
  };
  defects.unshift(newBug);
  res.status(201).json({ success: true, data: newBug });
});

app.post('/api/execute-suite', (req, res) => {
  const { suiteId } = req.body;
  const executionResults = testCases.map(tc => ({
    id: tc.id,
    title: tc.title,
    status: tc.status === 'Failed' ? 'Failed' : 'Passed',
    latency: `${Math.floor(80 + Math.random() * 300)}ms`
  }));

  res.json({
    success: true,
    runId: `TR-${Math.floor(8000 + Math.random() * 1000)}`,
    executedAt: new Date().toISOString(),
    results: executionResults
  });
});

app.listen(PORT, () => {
  console.log(`⚡ QAFlow Pro Backend API running on http://localhost:${PORT}`);
});
