const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'images/')
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
  const upload = multer({ storage: storage });

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/api/images', (req, res) => {
  const imageDir = path.join(__dirname, 'images');

  fs.readdir(imageDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif';
    });
    res.json(imageFiles);
  });
});

app.post('/api/upload', upload.single('image'), (req, res) => {
    if (req.file) {
      res.json({ success: true, file: req.file });
    } else {
      res.json({ success: false });
    }
  });


app.listen(5000, () => {
  console.log('Server started on port 5000');
});
