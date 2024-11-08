// app/upload/route.js
import formidable from "formidable";
import path from "path";
import fs from "fs";

// This tells Next.js not to parse the body automatically
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), "/public/uploads");
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }

    const file = files.song[0]; // Get the uploaded file
    const filePath = /uploads/${file.newFilename};
    
    // Return the path to the uploaded file
    res.status(200).json({ filePath });
  });
}