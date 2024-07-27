import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TambahPassword() {
  const base_url = "https://sheetdb.io/api/v1/243lr64k6j0xy?sheet=Password";

  const date = new Date();
  const time = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  const [id, setId] = useState("INCREMENT");
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [waktu, setWaktu] = useState(time.toString());

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("id", id);
    data.append("nama_aplikasi", nama);
    data.append("username", username);
    data.append("password", password);
    data.append("tanggal_pembuatan", waktu);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: base_url,
      headers: {
        Authorization: "Bearer e4gn8vclct7evkyc1s1h4j5ldmw1sxrmpz4l920f",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log(response.data.created);

        if (response.data.created == 1) {
          alert("Data Berhasil Ditambahkan");
          setNama("");
          setUsername("");
          setPassword("");
        } else {
          alert("Data Gagal Ditambahkan");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section className="flex flex-col justify-start mt-5 items-center h-full">
        <div className="container text-center mb-5">
          <h1 className="font-ubuntu text-3xl font-bold">Tambah Password Baru</h1>
        </div>

        <div className="container flex justify-center w-full h-[70vh]">
          <form onSubmit={handleSubmit} className="w-full flex justify-center p-5">
            <div className="container bg-green-300 flex flex-col justify-evenly w-1/2 border-4 rounded-lg p-2">
              <input type="text" className="border-2 rounded-lg h-[7vh]" placeholder="Masukkan Id" value={id} onChange={(e) => setId(e.target.value)} disabled hidden />
              <input type="text" className="border-2 rounded-lg h-[7vh]" placeholder="Masukkan Nama Aplikasi" value={nama} onChange={(e) => setNama(e.target.value)} />
              <input type="text" className="border-2 rounded-lg h-[7vh]" placeholder="Masukkan Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input type="text" className="border-2 rounded-lg h-[7vh]" placeholder="Masukkan Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <input type="text" className="border-2 rounded-lg h-[7vh]" placeholder="Waktu Pembuatan" value={waktu} onChange={(e) => setWaktu(e.target.value)} disabled hidden />

              <div className="container flex justify-center">
                <button type="submit" className="border w-1/2 bg-white rounded-lg">
                  Tambah Password Baru
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
