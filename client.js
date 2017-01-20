const net = require('net');
const repl = require('repl');

const client = net.createConnection({port: 5001}, () => {
  //'connect' listener
  console.log('connected to server!');
   process.stdout.write("I say: ");
});
client.on('data', (data) => {

process.stdout.write("\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b");
process.stdout.write(data.toString().trim());
});

client.on('end', () => {
  console.log('disconnected from server');
});


 const replobj=repl.start({
    prompt: '',
    input: process.stdin,
    output: client,
   eval: myEval,
   writer: myWriter,
    useColors:true
  }).on('exit', () => {
    socket.end();
  })
  function myEval(cmd, context, filename, callback) {

  //console.log("i say: "+cmd)
   process.stdout.write("I say: ");
  callback(null,cmd);
}
  function myWriter(output) {
  //return "client say: "+ output.toUpperCase()+"I say: ";
  return "client say: "+ output+"I say: ";
}
var clientModule={client,replobj};
module.exports.client=clientModule;