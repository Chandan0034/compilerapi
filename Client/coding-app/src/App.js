import React,{useState,useEffect} from 'react'
import io from 'socket.io-client'
import {writeFileSync} from 'fs'
import Editor from 'monaco-editor';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import './App.css';
//import Editor from '@monaco-editor/react';
const socket=io('http://localhost:5000',{transports:["websocket"]});
function App() {
  const [userCode,setCode]=useState('');
  const [textareValue,setTextareaValue]=useState('');
  const [output,setOutput]=useState('');
  const [count,setCount]=useState(0);
  const [status,setStatus]=useState(false);
  const [language,setLanguage]=useState('py');
  const [value,setValue]=useState(``);
  const [theme,setTheme]=useState("hc-black");
  const [defaultValues,setDefaultvalue]=useState(`print("hello")`)
  const handleCompile=(event)=>{
    socket.emit('runCode',{userCode,language});
    writeFileSync("Code.pdf",userCode);
    setStatus(true);
    // axios.post('http://localhost:5000/compile',{
    //   code:userCode
    // }).then((res)=>setOutput(res.data.stderr)).catch((error)=>console.log("Error",error));
    // fetch('http://localhost:9000/compile',{
    //   method:'POST',
    //   headers:{
    //     'Content-Type':'application/json'
    //   },
    //   body:JSON.stringify({
    //     code:userCode
    //   })
    // })

  }
  function outputHandler(event){
   setOutput(event.target.value);
  //  console.log(textareValue);
  //  console.log(event.target.value);

  }
  function handleCode(event){
  }
  function keywordHandler(e){
    if(e.key==="Enter"){
      socket.emit('input',output.slice(textareValue.length));
      console.log(textareValue.length)
      console.log(output.length);
      console.log(output.slice(textareValue.length));
      setTextareaValue(output.slice(textareValue.length));
      //socket.emit("input",output.slice(textareValue.length))
      //console.log()
      // var newData=output.slice(textareValue.length);
      //socket.emit('input',"chandan");
      // setOutput(newData);
      // setTextareaValue(output);
    }

  }
    // if(event.key==="Enter"){
    //   const data=(event.target.value).slice(output.length);
    //   console.log(data);
    //   socket.emit('input',data);
    //   setOutput(event.target.value);
    // }
  React.useEffect(()=>{
    socket.on('inputOutput',(data)=>{
      console.log(data)
      setOutput(prev=>prev+data);
    })
  },[]);
  React.useEffect(()=>{
    socket.on('output',(data)=>{
      setOutput(data+"\n");
      setTextareaValue(data+"\n");
    })
  },[]);
  return (
    <div className='App'>
      <div className='labelBox'>
      <h4>Online Code Compiler</h4>
        <label className='label'>Language:</label>
        <select className='selectLan' onChange={(e)=>{setLanguage(e.target.value)
          if(e.target.value==="cpp"){
            console.log("cpp");
            setDefaultvalue("//Welcome To Cpp")
          }}}>
            <option>Select The Language</option>
          <option className='selectLan' value={"cpp"}>C++</option>
          <option className='selectLan' value={"python"}>Python</option>
          <option className='selectLan' value={"c"}>C</option>
          <option className='selectLan' value={"java"}>Java</option>
        </select>
        <label className='labelTheme'>Theme:</label>
        <select className='selectLan' onChange={(e)=>{setTheme(e.target.value)}}>
          <option>Select The Theme</option>
          <option className='selectLan' value={"vs-dark"}>Dark</option>
          <option className='selectLan' value={"vs-light"}>Light</option>
          <option className='selectLan' value={"hc-black"}>Black Contract</option>
        </select>
          <button className='runBtn' onClick={handleCompile}>RUN</button>
      </div>
      <div className='editorCom'>
        <Editor
        defaultLanguage='python'
        value={defaultValues}
        height="calc(100vh - 100px)"
        language={language} 
        width="70%"
        theme={theme}
        onChange={handleCode}>
        </Editor>
        <div>
        {
          status?<div>
            {/* <textarea spellCheck={false} className='output' onKeyDown={keywordHandler} onChange={outputHandler} value={value.trim()}></textarea> */}
            <pre className='output'>{output}</pre>
          </div>:null
        }
        </div>
      </div>
    </div>
    
  );
}

export default App;
// import React,{useEffect, useState} from 'react';
// import io from 'socket.io-client'
// const socket=io.connect('http://localhost:9000');
// function App(){
//   //const [socket,setSocket]=useState(null);
//   const [code,setCode]=useState('');
//   const [input ,setInput]=useState('');
//   const [output,setOutput]=useState('');
//   const handleRunCode=()=>{

//   };
//   const handleInputChange=(event)=>{
//     setInput(event.target.value);
//   }
//   React.useEffect(()=>{
//     // socket.on('output',(data)=>{
//     //   if(data.error){
//     //     setOutput(data.error);
//     //   }else{
//     //     setOutput(data.output);
//     //   }
//     // })
//   })
//   return(
//     <div>
//       <h1>Online C++ Code Compiler</h1>
//       <textarea value={code} onChange={(e)=>setCode(e.target.value)} rows={10} cols={80}></textarea>
//       <br/>
//       <textarea value={input} onChange={(e)=>setInput(e.target.value)} rows={5} cols={50}></textarea>
//       <br/>
//       <button onClick={handleRunCode}>Compile</button>
//       <br/>
//       <h2>Output</h2>
//       <pre>{output}</pre>
//     </div>
//   );
// }
// export default App;
// import React, { useState } from 'react';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:5000'); // Replace with your server address

// const CodeEditor = () => {
//   const [code, setCode] = useState('');
//   const [language, setLanguage] = useState('cpp');
//   const [input, setInput] = useState('');
//   const [output, setOutput] = useState('');
//   const [error, setError] = useState('');

//   const handleCompile = () => {
//     socket.emit('codeCompilation', {code, language});
//   };

//   socket.on('compilationResult', ({ output, error }) => {
//     setOutput(output);
//     setError(error);
//   });

//   return (
//     <div>
//       <select value={language} onChange={(e) => setLanguage(e.target.value)}>
//         <option value="cpp">C++</option>
//         {/* Add more language options here */}
//       </select>
//       <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={10} cols={50} />
//       <h2>Input:</h2>
//       <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} cols={50} />
//       <button onClick={handleCompile}>Compile</button>
//       <div>
//         <h2>Output:</h2>
//         <pre>{output}</pre>
//         <h2>Error:</h2>
//         <pre>{error}</pre>
//       </div>
//     </div>
//   );
// };

// export default CodeEditor;
