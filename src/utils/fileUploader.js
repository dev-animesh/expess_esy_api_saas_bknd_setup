// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

import multer from 'multer';
import path from 'path';
import fs from 'fs'


// Ensure directory existence
const ensureDirectoryExistence = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};


// Custom error class
export class FileUploadError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}


// Max file size in bytes (10 MB)
const maxSize = 10 * 1024 * 1024;

// Allowed MIME types for images
const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

// Allowed MIME types for PDFs
const pdfMimeTypes = ['application/pdf'];

// File filter function for images
const imageFileFilter = (req, file, cb) => {
    if (imageMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new FileUploadError('Invalid file type. Only JPEG, PNG, and GIF images are allowed.'));
    }
};

// File filter function for PDFs
const pdfFileFilter = (req, file, cb) => {
    if (pdfMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new FileUploadError('Invalid file type. Only PDF files are allowed.'));
    }
};


//--------------------- Image Store -------------------------
const storage_img = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = './src/uploads';
        ensureDirectoryExistence(uploadDir);
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 100);
        const extension = path.extname(file.originalname);
        cb(null, uniqueSuffix + '_image' + extension)
    }
})

//--------------------- PDF Store -------------------------
const storage_pdf = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = './src/uploads/pdf_files';
        ensureDirectoryExistence(uploadDir);
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const date = new Date();
        const uniqueSuffix = date.getTime() + Math.round(Math.random() * 100);
        const extension = path.extname(file.originalname);
        const frontPart = file.originalname.split('.')[0];
        const finalFrontPart = frontPart.split(' ').join('_');
        cb(null, finalFrontPart + "_" + uniqueSuffix + extension);
    }
});

export const  upload_img =  multer({
    storage: storage_img,
    limits: { fileSize: maxSize },
    fileFilter: imageFileFilter
});

export const upload_pdf = multer({
    storage: storage_pdf,
    limits: { fileSize: maxSize },
    fileFilter: pdfFileFilter
});

// module.exports = {
//     upload_img,
//     upload_pdf,
//     FileUploadError
// };