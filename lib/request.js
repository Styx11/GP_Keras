const http = require('http');
const { URL } = require('url');
const argv2 = process.argv[2];
const argv3 = process.argv[3];
const word = (argv2 && argv2.toString()) || '';
const num = argv3 || 0;
const baseURL = 'http://s2480286j8.qicp.vip:80'

let result = '';
const options = new URL(`/poetry?word=${word}&num=${num}`, baseURL);
const request = http.get(options);
request.setTimeout(600000);
request.on('response', res => {
  res.setEncoding('utf-8');
  res.on('data', data => {
    result += data;
  });
  res.on('end', () => {
    console.log(result);
  });
});
request.on('error', (e) => {
  console.error(e);
});