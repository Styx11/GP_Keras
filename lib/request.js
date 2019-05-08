const http = require('http');
const { URL } = require('url');
const argv2 = process.argv[2];
const word = (argv2 && argv2.toString()) || '';

let result = '';
const options = new URL(`http://localhost:8080/poetry${word ? `?word=${word}` : ''}`);
const request = http.get(options);
request.on('response', res => {
  res.setEncoding('utf8');
  res.on('data', data => {
    result += data;
  });
  res.on('end', () => {
    result = JSON.parse(result);
    const { stdout } = result;
    console.log(stdout);
  });
});
request.on('error', (e) => {
  console.error(e);
});