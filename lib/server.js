const http = require('http');
const { URL } = require('url');
const iconv = require('iconv-lite');
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
  const cmd = `python py_test.py ${word ? `--word ${word}` : ''} ${num ? `--num ${num}` : ''}`;
  exec(cmd, { encoding: 'binary' })
    .then(stdio => {
      if (!stdio) return;
      const { stdout } = stdio;
      const outStr = iconv.decode(Buffer.from(stdout, 'binary'), 'cp936');
      res.writeHead(200, 'OK', succHeader);
      res.write(Buffer.from(outStr, 'utf-8'));
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