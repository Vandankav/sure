# Credit Card Statement Parser

A full-stack MERN application that automatically parses credit card statements from various banks and extracts key information.

## Features

- **Multi-Bank Support**: HDFC Bank, ICICI Bank, SBI Card, Axis Bank, and American Express
- **Automatic Bank Detection**: Automatically identifies the bank from PDF content
- **Key Data Extraction**: Extracts 5 essential fields:
  - Cardholder Name
  - Card Number (last 4 digits)
  - Billing Cycle
  - Total Amount Due
  - Payment Due Date
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **File Upload**: Drag & drop or click to upload PDF files
- **JSON Export**: Download parsed results as JSON
- **Error Handling**: Comprehensive error handling and validation

## Tech Stack

### Backend

- Node.js
- Express.js
- Multer (file uploads)
- pdf-parse (PDF text extraction)
- CORS

### Frontend

- React 18
- Vite
- Tailwind CSS
- Axios

## Project Structure

```
credit-card-parser/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── uploadRoute.js
│   ├── uploads/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadForm.jsx
│   │   │   └── ResultCard.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
# or for development with auto-restart:
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Upload a credit card statement PDF by dragging and dropping or clicking to browse
3. Optionally select a specific bank (or leave as "Auto-detect")
4. Click "Parse Statement" to extract the data
5. View the extracted information in a clean, organized format
6. Download the results as JSON if needed
7. Use "Parse Another" to upload a new statement

## API Endpoints

### POST /api/upload

Uploads and parses a credit card statement PDF.

**Request:**

- Method: POST
- Content-Type: multipart/form-data
- Body: PDF file (field name: 'statement')
- Optional: bank selection (field name: 'bank')

**Response:**

```json
{
  "issuer": "HDFC Bank",
  "cardholder": "John Doe",
  "cardLast4": "4321",
  "billingCycle": "01 Aug 2024 - 30 Aug 2024",
  "totalDue": "₹12,340.50",
  "dueDate": "10 Sep 2024"
}
```

### GET /health

Health check endpoint.

**Response:**

```json
{
  "status": "OK",
  "message": "Credit Card Parser Backend is running"
}
```

## Supported Banks

- **HDFC Bank**: Detects "HDFC Bank" or "HDFC Credit Card" keywords
- **ICICI Bank**: Detects "ICICI Bank" or "ICICI Credit Card" keywords
- **SBI Card**: Detects "SBI Card" or "State Bank of India" keywords
- **Axis Bank**: Detects "Axis Bank" or "Axis Credit Card" keywords
- **American Express**: Detects "American Express" or "Amex" keywords

## Error Handling

The application handles various error scenarios:

- Invalid file types (non-PDF files)
- File size limits (10MB maximum)
- Network errors
- PDF parsing errors
- Unsupported bank statements
- Server errors

## Development

### Adding New Bank Parsers

1. Create a new parser file in `backend/utils/parsers/`
2. Implement the `parse(text)` method that returns the 5 required fields
3. Add bank detection keywords in `backend/routes/uploadRoute.js`
4. Update the parser selection logic

### Customizing the UI

The frontend uses Tailwind CSS for styling. You can customize:

- Colors in `frontend/tailwind.config.js`
- Component styles in individual `.jsx` files
- Global styles in `frontend/src/index.css`

## License

This project is open source and available under the MIT License.
