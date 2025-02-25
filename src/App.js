import React, { useState } from "react";
import Footer from "./Footer";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SendPhotoPage from "./SendPhoto";
import RetrievePhotoPage from "./RetrievePhoto";
import { Camera, Download, Home, Wallet } from "lucide-react";
import { ethers, BrowserProvider } from "ethers";
import "./App.css";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);

  // 🏆 Connect to MetaMask
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected! Please install MetaMask.");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWalletAddress(address);
      console.log("✅ Connected Wallet:", address);
    } catch (error) {
      console.error("❌ Wallet connection failed:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="nav-bar glass-effect">
          <Link to="/" className="nav-logo">
            <img src="/icon.png" alt="Acute Logo" className="logo-icon" />
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-button">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/send-photo" className="nav-button">
              <Camera size={20} />
              <span>Send File</span>
            </Link>
            <Link to="/retrieve-photo" className="nav-button">
              <Download size={20} />
              <span>Retrieve File</span>
            </Link>
          </div>

          {/* 🚀 Connect Wallet Button */}
          <button className="nav-button wallet-button" onClick={connectWallet}>
            <Wallet size={24} />
            {walletAddress
              ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : "Connect"}
          </button>
        </nav>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/send-photo" element={<SendPhotoPage />} />
            <Route path="/retrieve-photo" element={<RetrievePhotoPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <div className="home-container glass-effect">
      <div className="hero-section">
        <h1 className="title">Seamless File Transfer with Web3</h1>
        <p className="subtitle">
          Securely share your files using blockchain technology and IPFS storage.
          End-to-end encryption ensures your belongings remain private and accessible.
        </p>
        <div className="feature-grid">
          <div className="feature-card glass-effect">
            <Link to="send-photo">
              <Camera size={32} />
            </Link>
            <h3>Send Files</h3>
            <p>Upload and share files securely with specific recipients</p>
          </div>
          <div className="feature-card glass-effect">
            <Link to="retrieve-photo">
              <Download size={32} />
            </Link>
            <h3>Retrieve Files</h3>
            <p>Access shared files using your unique OTP</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
