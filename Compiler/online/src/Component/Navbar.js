import './Navbar.css';
import {useState} from 'react';
import io from 'socket.io-client';
const socket = io("http://localhost:5000",{transports:["websocket"]})
//import {cpp} from '@codemirror/lang-cpp';
function Navbar(prop){
    const [theme,setTheme]=useState('');
    const [language,setLanguage]=useState('py');
    const [status,setStatus]=useState(true);
    const [code,setCode]=useState('');
    function runHandler(){
        prop.Execute();
        //socket.emit('runCode',{code,language});
        setStatus(true);
        prop.status(status);
    }
    prop.Theme(theme);
    return(
        <div className="Navbar">
                <div className='ThemeContainer'>
                    <label className='label'>Theme: </label>
                    <select className='Theme' onChange={(e)=>setTheme(e.target.value)}>
                        <option>Select The theme</option>
                        <option value={0}>light</option>
                        <option value={1}>dark</option>
                        <option value={2}>dart green</option>
                        <option value={3}>solarizedDark</option>
                    </select>
                </div>
            <div className='ThemeContainer'>
                <label className='label'>Language: </label>
                <select className='Theme' onChange={(e)=>setLanguage(e.target.value)}>
                    <option value={"cpp"}>Cpp</option>
                    <option value={"c"}>C</option>
                    <option value={"py"}>Python</option>
                    <option value={"java"}>Java</option>
                    <option value={"js"}>Javascript</option>
                    <option value={"html"}>Html</option>
                </select>
            </div>
            <button onClick={runHandler} className='run'>RUN</button>
        </div>
    );

}
export default Navbar;