import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
import Sidebar from "./components/sidebar/sidebar";
import Home from "./components/pages/home";
import Password from "./components/pages/password";
import Login from "./components/auth/login";
import ForgetPass from "./components/auth/lupaPassword";
import TambahPassword from "./components/pages/tambahPassword";
import EditPassword from "./components/pages/editPassword";
import PassGenerator from "./components/pages/passwordGenerator";
import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  console.log(isLoggedIn)
  
  return (
    <div className="App overflow-y-hidden font-ubuntu">
      <Sidebar isLoggedIn={isLoggedIn}/>
      <div className="wrapper-content overflow-y-hidden h-[100vh] w-auto font-ubuntu">
        <Routes>
          <Route element={<ProtectedRoute />}>

            {isLoggedIn ? (
              <>
                <Route path="/login" element={<Navigate to="/"/>} />
                <Route path="/" element={<Home />} />
                <Route path="/password" element={<Password />} />
                <Route path="/tambah" element={<TambahPassword />} />
                <Route path="/edit" element={<EditPassword />} />
                <Route path="/passgen" element={<PassGenerator />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/password" element={<Navigate to="/login" />} />
                <Route path="/tambah" element={<Navigate to="/login" />} />
                <Route path="/edit" element={<Navigate to="/login" />} />
                <Route path="/passgen" element={<Navigate to="/login" />} />
              </>
            )}

          </Route>

          <Route path="*" element={<div>Halaman Tidak Ada</div>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/lupa" element={<ForgetPass />} />

        </Routes>
      </div>
    </div>
  )
}
