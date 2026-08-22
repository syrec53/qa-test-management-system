export const INITIAL_TEST_CASES = [
  {
    id: "TC-101",
    title: "User Authentication via JWT Token",
    module: "Auth & Security",
    type: "API",
    priority: "Critical",
    status: "Passed",
    automationStatus: "Automated",
    executionTime: "120ms",
    steps: [
      "Send POST request to /api/v1/auth/login with valid email and password.",
      "Verify HTTP status code is 200 OK.",
      "Assert payload contains non-empty access_token and refresh_token.",
      "Verify JWT header contains algorithm HS256."
    ],
    expectedResult: "JWT Token returned successfully with 24-hour expiration payload.",
    author: "Elena Rostova",
    lastRun: "2026-08-22 14:30"
  },
  {
    id: "TC-102",
    title: "SQL Injection Prevention on Search Endpoint",
    module: "Auth & Security",
    type: "Security",
    priority: "Critical",
    status: "Passed",
    automationStatus: "Automated",
    executionTime: "450ms",
    steps: [
      "Send GET request to /api/v1/products?query=SELECT * FROM users;--",
      "Verify system sanitizes input and returns 200 with 0 results or 400 Bad Request.",
      "Check server logs to ensure no SQL syntax error was thrown."
    ],
    expectedResult: "Query sanitized safely without database error leakage.",
    author: "Elena Rostova",
    lastRun: "2026-08-22 14:32"
  },
  {
    id: "TC-103",
    title: "Payment Gateway Checkout Flow",
    module: "Billing & Cart",
    type: "E2E",
    priority: "High",
    status: "Failed",
    automationStatus: "Automated",
    executionTime: "2450ms",
    steps: [
      "Add item to cart and proceed to Checkout page.",
      "Fill credit card details (Test Visa 4242...).",
      "Click 'Complete Purchase' button.",
      "Verify redirected to /order-confirmation with valid Order ID."
    ],
    expectedResult: "Order processed and confirmation email triggered.",
    author: "Marcus Vance",
    lastRun: "2026-08-22 15:10"
  },
  {
    id: "TC-104",
    title: "User Profile Avatar File Upload Limit",
    module: "User Management",
    type: "UI",
    priority: "Medium",
    status: "Passed",
    automationStatus: "Manual",
    executionTime: "890ms",
    steps: [
      "Navigate to Profile -> Settings.",
      "Upload image file exceeding 10MB limit (e.g. 15MB sample.png).",
      "Verify error toast message 'File size exceeds maximum allowed limit (5MB)'."
    ],
    expectedResult: "Upload rejected gracefully with localized error alert.",
    author: "Sarah Jenkins",
    lastRun: "2026-08-21 11:15"
  },
  {
    id: "TC-105",
    title: "Rate Limiting on Password Reset Request",
    module: "Auth & Security",
    type: "API",
    priority: "High",
    status: "Passed",
    automationStatus: "Automated",
    executionTime: "310ms",
    steps: [
      "Trigger /api/v1/auth/reset-password endpoint 10 times within 60 seconds.",
      "Assert 11th request returns HTTP 429 Too Many Requests.",
      "Check headers for Retry-After directive."
    ],
    expectedResult: "HTTP 429 returned after threshold exceeded.",
    author: "Elena Rostova",
    lastRun: "2026-08-22 10:00"
  },
  {
    id: "TC-106",
    title: "Dark Mode Toggle Persistence across Page Reloads",
    module: "UI Core",
    type: "UI",
    priority: "Low",
    status: "Untested",
    automationStatus: "Manual",
    executionTime: "-",
    steps: [
      "Toggle UI theme to Dark Mode in top navigation bar.",
      "Reload browser window or open new tab.",
      "Verify theme remains dark and localStorage item theme='dark' exists."
    ],
    expectedResult: "Theme preference persists reliably across sessions.",
    author: "Sarah Jenkins",
    lastRun: "Never"
  },
  {
    id: "TC-107",
    title: "Cart Quantity Synchronous Update",
    module: "Billing & Cart",
    type: "Regression",
    priority: "High",
    status: "Blocked",
    automationStatus: "Automated",
    executionTime: "-",
    steps: [
      "Increase cart quantity for item ID #884 from 1 to 5.",
      "Verify subtotal calculation updates instantaneously without full page reload.",
      "Verify API payload payload reflects total matching stock limit."
    ],
    expectedResult: "Subtotal dynamically matches quantity times unit price.",
    author: "Marcus Vance",
    lastRun: "2026-08-20 09:40"
  }
];

export const INITIAL_DEFECTS = [
  {
    id: "BUG-301",
    title: "Payment Gateway returns 500 Internal Error during Stripe webhook callback",
    severity: "Critical",
    status: "Open",
    linkedTestCaseId: "TC-103",
    reporter: "Marcus Vance",
    assignee: "Alex Rivera",
    module: "Billing & Cart",
    createdAt: "2026-08-22 15:15",
    description: "During e2e test execution for Payment Gateway Checkout Flow, the server failed to process event stripe_charge_succeeded due to missing signature secret header."
  },
  {
    id: "BUG-302",
    title: "Cart subtotal displays NaN when switching currency selectors rapidly",
    severity: "High",
    status: "In Progress",
    linkedTestCaseId: "TC-107",
    reporter: "Sarah Jenkins",
    assignee: "David Kim",
    module: "Billing & Cart",
    createdAt: "2026-08-20 10:12",
    description: "Rapidly toggling currency from USD -> EUR -> GBP causes race condition in price conversion helper, producing NaN on cart total badge."
  },
  {
    id: "BUG-303",
    title: "Export to CSV fails when test case contains special unicode characters",
    severity: "Medium",
    status: "Resolved",
    linkedTestCaseId: "TC-104",
    reporter: "Elena Rostova",
    assignee: "Sophia Chen",
    module: "Reports",
    createdAt: "2026-08-18 16:45",
    description: "CSV UTF-8 BOM header missing, causing Excel to mangle Cyrillic and CJK test descriptions."
  }
];

export const INITIAL_TEST_RUNS = [
  {
    id: "TR-8901",
    name: "v2.4.0 Pre-Release Automated Regression Suite",
    environment: "Staging (us-east-1)",
    totalCases: 7,
    passed: 4,
    failed: 1,
    blocked: 1,
    untested: 1,
    status: "Completed",
    duration: "4m 12s",
    executedAt: "2026-08-22 14:30"
  },
  {
    id: "TR-8902",
    name: "Nightly Security & Penetration Scan",
    environment: "Production Replica",
    totalCases: 3,
    passed: 3,
    failed: 0,
    blocked: 0,
    untested: 0,
    status: "Completed",
    duration: "1m 45s",
    executedAt: "2026-08-22 03:00"
  }
];
