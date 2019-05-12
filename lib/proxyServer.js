// Since webpack proxy server does not always go on well with NAT-DDNS，
// so we have a proxy server ourselves to make the request

const http = require('http');
const { URL } = require('url');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const baseUrl = 'http://localhost:4040';

const server = http.createServer((req, res) => {
  if (!/\/poetry/.test(req.url)) return res.end();
  const { searchParams } = new URL(req.url, baseUrl);
  const word = searchParams.get('word') || '';
  const num = searchParams.get('num') || 0;
  const command = `node ${__dirname}/request.js ${word} ${num}`;
  const succHeader = {
    'Content-Type': 'text/plain; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  };
  exec(command)
    .then(stdio => {
      res.writeHead(200, 'OK', succHeader);
      res.write(JSON.stringify(stdio));
      res.end();
    })
    .catch(e => {
      res.writeHead(500, 'Server Error');
      res.end();
      console.error(e);
    });
});
server.listen(4040, () => {
  console.log('Proxy server is running at localhost:4040');
});