const fs = require('fs');
const path = require('path');

function scan(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (!f.startsWith('.') && f !== 'node_modules' && f !== '.next') scan(p);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      const text = fs.readFileSync(p, 'utf8');
      const regex = /href=[`"']([^`"']*course[^`"']*)[`"']/g;
      let match;
      while ((match = regex.exec(text)) !== null) {
        console.log(p, ':', match[1]);
      }
    }
  });
}

scan('./app');
scan('./components');
