// import React, { useState, useEffect, useRef } from 'react';
// import AceEditor from 'react-ace';
// import io from 'socket.io-client';
// import 'ace-builds/src-noconflict/mode-c_cpp';
// import 'ace-builds/src-noconflict/mode-java';
// import 'ace-builds/src-noconflict/mode-python';
// import 'ace-builds/src-noconflict/mode-javascript';
// import 'ace-builds/src-noconflict/theme-textmate';
// import 'ace-builds/src-noconflict/ext-language_tools'; 
// import ace from 'ace-builds/src-noconflict/ace';
// import { ColorRing } from 'react-loader-spinner';
// import Output from './CodeOutputBox';
// import TimeComplexity from '../TimeComplexity';
// import { useNavigate } from 'react-router-dom';
// import './EditorPage.css'; // Import the CSS file
// import { CplusplusPlain, JavascriptOriginal, PytorchOriginal } from 'devicons-react';
// import { JavaOriginal } from 'devicons-react';
// import { CPlain,CplusplusOriginal,PythonOriginal} from 'devicons-react';
// // import JavascriptOriginal from 'devicons-react/lib/icons/JavascriptOriginal';
// // Corrected base path configuration
// ace.config.set('basePath', '/node_modules/ace-builds/src-noconflict');
// const CodeEditor = ({ language, languageName, basicCode, path }) => {
//   const [code, setCode] = useState(``);
//   const [selectedLanguage,setSelectedLanguage]=useState(languageName);
//   const [output, setOutput] = useState('');
//   const [id, setId] = useState('');
//   const [socket, setSocket] = useState(null);
//   const [nextUrl, setNextUrl] = useState(null);
//   const [switchLan, setSwitchLan] = useState(path);
//   const editorRef = useRef(null);
//   const usenavigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   useEffect(()=>{
//     setCode(basicCode);
//   },[basicCode])
//   // Initialize editor and set word wrap
//   useEffect(() => {
//     if (editorRef.current) {
//       const editor = editorRef.current.editor;
//       editor.getSession().setUseWrapMode(true); // Enable word wrapping
//     }
//   }, []);

//   // Cleanup socket connection on component unmount
//   useEffect(() => {
//     return () => {
//       if (socket) {
//         socket.disconnect();
//       }
//     };
//   }, [socket]);

//   // Handle socket output event and disconnect on error
//   useEffect(() => {
//     if (id) {
//       setIsLoading(false);
//     }
//     if (socket) {
//       const handleOutput = (data) => {
//         setOutput((prev) => prev + data);
//         if (id || data) {
//           setIsLoading(false);
//         }
//         if (output.includes("Existed code")) {
//           setIsLoading(false);
//           socket.disconnect();
//         }
//       };

//       socket.on("output", handleOutput);
//       socket.on("connect_error",(err)=>{
//         console.log(err);
//         setIsLoading(false);
//         setOutput("Connection failed please try again later")
//         socket.disconnect();
//       })
//       // Clean up the event listener when the component unmounts or socket changes
//       return () => {
//         if (socket) {
//           socket.off("output", handleOutput);
//         }
//       };
//     }
//   }, [socket, id, output]);
//   // Handle the run button click
//   const handleRun = () => {
//     try {
//       if (socket) {
//         // If there's an existing socket, disconnect it first
//         socket.disconnect();
//         setSocket(null);  // Reset the socket state to null
//         setId('');        // Clear the session ID
//         setOutput('');    // Clear the output
//       }

//       // Establish a new socket connection
//       const newSocket = io("https://code-compiler-1.onrender.com/", { transports: ["websocket"] });
//       if(newSocket.connect){
//         setSocket(newSocket);
//         setIsLoading(true);
//         setOutput('');

//         // Wait for the socket to connect to get the id
//         newSocket.on("connect", () => {
//           setId(newSocket.id);
//           console.log("Connected with ID:", newSocket.id);
//         });

//         // Emit code run event
//         newSocket.emit("runCode", { code, sendLanguage: languageName });
//       }else{
//         console.log("Socket is not active");
//         setIsLoading(false)
//         setCode('Server is busy please  try again later')
//       }
      
//     } catch (e) {
//       setIsLoading(false);
//       console.log(e);
//     }
//   };

//   const navigateHandle = (e) => {
//     const name = e.currentTarget.getAttribute('name');
//     const lan=e.currentTarget.getAttribute('languag');
//     const location = window.location.href.split(switchLan)[0];
//     setOutput(``);
//     setId(``);
//     setSelectedLanguage(lan);
//     setNextUrl(location);
//     setSwitchLan(name);
//   };

//   const inputHandler = (input) => {
//     console.log("from output side input");
//     console.log(input);
//     if (socket) {
//       socket.emit('inputValue', input);
//     }
//     setOutput(prev => prev + input + '\n');
//   };

