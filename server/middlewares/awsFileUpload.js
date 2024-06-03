const { S3Client } = require('@aws-sdk/client-s3');
const { Readable } = require('stream');
const { Upload } = require('@aws-sdk/lib-storage');

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_KEY;
const S3_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const { AWS_REGION } = process.env;
const { CLOUD_FRONT_DOMAIN } = process.env;

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const fileUpload = async (req, res, next) => {
  const files = req.files;
  if (!files || files.length === 0) {
    return next();
  }

  const uploadedFiles = [];

  try {
    await Promise.all(
      files.map(async (file) => {
        const fileStream = new Readable();
        fileStream.push(file.buffer);
        fileStream.push(null);

        const params = {
          Bucket: S3_BUCKET_NAME,
          Key: file.originalname,
          Body: fileStream,
          ContentType: file.mimetype,
        };

        const upload = new Upload({
          client: s3Client,
          params: params,
        });

        const data = await upload.done();
        //console.log('Upload result:', data);

        uploadedFiles.push({
          originalname: file.originalname,
          location: data.Location,
        });
      })
    );

    //console.log('Uploaded Files:', uploadedFiles);

    if (uploadedFiles.length === files.length) {
      req.uploadedFiles = uploadedFiles;
      next();
    }
  } catch (error) {
    console.error('Error in fileUpload:', error);
    next(error);
  }
};

module.exports = { fileUpload };
