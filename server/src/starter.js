const { readFile, writeFile } = require('fs/promises');
const path = require('path');

async function loadPublicDb(route) {
  try {
    const pathName = path.resolve(__dirname, 'database', 'public-db.json');
    const dbData = await readFile(pathName, {encoding: 'utf-8'});
    const parsedData = JSON.parse(dbData);
    if (parsedData.length && parsedData[0].systemGroup === route) {
      console.log('db had already been loaded');
      return;
    }
    parsedData.forEach((elem) => elem.systemGroup = route);
    await writeFile(pathName, JSON.stringify(parsedData, null, '  '));
    console.log('db was successfully loaded');
  } catch (error) {
    console.log(error);
  }
}

module.exports = { loadPublicDb };
