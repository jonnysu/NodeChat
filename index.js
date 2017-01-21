
const readline = require('readline');
const regPort=/-port=[0-9]*/i;//for port
const regName=regIp=/-name=[a-zA-Z0-9_.]*/i;//for ip

console.log("");
console.log("server 1.0.0");
console.log("===============");
console.log("Usage:");
console.log("As server:\nserver -name=server -port=12345\n")
console.log("As client:\nclient -name=client -ip=192.168.1.1 -port=12345\n")
console.log("===============");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('server OR client ? \n', (answer) => {
if(answer.indexOf("server")!=-1){
    const server= require('./lib/server');
     let port;
     let name;
     try{
         port=regPort.exec(answer)[0].split("-port=")[1];
      }catch(e){
           port=5001;
      }
      try{
         name=regName.exec(answer)[0].split("-name=")[1];
      }catch(e){
           name="server";
      }
       console.log("my name is "+name);
       server.start(name,port);
     
      rl.close();
}
 if(answer.indexOf("client")!=-1){
     const client = require('./lib/client');
     let ip;
     let port;
     let name;
     try{
      ip=regIp.exec(answer)[0].split("-ip=")[1];
      }catch(e){
          ip='127.0.0.1';
      }
      try{
            port=regPort.exec(answer)[0].split("-port=")[1];
      }catch(e){
           port=5001;
      }
      
      try{
         name=regName.exec(answer)[0].split("-name=")[1];
      }catch(e){
           name="client";
      }
       console.log("my name is "+name);
     client.start(name,ip,port);
      rl.close();
}

 
});
