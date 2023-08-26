// import socketIo from 'socket.io-client';
// import CodeMirror from '@uiw/react-codemirror';
// import { javascript } from '@codemirror/lang-javascript';
// import { okaidia,abcdef,androidstudio,darcula} from '@uiw/codemirror-themes-all';
// import {vscodeDarkInit} from '@uiw/codemirror-theme-vscode'
// import './App.css';
// const ENDPOINT="http://localhost:5000";
// const socket=socketIo(ENDPOINT,{transports:["websocket"]});
// function App() {
//   socket.on('connect',()=>{
//     console.log("connection");
//   })
//   return (
//     <div className="App">
//       <CodeMirror
//       value="console.log('hello world!');"
//       height='calc(100vh - 100px)'
//       theme={vscodeDarkInit}
//       extensions={[javascript({ jsx:false })]}
//     />
//     </div>
//   );
// }

// export default App;
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import {vscodeDark,solarizedDark} from '@uiw/codemirror-themes-all';
function App() {
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log('value:', value);
  }, []);
  return (
    <CodeMirror
      value="console.log('hello world!');"
      height='calc(100vh - 100px)'
      theme={solarizedDark}
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
}
export default App;