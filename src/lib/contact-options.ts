// Shared by the contact form (what it offers) and /api/contact (what it accepts).

export const serviceOptions = [
  "Mobile Application",
  "Web Application",
  "AI Solution",
  "Automation",
  "Custom Software",
  "Backend & APIs",
];

export const budgetOptions: Record<"INR" | "USD", string[]> = {
  INR: [
    "Under ₹50,000",
    "₹50,000 – ₹1 lakh",
    "₹1 – ₹2.5 lakh",
    "₹2.5 – ₹5 lakh",
    "₹5 – ₹10 lakh",
    "₹10 – ₹25 lakh",
    "₹25 – ₹50 lakh",
    "₹50 lakh – ₹1 crore",
    "₹1 crore+",
    "Not sure yet",
  ],
  USD: [
    "Under $1,000",
    "$1,000 – $2,500",
    "$2,500 – $5,000",
    "$5,000 – $10,000",
    "$10,000 – $25,000",
    "$25,000 – $50,000",
    "$50,000 – $100,000",
    "$100,000+",
    "Not sure yet",
  ],
};

export const timelineOptions = ["ASAP", "1–3 months", "3–6 months", "6+ months", "Flexible"];

// Maximum characters per free-text field. The form sets these as maxLength and
// the API rejects anything longer.
export const contactLimits = {
  name: 100,
  company: 100,
  email: 254,
  phone: 30,
  project: 2000,
  message: 2000,
} as const;
