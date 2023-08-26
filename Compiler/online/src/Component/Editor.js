import CodeMirror, { color } from '@uiw/react-codemirror'
import React,{useState} from 'react';
import './Editor.css'
// import {saveAs} from 'file-saver';
// import {PDFDocument,rgb,StandardFonts} from 'pdf-lib';
import{StreamLanguage} from '@codemirror/language';
import {dracula,vscodeDark,abcdef,solarizedDark,xcodeLight} from '@uiw/codemirror-themes-all';
import io from 'socket.io-client';
import {javascript} from '@codemirror/lang-javascript'
import {python} from '@codemirror/legacy-modes/mode/python'; 
import {c,cpp,csharp,java,dart} from '@codemirror/legacy-modes/mode/clike';
const socket = io("http://localhost:5000",{transports:["websocket"]})
function Editor(){
    const [sendLanguage,setSendLanguage]=useState('py');
    const [value,setValue]=useState('');
    const [input,setInput]=useState('');
    const [themes,setTheme]=useState(2);
    const [status,setStatus]=useState(false);
    const [language,setLanguage]=useState(python);
    const [languageExtension,setLanguageExtension]=useState([StreamLanguage.define(language)]);
    const [code,setCode]=useState('');
    function  runHandler(){
        setStatus(true)
        setValue(prev=>prev='');
        socket.emit('runCode',{code,sendLanguage});
        // const pdfDoc=await PDFDocument.create();
        // const page=pdfDoc.addPage([600,400]);
        // const font=await pdfDoc.embedFont(StandardFonts.Helvetica);
        // page.drawText(code,{
        //     x:50,
        //     y:page.getHeight()-100,
        //     font:font,
        //     size:24,
        //     color:rgb(0,0,0)
        // })
        // const pdfBytes=await pdfDoc.save();
        // const blop=new Blob([pdfBytes],{type:'application/pdf'});
        //const file=new Blob([code],{ type: 'text/plain' });
       // saveAs(blop,"Code.pdf");
    }
    React.useEffect(()=>{
        socket.on('output',(data)=>{
            setValue(prev=>prev+data+"\n");
        })
    },[]);
    function inputHandler(v){
        // console.log(v.target.value);
        setInput(v.target.value);
    }
    function submitHandler(){
        //console.log(input);
        socket.emit('inputValue',input);
        setValue(prev=>prev+input+"\n");
        setInput('');
    }
    const list=[
        {
            id:xcodeLight
        },
        {
            id:vscodeDark
        },
        {
            id:abcdef
        },
        {
            id:solarizedDark
        },
        {
            id:dracula
        }
    ];
    // function outputHandler(v){
    //     //setPrev(v);
    //     //console.log()
    //     setValue(v);
    //     setInputValue('');
    // }
    // function keywordHandler(event){
    //     if(event.key==="Enter"){
    //         setInputValue(value);
    //         setInput(value.slice(prev.length));
    //         socket.emit("input",input);
    //         setPrev(inputValue);
    //         //socket.emit('input',)
    //         // setValue(prev.slice(value.length))
    //     }
    //}
    function themeHandler(event){
        let getId=event.target.value;
        switch(getId){
            case "0":
                setTheme(0);
                break;
            case "1":
                setTheme(1);
                break;
            case "2":
                setTheme(2);
                break;
            case "3":
                setTheme(3);
                break;
            case "4":
                setTheme(4);
                break;
            default:
                break;
        }
    }
    const languageChangeHandler=(event)=>{
        const getId=event.target.value;
        switch(getId){
            case "0":
                setSendLanguage("cpp");
                setLanguageExtension([StreamLanguage.define(cpp)]);
                break;
            case "1":
                setLanguageExtension([StreamLanguage.define(c)]);
                setSendLanguage("c");
                break;
            case "2":
                setLanguageExtension([StreamLanguage.define(python)]);
                setSendLanguage("py");
                break;
            case "3":
                setLanguageExtension([StreamLanguage.define(java)]);
                setSendLanguage("java");
                break;
            case "4":
                setLanguageExtension([javascript({jsx:true})]);
                setSendLanguage("js");
                break;
            case "5":
                setLanguageExtension([StreamLanguage.define(dart)]);
                setSendLanguage("dart");
                break;
            case "6":
                setLanguage(csharp);
                break;
            default:
                break;
        }
    }
    return (
        <div className="EditorContainer">
            <div className='Navbar'>
                <div className='ThemeContainer'>
                    <label className='label'>Theme: </label>
                    <select className='Theme' onChange={themeHandler}>
                        <option>Select The theme</option>
                        <option value={0}>light</option>
                        <option value={1}>dark</option>
                        <option value={2}>dart green</option>
                        <option value={3}>solarizedDark</option>
                        <option value={4}>Dracula</option>
                    </select>
                </div>
                <div className='ThemeContainer'>
                <label className='label'>Language: </label>
                <select className='Theme' onChange={languageChangeHandler}>
                    <option>Select The Option</option>
                    <option value={0}>Cpp</option>
                    <option value={1}>C</option>
                    <option value={2}>Python</option>
                    <option value={3}>Java</option>
                    <option value={4}>Javascript</option>
                    <option value={5}>Dart</option>
                    <option value={6}>Csharp</option>
                </select>
            </div>
            <button onClick={runHandler} className='run'>RUN</button>
            </div>
           <div className='EditorInputOutput'>
                <div>
                    <CodeMirror
                    className='EditorMirror'
                    height='calc(100vh - 67.5px)'
                    width='70vw'
                    onChange={(value)=>setCode(value)}
                    extensions={languageExtension}
                    theme={list[themes].id}
                    ></CodeMirror>
                </div>
                <div>{status?
                    <div className='outputBox'>
                        <label className='inputLabel'>InputValue</label>
                        <textarea className='inputArea' onChange={inputHandler} value={input} placeholder='Enter the input'></textarea>
                        <button className='inputSubmit' onClick={submitHandler}>Submit</button>
                        <CodeMirror
                        className='outputEditor'
                        width='29vw'
                        height='calc(65vh - 33px)'
                        value={value}
                        theme={vscodeDark}
                        onChange={(e)=>setValue(e)}
                        >
                        </CodeMirror>
                        </div>:null}
                </div>
           </div>
        </div>
    );
}
export default Editor;