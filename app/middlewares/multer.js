import multer from 'multer';
import fs from 'fs';

// On définit les extensions selon le mime type.
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};

// créer dossier uploads si inexistant
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// diskStorage => destination du fichier / générer un nom de fichier unique
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    // Nettoyage du nom : suppression des espaces et de l'extension d'origine
    const name = file.originalname.split('.')[0].replace(/\s+/g, '_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name}_${Date.now()}.${extension}`);
  },
});

// On exporte le module avec ces paramètres en précisant
// qu'on attend un champ "image"
export default multer({ storage }).single('image');