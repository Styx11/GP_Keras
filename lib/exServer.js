// This server file is made for demo, so it's different from prod version
// We read the results directly from the sample file

const { URL } = require('url');
const http = require('http');
const fs = require('fs');
const baseUrl = 'http://localhost:4000';

const server = http.createServer((req, res) => {
  if (!/\/poetry/.test(req.url)) return res.end();
  let poetry;
  const example = fs.createReadStream('./example.json');
  const { searchParams } = new URL(req.url, baseUrl);
  const word = searchParams.get('word') || '';
  const num = searchParams.get('num') || '';

  example.on('data', buf => {
    poetry += buf.toString('utf8');
  });
  example.on('end', () => {
    const undef = /undefined/;
    poetry = poetry.replace(undef, '');
    poetry = JSON.parse(poetry);
    const result = poetry[word][num] || [];
    
    setTimeout(() => {
      res.writeHead(200, 'OK', {'Content-Type': 'text/plain; charset=utf-8'});
      res.write(JSON.stringify(result));
      res.end();
    }, 5000);
  });
  example.on('error', (e) => {
    res.writeHead(500, 'Server Error');
    res.end();
    console.error(e);
  });
});

server.listen(4000, () => {
  console.log('Example server running at localhost:4000');
});