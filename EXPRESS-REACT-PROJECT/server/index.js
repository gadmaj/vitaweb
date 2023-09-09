process.env.NODE_ENV = 'production';
const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/api/images', (req, res) => {
  const imageDir = path.join(__dirname, 'images');

  fs.readdir(imageDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const imageFiles = files.filter((file) => {
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

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Handle SPA
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(80, () => {
  console.log('Server started on port 80');
});

