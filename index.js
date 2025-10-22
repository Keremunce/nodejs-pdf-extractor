const express = require("express");
const fileUpload = require("express-fileupload");
const { PDFParse } = require("pdf-parse");

const app = express();

app.use(fileUpload());
app.use("/", express.static("public"));

app.post("/extract", async (req, res) => {
    const pdfFile =
        req.files?.pdf ||
        req.files?.pdfFile ||
        (req.files ? Object.values(req.files)[0] : undefined);

    if (!pdfFile) {
        return res
            .status(400)
            .type("text/plain; charset=utf-8")
            .send("No PDF file was uploaded.");
    }

    try {
        const parser = new PDFParse({ data: pdfFile.data });
        const { text } = await parser.getText();
        await parser.destroy();

        res.status(200).type("text/plain; charset=utf-8").send(text ?? "");
    } catch (error) {
        console.error("Error extracting text from PDF:", error);
        res
            .status(500)
            .type("text/plain; charset=utf-8")
            .send("An error occurred while extracting the PDF text.");
    }
});
app.listen(3004, () => {
    console.log("Server started on http://localhost:3004");
});
