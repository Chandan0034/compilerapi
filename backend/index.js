// const http=require('http');
// const express=require('express');
// const fs=require('fs');
// const cors=require('cors');
// const bodyParser=require('body-parser');
// const {exec}=require('child_process');
// const app=express();
// const server=http.createServer(app);
// const {Server} =require('socket.io');
// app.use(bodyParser.json());
// app.use(cors());
// const port=process.env.PORT||4500;
// //const io=SocketIo(server);
// const io=new Server(server);
// io.on('connection',(socket)=>{
//     //console.log("connection");
//     try{
//         socket.on('runCode',(data)=>{
//             const {code,language} =data;
//             console.log(code);
//             const fileName="Main.py"
//             fs.writeFileSync(fileName,code);
//             const childProcess=exec(`Python ${fileName}`,(error,stdout,stderr)=>{
//                 if(error){
//                     socket.emit("Error",stderr);
//                 }
//             })
//             childProcess.stdout.on('data',(data)=>{
//                 //console.log(data.trim());
//                 //console.log(data.length)
//                 socket.emit('output',data.trim());
//             })
//             socket.on('input',(data)=>{
//                 //console.log(data);
//                 childProcess.stdin.write(data+"\n");
//             })
//         })

//     }catch(e){
//         console.log(e);
//     }
    
// })
// server.listen(5000,()=>{
//     console.log("Server are Created at Port 5000");
//})
// const express=require('express')
// const {exec}=require('child_process')
// const bodyParser=require('body-parser')
// const http=require('http')
// const socketIo=require('socket.io')
// const app=express();
// const fs=require('fs')
// const cor=require('cors');
// const port=5000;
// app.use(bodyParser.json());
// app.use(cor());
// const server =http.createServer(app);
// const io=socketIo(server);
// app.post('/compile',(req,res)=>{
//     const userCode=req.body.code;
//     //const userLang=req.body.lang;
//     const FileName=`Main.cpp`;
//     fs.writeFileSync(FileName,userCode);
//     exec(`g++ ${FileName} -o Main`,(error,stdout,stderr)=>{
//         if(error){
//             return res.status(500).send({error:'Compilation Error',stderr})
//         }
//         const childProcess=exec('Main.exe');
//         let output='';
//         childProcess.stdout.on('data',(data)=>{
//             output+=data;
//             console.log(data);
//             io.emit('output',data);
//             res.send({output:data});
//         });
//         childProcess.stderr.on('data',(data)=>{
//             io.emit('output',data);
//         });
//         io.on('connection',(socket)=>{
//             socket.on('input',(input)=>{
//                 console.log(input);
//                 childProcess.stdin.write(input+'\n');
//             });
//         });
//         childProcess.on('close',(code)=>{
//             io.emit('output',`Exited with code ${code}`);
//             io.removeAllListeners('connection');
//             childProcess.stdin.end();
//         })
//     })
// })
// server.listen(port,()=>{
//     console.log("Server is Running on");
// })
// const express=require('express')
// const http=require('http')
// const socketIo=require('socket.io')
// const {exec}=require('child_process');
// const cor=require('cors');
// const app=express();
// app.use(cor());
// const server=http.createServer(app);
// const io=socketIo(server);
// app.use(express.json());
// io.on('connection',(socket)=>{
//     socket.on('runCode',(code)=>{
//         console.log(code);
//         const FileName='Main.cpp';
//         require('fs').writeFileSync(FileName,code);
//         exec(`g++ ${FileName} -o Main`,(error,stdout,stderr)=>{
//             if(error){
//                 socket.emit('output',{error:stderr})
//             }
//         })
//         const childProcess=exec('.Main.exe');
//         childProcess.stdout.on('data',(data)=>{
//             socket.emit('output',data);
//         })
//         socket.on('input',(input)=>{
//             childProcess.stdin.write(input+"\n");
//         })
//     })
// })
// io.on('disconnect',()=>{
//     console.log('disconnected');
// })
// server.listen(3001,()=>{
//     console.log("Started");
// })
// const express=require('express');
// const cors=require('cors');
// const app=express();
// app.use(cors());
// app.post('/compile',(req,res)=>{
//     const {code}=req.body;
//     const codeFileName="Main.cpp";
//     //console.log(code);
//     try{
//         fs.writeFileSync(codeFileName,code);
//     }catch(error){
//         console.log(error);
//     }
//     exec(`g++ ${codeFileName} -o Main`,(error,stdout,stderr)=>{
//         if(error){
//             return res.send({error:"Compilation Error",stderr});
//         }
//     })
//     const childProccess=exec(`Main.exe`);
//     childProccess.stdout.on('data',(data)=>{
//         console.log(data);
//         io.emit('output',data);
//     })
//     io.on('connection',(socket)=>{
//         socket.on('input',(input)=>{
//             console.log(input);
//             childProccess.stdin.write(input+'\n');
//         })
//     })
//     childProccess.on('close',(code)=>{
//         io.emit('output',`Existed code With ${code}`);
//         io.removeAllListeners('connection');
//         childProccess.stdin.end();
//     })

// })
// // io.on('connection',(socket)=>{
// //     // console.log("A user has connected",socket.id);
// //     socket.on('send',(data)=>{
// //         const fileName="Main.cpp";
// //         require('fs').writeFileSync(fileName,data);
// //         exec(`g++ Main.cpp -o Main`,(error,stdout,stderr)=>{
// //             if(error){
// //                 socket.emit('output',"Compilation Error");
// //             }
// //         })
// //         const childProccess=exec(`Main.exe`);
// //         childProccess.stdout.on('data',(data)=>{
// //             socket.emit('output',data);
// //         })
// //         socket.on('input',(input)=>{
// //             childProccess.stdin.write(input+'\n');
// //         })
        
// //     })
// // })
// //app.use(express.static(require('path').resolve('./public')));
const {runInContext,} =require('vm')