const net = require('net');
const repl = require('repl');
const colors = require('./colors');
var replobj;
var name="client";
const start = (namei,ip,port)=>{
  name=namei;
  var socket=net.createConnection({port,ip}, () => {
  //'connect' listener
  console.log('connected to server!');

  replobj=repl.start({
      prompt: '',
      input: process.stdin,
      output: socket,
      eval: myEval,
      writer: myWriter,
      useColors:true
    }).on('exit', () => {
      socket.end();
    })
    process.stdout.write("I say: ");
  });
  socket.on('data', (data) => {

    process.stdout.write("\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b");
    process.stdout.write(colors.fg.Red+data.toString().trim());
  });

  socket.on('end', () => {
    console.log('disconnected from server');
  });
  socket.on("error",()=>{
   
    console.log("\nlost Connection...")
    socket.destroy();
    replobj.close();
  })

}

function myEval(cmd, context, filename, callback) {
    process.stdout.write("I say: ");
    callback(null,cmd);
}
function myWriter(output) {
    return name+" say: "+ output+colors.Reset+"I say: ";
}
module.exports.start=start;