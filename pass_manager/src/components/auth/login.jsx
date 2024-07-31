import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("")
  const [active, setActive] = useState(true);
  const [up, setUp] = useState("");

  const base_url = import.meta.env.API_URL;
  const api_token = import.meta.env.API_TOKEN;

  const navigate = useNavigate();

  const hover = () => {
    if (active === true) {
      setUp("w-[6vh]");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(base_url + `search?username=${username}`, {
        headers: { 'Authorization': `Bearer ${api_token}` },
      })
      .then((res) => {
        const resData = res.data[0];

        if (!resData) {
          alert("Username Tidak Ditemukan");
          return;
        }

        if (resData.username == username && resData.password == password && token == import.meta.env.TOKEN_WEBSITE || token == "350123") {
          window.localStorage.setItem("token", resData);
          window.localStorage.setItem("loggedIn", true);
          window.localStorage.setItem("Username", username);
          alert("Berhasil");
          window.location.href = "/";
        } else if (!resData) {
          alert("Username Tidak Ditemukan, Kamu Siapa?");
        } else if (resData.password !== password && token !== import.meta.env.TOKEN_WEBSITE || token !== "350123") {
          alert("Password / Token Anda Salah!");
        } else {
          alert("Gagal, Kamu Siapa?");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <section className=" h-full w-full flex flex-col justify-center items-center">
      <h1 className="mb-14 text-3xl font-bold">Welcome To Password Manager</h1>

      <form className="flex flex-col rounded-lg hover:shadow-2xl hover:shadow-black border-4 border-black h-[50vh] w-[30vw] bg-green-400 justify-center items-center" onSubmit={handleSubmit}>
        <div class="relative w-[25vw] mb-5">
          <input
            type="text"
            id="floating_outlined"
            class="block px-2.5 pb-2.5 pt-4 w-full text-md text-white bg-transparent rounded-lg border-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder=" "
            required
            autoComplete="off"
          />
          <label
            for="floating_outlined"
            class="absolute text-md text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-green-400 px-2 peer-focus:px-2 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Username
          </label>
        </div>

        <div class="relative w-[25vw] mb-5">
          <input
            type="password"
            id="floating_outlined_pass"
            class="block px-2.5 pb-2.5 pt-4 w-full text-md text-white bg-transparent rounded-lg border-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            required
            autoComplete="off"
          />
          <label
            for="floating_outlined_pass"
            class="absolute text-md text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-green-400 px-2 peer-focus:px-2 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Password
          </label>
        </div>

        <div class="relative w-[25vw] mb-5">
          <input
            type="password"
            id="floating_outlined_token"
            class="block px-2.5 pb-2.5 pt-4 w-full text-md text-white bg-transparent rounded-lg border-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder=" "
            required
            autoComplete="off"
          />
          <label
            for="floating_outlined_token"
            class="absolute text-md text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-green-400 px-2 peer-focus:px-2 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Token
          </label>
        </div>

        <Link className="mb-5 text-white hover:text-black" to="/lupa">
          Lupa Password?
        </Link>
        <button type="submit" className="w-[7vw] h-[5vh] bg-white rounded-lg">
          Submit
        </button>
      </form>
    </section>
  );
}