//   const AnalyzeCode = () => {
//     usenavigate('/analysis');
//   };
//   const clearHandle=()=>{
//     setOutput(``);
//     setId(``);
//   }
//   return (
//     <div className="container">
//       <h2 style={{ color: 'black', textAlign: 'center', marginTop: '5px' }}>
//         Online {language === "c_cpp" ? (languageName === "c" ? "C" : "CPP") : language} Code Editor
//       </h2>
//       <div className="containerBox">
//         <div className="LanguageIcon">
//           {[{name:"python-programming",title:"Py",languages:'py',icons:0},
//             {name:"c-programming",title:"C",languages:'c',icons:1},
//             {name:"cpp-programming",title:"CPP",languages:'cpp',icons:2},
//             {name:"java-programming",title:"Java",languages:'java',icons:3},
//             {name:"javascript-programming",title:"JS",languages:'js',icons:4},
//             ].map((lang)=>(
//               <div key={lang.name}
//               className='LanIcons'
//               style={{backgroundColor: selectedLanguage===lang.languages ? '#ccc':'transparent'}}>
//                 <a href={`${nextUrl}${lang.name}`} onClick={navigateHandle} title={lang.title} name={lang.name} languag={lang.languages}>
//                   {
//                     lang.icons===0?<PythonOriginal style={{transform: 'scale(2)'}}/>:
//                     lang.icons===1?<CPlain style={{transform: 'scale(1.8)'}}/>:
//                     lang.icons===2?<CplusplusPlain style={{transform: 'scale(1.8)'}}/>:
//                     lang.icons===3?<JavaOriginal style={{transform: 'scale(1.8)'}}/>:<JavascriptOriginal style={{transform: 'scale(1.8)'}}/>
//                   }
//                 </a>
                
//               </div>
//             ))
//           }
//         </div>
//         <div>
//           <div className='btnNav'>
//             <div className="btnSection">
//                 <div style={{borderRight:'2px solid #ccc'}}>
//                     <button className='programName' style={{outline:'none'}}>main.{languageName}</button>
//                 </div>
//                 <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
//                     <button onClick={AnalyzeCode} className="runButton" style={{width:'100px',outline:'none'}}>
//                     {'Analyse'}
//                     </button>
//                     <button onClick={handleRun} disabled={isLoading} className="runButton" style={{ height: '30px', width: '60px', padding: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center',outline:'none'}}>
//                     {isLoading ? (
//                       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
//                         <ColorRing
//                           visible={true}
//                           height="37"
//                           width="37"
//                           ariaLabel="color-ring-loading"
//                           wrapperStyle={{}}
//                           wrapperClass="color-ring-wrapper"
//                           colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
//                         />
//                       </div>
//                     ) : 'RUN'}
//                   </button>
//                 </div>
//             </div>
//             <div className='outputSection'>
//                 <button style={{backgroundColor:'white', border:'none', outline:'none', color:'black', textAlign:'center'}}>Output</button>
//                 <button onClick={clearHandle} style={{height:'2rem', border:'1px solid #ccc', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#ccc',borderRadius:'2px', color:'black', outline:'none'}}>clear</button>
//             </div>
//           </div>
//           <div className="editorBox">
//             <AceEditor
//               mode={language}
//               theme="textmate"
//               onChange={(e) => setCode(e)}
//               fontSize={16}
//               value={code}
//               setOptions={{
//                 enableBasicAutocompletion: true,
//                 enableLiveAutocompletion: true,
//                 enableSnippets: true,
//                 tabSize:2
//               }}
//               style={{ width: "51vw", height: "87vh" ,overflowX:'auto'}}
//               name="ace-editor"
//               editorProps={{ $blockScrolling: true }}
//               ref={editorRef}
//             />
//             <div style={{width:'45.7vw',height:'87vh'}}>
//                <Output value={output} ids={id} inputFunction={inputHandler} loading={isLoading}></Output>
//            </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CodeEditor;


import React, { useState, useEffect, useRef } from 'react';
import AceEditor from 'react-ace';
import io from 'socket.io-client';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/ext-language_tools'; 
import ace from 'ace-builds/src-noconflict/ace';
import { ColorRing } from 'react-loader-spinner';
import Output from './CodeOutputBox';
import { useNavigate } from 'react-router-dom';
import './EditorPage.css'; // Import the CSS file
import { CplusplusPlain, JavascriptOriginal, PythonOriginal, CPlain, JavaOriginal } from 'devicons-react';

// Corrected base path configuration
ace.config.set('basePath', '/node_modules/ace-builds/src-noconflict');

