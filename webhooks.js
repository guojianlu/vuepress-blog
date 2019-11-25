const http = require('http');
const createHandler = require('github-webhook-handler');

const handler = createHandler({
  path: '/webhooks',
  secret: 'bletBlogSecret'
});

const { spawn } = require('child_process');

function run_cmd(cmd, args, callback) {
  const child = spawn(cmd, args);
  let resp = '';
  child.stdout.on('data', function(buffer) {
    resp += buffer.toString();
  });

  child.stdout.on('end', function(buffer) {
    callback(resp);
  });
}

http.createServer((req, res) => {
  handler(req, res, err => {
    res.statusCode = 404;
    res.end('no sush location');
  });
}).listen(7777, () => {
  console.log('Webhook listen at 7777');
});

handler.on('error', err => {
  console.error('Error: ', err.message);
});

handler.on('*', event => {
  run_cmd('sh', ['./ssh-deploy.sh'], function(text) {
    console.log(text);
  });
});







