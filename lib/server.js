const http = require('http');
const { URL } = require('url');
const { promisify } = require('util');
const baseUrl = 'http://localhost:8080';
const exec = promisify(require('child_process').exec);

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') return;
  const { searchParams } = new URL(req.url, baseUrl);
  const word = searchParams.get('word');
  exec(`python py_test.py ${word ? `--word ${word}` : ''}`)
    .then(stdio => {
      if (!stdio) return;
      res.writeHead(200, 'OK', {'Content-Type': 'text/plain; charset=utf-8'});
      res.write(JSON.stringify(stdio));
      res.end();
    })
    .catch(e => {
      res.writeHead(500, 'Server Error');
      res.end();
      console.error(e);
    });
});
server.listen(8080, () => {
  console.log('Server running at localhost:8080');
});