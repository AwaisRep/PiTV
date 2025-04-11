import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {Greet} from "../wailsjs/go/main/App.js";
import Sidebar from "./Sidebar";

function App() {
    

    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
      // Main content
      <div className="min-h-screen bg-base-100 text-base-content">

        <Sidebar></Sidebar>
      </div>
    )
}

export default App
