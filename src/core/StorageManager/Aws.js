const AWS = require('aws-sdk');

const Config = require('../Config');

class AWSStorage {
  constructor() {
    this._storage = new AWS.S3();
  }

  writeFile({ file, meta, filename }) {
    const parameter = {
      Bucket: Config.storage.AWS_BUCKET_NAME,
      Key: filename,
      Body: file._data,
      ContentType: meta.headers['content-type'],
    };

    return new Promise((resolve, reject) => {
      this._storage.upload(parameter, (error, data) => {
        if (error) {
          return reject(error);
        }
        return resolve(data.Location);
      });
    });
  }
}

module.exports = AWSStorage;
