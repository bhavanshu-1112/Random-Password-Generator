import { useState, useCallback, useEffect,useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [allowNumber, setAllowNumber] = useState(false);
  const [allowCharacter, setAllowCharacter] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(()=>{
    passwordGenerator();
  }, [length, allowCharacter, allowNumber])

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (allowNumber) str += "0123456789";
    if (allowCharacter) str += "!@#$%^&*_-+={}[]~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, allowNumber, allowCharacter]);

  // useRef hook
  const passwordRef = useRef(null);
  const copyPasswordToClipboard = useCallback(()=> {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password);

  }, [password])

  return (
    <div>
      <h3 className="text-cyan-50 text-4xl text-center">Password Generator</h3>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center">Password Generator</h1>
        <div className="flex-center shadow rounded-lg overflow-hidden mb-4 py-4">
          <input
            className="rounded-l-full px-2 py-2"
            value={password}
            type="text"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button onClick = {copyPasswordToClipboard} className="outline-none bg-blue-300 rounded-r-full text-white px-3 py-2 shrink-0 hover:cursor-pointer
           hover:text-cyan-950 text-b hover:text-xl">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={allowNumber}
              id="numberInput"
              onChange={() => {
                setAllowNumber((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={allowCharacter}
              id="numberInput"
              onChange={() => {
                setAllowCharacter((prev) => !prev);
              }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
