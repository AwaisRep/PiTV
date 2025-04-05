import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {Greet} from "../wailsjs/go/main/App.js";

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);

    function greet() {
        Greet(name).then(updateResultText);
    }

    return (
        <div className="min-h-screen bg-base-100 text-base-content flex flex-col items-center justify-center p-4">
            {/* Keep the original logo with its ID */}
            <img src={logo} id="logo" alt="logo" className="w-64 mb-8"/>
            
            {/* Card container with DaisyUI styling */}
            <div className="card w-96 bg-base-200 shadow-xl">
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-2xl">Welcome to PiTV</h2>
                    
                    {/* Result text with DaisyUI alert styling */}
                    <div id="result" className="alert alert-info w-full my-4">
                        <span>{resultText}</span>
                    </div>
                    
                    {/* Input box using DaisyUI form elements */}
                    <div id="input" className="form-control w-full">
                        <div className="input-group">
                            <input 
                                id="name"
                                className="input input-bordered w-full" 
                                onChange={updateName} 
                                autoComplete="off" 
                                name="input" 
                                type="text"
                                placeholder="Type your name"
                            />
                            <button 
                                className="btn btn-primary" 
                                onClick={greet}
                            >
                                Greet
                            </button>
                        </div>
                    </div>
                    
                    {/* Additional DaisyUI component to verify styling */}
                    <div className="badge badge-accent mt-4">DaisyUI is working!</div>
                    
                    {/* DaisyUI button for demonstration */}
                    <div className="card-actions mt-4">
                        <button className="btn btn-outline btn-secondary">
                            Another Button
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
