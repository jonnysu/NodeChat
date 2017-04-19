const net = require('net');
const repl = require('repl');
const colors = require('./colors');
var replobj;
var connections = 0;
var name="server"
var start=(namei,port)=>{
   name=namei;
    var server=net.createServer((socket) => {
    connections += 1;
    replobj=repl.start({
      prompt: '',
      input: process.stdin,
      output: socket,
      eval: myEval,
      writer: myWriter,
      useColors:true    
    }).on('exit', () => {
      socket.end();
    });
    console.log(socket.address().address.toString()+" comes in!")
    process.stdout.write("I say: ");
    socket.on("data",(data)=>{    
      process.stdout.write("\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b");
      process.stdout.write(colors.fg.Red+data.toString().trim()+" ");
    })
    socket.on("error",()=>{
      console.log("\nlost Connection...\nWait for new connection!")
      if(connections==0){
        socket.destroy();
        replobj.close();
      }
    })
  }).listen(port);
  console.log("Server opend on"+server.address().address+":"+server.address().port);
  console.log("Wait for Client!");
}
function myEval(cmd, context, filename, callback) {
  process.stdout.write("I say: ");
  callback(null,cmd);
}
function myWriter(output) {
 return name+" say: " +output+colors.Reset+"I say: ";
}
module.exports.start=start;
