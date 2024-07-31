import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function PassGenerator() {
  const [username, setUsername] = useState("");
  const [hasil, setHasil] = useState("");
  const [copy, setCopy] = useState("")

  const generatePassword = (prefixOptions = ["Satraaliyu", "Satrashufi"], length = 16) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    let result = '';
    const prefix = prefixOptions[Math.floor(Math.random() * prefixOptions.length)];
    const charactersLength = characters.length;
    
    for (let i = 0; i < length - prefix.length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return prefix + result;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = generatePassword()

    setHasil(response)
    setCopy("Klik Password Untuk Mengcopy")
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hasil)
        .then(() => {
            alert('Password copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

  return (
    <section className=" h-full w-full flex flex-col justify-center items-center">
      <h1 className="mb-14 text-3xl font-bold">Password Generator</h1>

      <h1 onClick={handleCopy} className="cursor-pointer mb-5">Password : {hasil} </h1>
      <h1>{copy}</h1>

      <button onClick={handleSubmit} className="mt-5 border w-[7vw] rounded-lg bg-blue-300 text-white">
        Generate
      </button>
    </section>
  );
}
