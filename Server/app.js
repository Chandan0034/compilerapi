
const http=require('http');
const express=require('express');
const app=express();
const fs = require('fs');
const cors=require('cors');
const bodyParser=require('body-parser');
const server=http.createServer(app);
const {Server}=require('socket.io');
const { exec } = require('child_process');
app.use(bodyParser.json());
app.use(cors());
const io=new Server(server);
const PORT=process.env.PORT ||5000;
app.get('/',async(req,res)=>{
    res.send("Welcome To Online Code Runner Api")
})
io.on('connection',(socket)=>{
    socket.on('runCode',(data)=>{
        const {code,sendLanguage}=data;
        const fileName=`Main.${sendLanguage}`;
        fs.writeFileSync(fileName,code);
        try{
            var childProccess;            
            if(sendLanguage==="cpp"){
                childProccess=exec(`g++ ${fileName} -o Main && ./Main`,(error,stdout,stderr)=>{
                    if(error){
                        socket.emit('output',stderr);
                    }
                })
            }else if(sendLanguage==="c"){
                childProccess=exec(`gcc ${fileName} -o Main && ./Main`,(error,stdout,stderr)=>{
                    if(error){
                        socket.emit('output',stderr);
                    }
                })
            }else if(sendLanguage==="java"){
                childProccess=exec(`javac ${fileName} && java Main`,(error,stdout,stderr)=>{
                    if(error){
                        socket.emit("output",stderr);
                    }
                 })
            }else if(sendLanguage==="py"){
                childProccess=exec(`python3 ${fileName}`,(error,stdout,stderr)=>{
                    if(error){
                        socket.emit('output',stderr);
                    }
                });
            }else if(sendLanguage==="dart"){
                childProccess=exec(`dart ${fileName}`,(error,stdout,stderr)=>{
                    if(error){
                        socket.emit('output',stderr);
                    }
                })
            }else{
                childProccess=exec(`node ${fileName}`,(error,stdout,stderr)=>{
                    if(error){
                        socket.emit('output',stderr);
                    }
                })
            }
            socket.on('inputValue',(input)=>{
                childProccess.stdin.write(input+'\n');
            })
            childProccess.stdout.on('data',(data)=>{
                console.log(data)
                socket.emit("output",data);
            })
            childProccess.on('close',(code)=>{
                socket.emit('close',`${"\n"}Existed code With ${code}`);
                childProccess.stdin.end();
                fs.unlinkSync(fileName,()=>{});
            })
        }catch(e){
            socket.emit('output',e);
        }
    })
    socket.on("disconnect",()=>{
        console.log("disconnected");
    })
})
server.listen(PORT,()=>console.log("server started at port No 9000"));


// const http = require('http');
// const express = require('express');
// const app = express();
// const fs = require('fs');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const server = http.createServer(app);
// const { Server } = require('socket.io');
// const { exec } = require('child_process');

// app.use(bodyParser.json());
// app.use(cors());

// const io = new Server(server);
// const PORT = process.env.PORT || 5000;

// app.get('/', async (req, res) => {
//     res.send("Welcome To Online Code Runner Api with docker");
// });

// io.on('connection', (socket) => {
//     console.log(socket.id)
//     socket.on('runCode', (data) => {
//         console.log(data)
//         const { code, sendLanguage } = data;
//         const fileName = `Main.${sendLanguage}`;
//         fs.writeFileSync(fileName, code);
//         try {
//             let command;
//             if (sendLanguage === "cpp") {
//                 command = `docker run --rm -v $(pwd):/usr/src/app -w /usr/src/app gcc g++ ${fileName} -o Main && ./Main`;
//             } else if (sendLanguage === "c") {
//                 command = `docker run --rm -v $(pwd):/usr/src/app -w /usr/src/app gcc gcc ${fileName} -o Main && ./Main`;
//             } else if (sendLanguage === "java") {
//                 command = `docker run --rm -v $(pwd):/usr/src/app -w /usr/src/app openjdk javac ${fileName} && java Main`;
//             } else if (sendLanguage === "py") {
//                 command = `docker run --rm -v $(pwd):/usr/src/app -w /usr/src/app python python3 ${fileName}`;
//             } else if (sendLanguage === "dart") {
//                 command = `docker run --rm -v $(pwd):/usr/src/app -w /usr/src/app google/dart dart ${fileName}`;
//             } else if (sendLanguage === "js") {
//                 command = `docker run --rm -v $(pwd):/usr/src/app -w /usr/src/app node node ${fileName}`;
//             }

//             const childProcess = exec(command, (error, stdout, stderr) => {
//                 if (error) {
//                     console.log(stderr)
//                     socket.emit('output', stderr);
//                     return;
//                 }
//                 console.log(stdout)
//                 socket.emit('output', stdout);
//             });

//             socket.on('inputValue', (input) => {
//                 childProcess.stdin.write(input + '\n');
//             });

//             childProcess.on('close', (code) => {
//                 console.log(code)
//                 socket.emit('output', `\nExited with code ${code}`);
//                 childProcess.stdin.end();
//                 fs.unlinkSync(fileName, () => { });
//             });
//         } catch (e) {
//             console.log(e.toString())
//             socket.emit('output', e.toString());
//         }
//     });

//     socket.on("disconnect", () => {
//         console.log("disconnected");
//     });
// });

// server.listen(PORT, () => console.log(`Server started at port ${PORT}`));
