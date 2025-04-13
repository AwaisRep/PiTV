import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import {Greet} from "../wailsjs/go/main/App.js";

import { HashRouter, Routes, Route } from "react-router";
import './App.css';
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Playlists from "./pages/Playlists";
import Proxy from "./pages/Proxy";
import About from "./pages/About";

function App() {
  return (
    <HashRouter>
      <div className="flex min-h-screen bg-base-100 text-base-content">
        <Sidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/proxy" element={<Proxy />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;