const CodeEditor = ({ language, languageName, basicCode, path }) => {
  const [code, setCode] = useState(``);
  const [selectedLanguage,setSelectedLanguage]=useState(languageName);
  const [output, setOutput] = useState('');
  const [id, setId] = useState('');
  const [socket, setSocket] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [switchLan, setSwitchLan] = useState(path);
  const editorRef = useRef(null);
  const usenavigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCode(basicCode);
  }, [basicCode]);

  // Initialize editor and set word wrap
  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      editor.getSession().setUseWrapMode(true); // Enable word wrapping
    }
  }, []);

  // Cleanup socket connection on component unmount
  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  // Manage socket events and disconnect
  useEffect(() => {
    if (socket) {
      const handleOutput = (data) => {
        setOutput((prev) => prev + data);
        setId(socket.id);
        setIsLoading(false);
      };

      const handleError = (err) => {
        console.error(err);
        setIsLoading(false);
        setOutput("Connection failed. Please try again later.");
      };

      socket.on("output", handleOutput);
      socket.on("connect_error", handleError);

      return () => {
        socket.off("output", handleOutput);
        socket.off("connect_error", handleError);
      };
    }
  }, [socket]);

  const handleRun = () => {
    setId('');
    if (isLoading) return; // Prevent multiple clicks

    try {
      setIsLoading(true);
      setOutput('');

      if (socket) {
        socket.disconnect(); // Clear existing connection
      }

      const newSocket = io("https://code-compiler-1.onrender.com/", { transports: ["websocket"] });
      setSocket(newSocket);

      newSocket.on("connect", () => {
        newSocket.emit("runCode", { code, sendLanguage: languageName });
      });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const inputHandler = (input) => {
    if (socket) {
      socket.emit('inputValue', input);
    }
    setOutput((prev) => prev + input + '\n');
  };

  const clearHandle = () => {
    setOutput('');
    setId('');
  };
  const navigateHandle = (e) => {
    const name = e.currentTarget.getAttribute('name');
    const lan=e.currentTarget.getAttribute('languag');
    const location = window.location.href.split(switchLan)[0];
    setOutput(``);
    setId(``);
    setSelectedLanguage(lan);
    setNextUrl(location);
    setSwitchLan(name);
  };
  return (
    <div className="container">
      <h2 style={{ color: 'black', textAlign: 'center', marginTop: '5px' }}>
        Online {language === "c_cpp" ? (languageName === "c" ? "C" : "CPP") : language.toUpperCase()} Code Editor
      </h2>
      <div className="containerBox">
      <div className="LanguageIcon">
          {[{name:"python-programming",title:"Py",languages:'py',icons:0},
            {name:"c-programming",title:"C",languages:'c',icons:1},
            {name:"cpp-programming",title:"CPP",languages:'cpp',icons:2},
            {name:"java-programming",title:"Java",languages:'java',icons:3},
            {name:"javascript-programming",title:"JS",languages:'js',icons:4},
            ].map((lang)=>(
              <div key={lang.name}
              className='LanIcons'
              style={{backgroundColor: selectedLanguage===lang.languages ? '#ccc':'transparent'}}>
                <a href={`${nextUrl}${lang.name}`} onClick={navigateHandle} title={lang.title} name={lang.name} languag={lang.languages}>
                  {
                    lang.icons===0?<PythonOriginal style={{transform: 'scale(2)'}}/>:
                    lang.icons===1?<CPlain style={{transform: 'scale(1.8)'}}/>:
                    lang.icons===2?<CplusplusPlain style={{transform: 'scale(1.8)'}}/>:
                    lang.icons===3?<JavaOriginal style={{transform: 'scale(1.8)'}}/>:<JavascriptOriginal style={{transform: 'scale(1.8)'}}/>
                  }
                </a>
                
              </div>
            ))
          }
        </div>
        <div>
          <div className='btnNav'>
            <div className="btnSection">
              <div style={{ borderRight: '2px solid #ccc' }}>
                <button className='programName' style={{ outline: 'none' }}>main.{languageName}</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <button onClick={handleRun}  className="runButton" style={{ outline: 'none',backgroundColor:isLoading ? 'rgba(76, 175, 80, .5)':'#4CAF50', cursor: isLoading? 'not-allowed':'pointer'}}>
                  {isLoading ? (
                    <ColorRing visible={true} height="30" width="37" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} />
                  ) : 'RUN'}
                </button>
              </div>
            </div>
            <div className='outputSection'>
              <button style={{ backgroundColor: 'white', border: 'none', outline: 'none', color: 'black', textAlign: 'center' }}>Output</button>
              <button onClick={clearHandle} style={{ backgroundColor: '#ccc', color: 'black', outline: 'none' }}>Clear</button>
            </div>
          </div>
          <div className="editorBox">
            <AceEditor
              mode={language}
              theme="textmate"
              onChange={(e) => setCode(e)}
              fontSize={16}
              value={code}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                tabSize: 2,
              }}
              style={{ width: "51vw", height: "87vh", overflowX: 'auto' }}
              name="ace-editor"
              editorProps={{ $blockScrolling: true }}
              ref={editorRef}
            />
            <div style={{ width: '45.7vw', height: '87vh' }}>
              <Output value={output} ids={id} inputFunction={inputHandler} loading={isLoading}></Output>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
