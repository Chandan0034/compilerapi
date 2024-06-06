import CodeMirror from '@uiw/react-codemirror';
import React, { useState, useEffect} from 'react';
import './Editor.css';
import { StreamLanguage } from '@codemirror/language';
import { dracula, vscodeDark, abcdef, solarizedDark, xcodeLight } from '@uiw/codemirror-themes-all';
import io from 'socket.io-client';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/legacy-modes/mode/python';
import { c, cpp, java} from '@codemirror/legacy-modes/mode/clike';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const socket = io("https://code-compiler-1.onrender.com/", { transports: ["websocket"] });

function Editor() {
    const [sendLanguage, setSendLanguage] = useState('py');
    const [value, setValue] = useState('');
    const [themes, setTheme] = useState(2);
    const [status, setStatus] = useState(false);
    const [language, setLanguage] = useState(python);
    const [languageExtension, setLanguageExtension] = useState([StreamLanguage.define(language)]);
    const [code, setCode] = useState(`print("hello")`);
    const [isRunning, setIsRunning] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    function runHandler() {
        setIsVisible(true);
        if (isRunning) return;
        setIsRunning(true);
        setStatus(true);
        setValue('');  // Clear previous output
        socket.emit('runCode', { code, sendLanguage });
    }
    useEffect(() => {
        const handleOutput = (data) => {
            setValue(prev => prev + data);
            setIsRunning(false);  // Reset the running flag when output is received
        };

        socket.on('output', handleOutput);

        return () => {
            socket.off('output', handleOutput);  // Clean up listener on component unmount
        };
    }, []);
    // const handleKeyDown = (event) => {
    //     if (event.key === 'Enter') {
    //         event.preventDefault();
    //         console.log(socketData)
    //         // const currentValue = value;
    //         // console.log("currntValue ",currentValue)
    //         // const previousValue = previousValueRef.current;
    //         // console.log("previousValue ",previousValue)
    //         // const input = currentValue.substring(previousValue.length);
    //         // socket.emit('inputValue', input.trim());
    //         // previousValueRef.current = currentValue;  // Update the previous value reference
    //         // setValue(prev => prev + '\n');  // Move to the next line in the output editor
    //     }
    // };


    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const inputs = value.trim().split('\n').pop();
            const arr=value.split('\n')
            console.log(arr)  // Get the last line of the value as input
            console.log("input",inputs);
            socket.emit('inputValue', inputs);
            setValue(prev => prev + '\n');  // Move to the next line in the output editor
        }
    }

    const list = [
        { id: xcodeLight },
        { id: vscodeDark },
        { id: abcdef },
        { id: solarizedDark },
        { id: dracula }
    ];

    function themeHandler(event) {
        let getId = event.target.value;
        switch (getId) {
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

    const languageChangeHandler = (event) => {
        const getId = event.target.value;
        switch (getId) {
            case "0":
                setSendLanguage("cpp");
                setLanguageExtension([StreamLanguage.define(cpp)]);
                setCode(`#include<iostream>\nusing namespace std;\nint main(){\n\tcout<<"Hello World!"<<endl;\n\treturn 0;\n}`);
                break;
            case "1":
                setLanguageExtension([StreamLanguage.define(c)]);
                setSendLanguage("c");
                setCode(`#include<stdio.h>\nint main(){\n\tprintf("Hello World!");\n\treturn 0;\n}`);
                break;
            case "2":
                setLanguageExtension([StreamLanguage.define(python)]);
                setSendLanguage("py");
                setCode(`print("hello")`);
                break;
            case "3":
                setLanguageExtension([StreamLanguage.define(java)]);
                setSendLanguage("java");
                setCode(`import java.util.*;\npublic class Main{\n\tpublic static void main(String[] args){\n\t\tSystem.out.println("Hello World!");\n\t}\n}`);
                break;
            case "4":
                setLanguageExtension([javascript({ jsx: true })]);
                setSendLanguage("js");
                setCode(`console.log("Hello World!");`);
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
                    </select>
                </div>
                <button onClick={runHandler} className='run'>
                    <FontAwesomeIcon icon={faPlay} /> RUN
                </button>
            </div>
            <div className='EditorInputOutput'>
                <div>
                    <CodeMirror
                        className='EditorMirror'
                        height='100vh'
                        width='100vw'
                        value={code}
                        onChange={(value) => setCode(value)}
                        extensions={languageExtension}
                        theme={list[themes].id}
                    ></CodeMirror>
                </div>
                <div>{status ?
                    <div className={`sliding-div ${isVisible ? 'visible' : ''}`}>
                        <div className='closeBtn'>
                            <span className='close' onClick={() => setIsVisible(false)}>&times;</span>
                        </div>
                        <CodeMirror
                            className='outputEditor'
                            height='100%'
                            value={value}
                            theme={xcodeLight}
                            onChange={(e) => setValue(e)}
                            onKeyDown={handleKeyDown}>
                        </CodeMirror>
                    </div> : null}
                </div>
            </div>
        </div>
    );
}

export default Editor;
