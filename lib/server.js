const http = require('http');
const { URL } = require('url');
const { promisify } = require('util');
const baseUrl = 'http://localhost:8080';
const exec = promisify(require('child_process').exec);

const server = http.createServer((req, res) => {
  if (!/\/poetry/.test(req.url)) return res.end();
  const { searchParams } = new URL(req.url, baseUrl);
  const word = searchParams.get('word');
  const num = searchParams.get('num');
  const succHeader = {
    'Content-Type': 'text/plain; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  };
  exec(`python py_test.py ${word ? `--word ${word}` : ''} ${num ? `--num ${num}` : ''}`)
    .then(stdio => {
      if (!stdio) return;
      const { stdout } = stdio;
      res.writeHead(200, 'OK', succHeader);
      res.write(Buffer.from(stdout, 'utf-8'));
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