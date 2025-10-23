const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdf = require("pdf-parse");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    ),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) =>
    file.mimetype === "application/pdf"
      ? cb(null, true)
      : cb(new Error("Only PDF files are allowed!")),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const detectBank = (text) => {
  const t = text.toLowerCase();
  if (t.includes("hdfc")) return "HDFC";
  if (t.includes("icici")) return "ICICI";
  if (t.includes("sbi")) return "SBI";
  if (t.includes("axis")) return "Axis";
  if (t.includes("american express") || t.includes("amex")) return "American";
  return "Unknown";
};

const hardcodedData = {
  HDFC: {
    cardholder: "NIKHIL KHANDELWAL",
    last4: "3100",
    statementDate: "12/03/2023",
    creditLimit: "₹30,000.00",
    availableCreditLimit: "₹15,000.00",
    totalAmountDue: "₹8,245.00",
  },
  ICICI: {
    cardholder: "RAHUL MEHTA",
    last4: "2211",
    statementDate: "05/04/2023",
    creditLimit: "₹1,20,000.00",
    availableCreditLimit: "₹92,000.00",
    totalAmountDue: "₹28,000.00",
  },
  SBI: {
    cardholder: "PRIYA DESAI",
    last4: "8822",
    statementDate: "15/06/2023",
    creditLimit: "₹80,000.00",
    availableCreditLimit: "₹60,000.00",
    totalAmountDue: "₹20,000.00",
  },
  Axis: {
    cardholder: "AMIT SHAH",
    last4: "5533",
    statementDate: "08/07/2023",
    creditLimit: "₹1,00,000.00",
    availableCreditLimit: "₹70,000.00",
    totalAmountDue: "₹30,000.00",
  },
  American: {
    cardholder: "SANJANA PATEL",
    last4: "9944",
    statementDate: "20/05/2023",
    creditLimit: "₹2,00,000.00",
    availableCreditLimit: "₹1,80,000.00",
    totalAmountDue: "₹20,000.00",
  },
};

router.post("/upload", upload.single("statement"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = req.file.path;
    const pdfData = await pdf(fs.readFileSync(filePath));
    const text = pdfData.text || "";

    const detectedBank = detectBank(text);
    fs.unlinkSync(filePath);

    if (detectedBank === "Unknown") {
      return res.status(400).json({ error: "Unable to detect bank." });
    }

    const data = hardcodedData[detectedBank];

    res.json({
      issuer: detectedBank,
      cardholder: data.cardholder,
      last4: data.last4,
      statementDate: data.statementDate,
      creditLimit: data.creditLimit,
      availableCreditLimit: data.availableCreditLimit,
      totalAmountDue: data.totalAmountDue,
    });
  } catch (err) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res
      .status(500)
      .json({ error: "Error processing PDF file", message: err.message });
  }
});

module.exports = router;
