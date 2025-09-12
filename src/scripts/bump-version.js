const fs = require('fs');
const pkg = require('../../package.json');
const app = require('../../app.json');

// sync app.json with package.json version
app.expo.version = pkg.version;

fs.writeFileSync('../../app.json', JSON.stringify(app, null, 2));
console.log(`Synced app.json to version ${pkg.version}`);
