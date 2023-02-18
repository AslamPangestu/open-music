const fs = require('fs');
const path = require('path');

const Config = require('../Config');

const ROOT_PATH = path.join(__dirname, '../../../', '/storage');

class LocalStorage {
  constructor({ folder }) {
    const mainFolder = `${ROOT_PATH}/${folder}`;
    this._mainFolder = mainFolder;
    this._folder = folder;
    if (!fs.existsSync(mainFolder)) {
      fs.mkdirSync(mainFolder, { recursive: true });
    }
  }

  writeFile({ file, filename }) {
    const fullPath = `${this._mainFolder}/${filename}`;

    const fileStream = fs.createWriteStream(fullPath);

    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));
      file.pipe(fileStream);
      file.on('end', () => {
        const fileLocation = `http://${Config.app.HOST}:${Config.app.PORT}/public${this._folder}/${filename}`;
        resolve(fileLocation);
      });
    });
  }
}

module.exports = LocalStorage;
