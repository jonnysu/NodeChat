const net = require('net');
const repl = require('repl');
const colors = require('./colors');
 var replobj;
 var name="clientsss";
const start = (namei,ip,port)=>{
  name=namei;
  var client=net.createConnection({port,ip}, () => {
  //'connect' listener
  console.log('connected to server!');

  replobj=repl.start({
    prompt: '',
    input: process.stdin,
    output: client,
    eval: myEval,
    writer: myWriter,
    useColors:true
  }).on('exit', () => {
    client.end();
  })
  function myEval(cmd, context, filename, callback) {

  //console.log("i say: "+cmd)
   process.stdout.write("I say: ");
  callback(null,cmd);
 }


   process.stdout.write("I say: ");
});
client.on('data', (data) => {

process.stdout.write("\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b");
process.stdout.write(colors.fg.Red+data.toString().trim());
});

client.on('end', () => {
  console.log('disconnected from server');
});
client.on("error",()=>{
   //client.end("");
   console.log("\nlost Connection...")
   client.destroy();
   replobj.close();
})

  function myWriter(output) {
  //return "client say: "+ output.toUpperCase()+"I say: ";
  return name+" say: "+ output+colors.Reset+"I say: ";
}
}

module.exports.start=start;