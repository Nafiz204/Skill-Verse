const fs = require('fs');
const path = require('path');

function scan(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (!f.startsWith('.') && f !== 'node_modules') scan(p);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      const text = fs.readFileSync(p, 'utf8');
      const matches = text.match(/\/learner\/courses\/[a-zA-Z0-9_-]+/g);
      if (matches) {
        console.log(p, '-->', matches);
      }
    }
  });
}

scan('./app');
scan('./components');
