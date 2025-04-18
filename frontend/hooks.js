// MentorMind Custom Hooks

import { useState, useEffect } from "react";
import { ethers } from "ethers";

// Hook for fetching blockchain data
export const useBlockchain = (contractInstance, method, args = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!contractInstance) throw new Error("Contract instance not found");
        const result = await contractInstance[method](...args);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [contractInstance, method, args]);

  return { data, loading, error };
};

// Hook for managing authentication state
export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, login, logout };
};

// Hook for detecting MetaMask and connecting to the wallet
export const useMetaMask = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("MetaMask connection failed", error);
      }
    } else {
      alert("MetaMask not detected. Please install it.");
    }
  };

  return { account, connectWallet };
};
