const net = require('net');
const repl = require('repl');
var connections = 0;

var ServertModule=net.createServer((socket) => {
  connections += 1;
  repl.start({
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
  //console.info(data.toString().trim());
  //console.log('\033[2J');
 process.stdout.write("\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b");
    process.stdout.write(data.toString().trim());
  })
}).listen(5001);

console.log("Server opend on"+ServertModule.address().address+":"+ServertModule.address().port);
console.log("Wait for Client!");

function myEval(cmd, context, filename, callback) {
  process.stdout.write("I say: ");
  callback(null,cmd);
}
function myWriter(output) {
 // return "server say: " +output.toUpperCase()+"I say: ";
 return "server say: " +output+"I say: ";
}


module.exports.ServertModule=ServertModule;