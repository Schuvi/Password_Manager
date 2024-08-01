import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ForgetPass() {
  const [username, setUsername] = useState("");
  const [hasil, setHasil] = useState("");

  const base_url = "https://pass.schuvi.web.biz.id/api/v1/login";

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`${base_url}?username=${username}`)
      .then((res) => {
        const resData = res.data[0];

        if (!resData) {
          alert("Username Tidak Ditemukan, Kamu Siapa?");
          setHasil("Kamu Siapa?");
          return;
        }

        if (resData.username == username) {
          setHasil(resData.password);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const copy = () => {
    navigator.clipboard.writeText(hasil);
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

        <h1>Password Kamu :</h1>
        <h1 className="mb-10 cursor-pointer" onClick={copy}>
          {hasil}
        </h1>

        <Link className="mb-5 text-white hover:text-black" to="/login">
          Login Disini!
        </Link>
        <button type="submit" className="w-[7vw] h-[5vh] bg-white rounded-lg">
          Submit
        </button>
      </form>
    </section>
  );
}
