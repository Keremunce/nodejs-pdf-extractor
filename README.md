# PDF Text Extractor

A minimal Node.js + Express application that extracts plain text from uploaded PDF files. It uses `express-fileupload` to handle multipart form data and [`pdf-parse`](https://www.npmjs.com/package/pdf-parse) v2 to process the document on the server. A lightweight frontend is included so you can test the flow directly in the browser.

## Features
- Upload a PDF from the browser and read the extracted text in a large textarea.
- `/extract` API endpoint that accepts multipart uploads and responds with plain text.
- Graceful error handling and human-friendly status messages.

## Requirements
- Node.js ≥ 18 (the project targets active LTS releases).
- npm (ships with Node.js) or another compatible package manager.

## Getting Started

```bash
git clone https://github.com/Keremunce/nodejs-pdf-extractor.git
cd nodejs-pdf-extractor
npm install
npm start
```

The server starts on `http://localhost:3004`. Visit the same address in your browser to open the test page.

## Usage
1. Click **PDF file** and choose a local `.pdf`.
2. Press **Extract text**.
3. Wait a moment—status updates appear just above the textarea.
4. Read or copy the extracted text from the textarea.

## API Reference

```http
POST /extract
Content-Type: multipart/form-data
Field name: pdf (File)
```

- **Success (200)** – Returns raw text with `text/plain; charset=utf-8`.
- **400** – No file was included in the request.
- **500** – Server-side error while parsing the PDF.

Example using `curl`:

```bash
curl -X POST http://localhost:3004/extract \
  -F "pdf=@/path/to/document.pdf"
```

## Project Structure

```
.
├── index.js          # Express server and /extract endpoint
├── public
│   └── index.html    # Browser UI for manual testing
├── package.json
└── README.md
```

## Contributing
Pull requests and issues are welcome! If you find a bug or would like to improve the UI, documentation, or extraction accuracy, please open an issue first so we can discuss the change.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
