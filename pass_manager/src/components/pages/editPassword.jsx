import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditPassword() {
  const location = useLocation();
  const { item } = location.state;
  const navigate = useNavigate();

  const base_url = "https://pass.schuvi-web.biz.id/api/edit";

  const date = new Date();
  const time = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  const [id, setId] = useState(item.id);
  const [nama, setNama] = useState(item.nama_aplikasi);
  const [username, setUsername] = useState(item.username);
  const [password, setPassword] = useState(item.password);
  const [waktu, setWaktu] = useState(item.tanggal_pembuatan);
  const [waktuEdit, setWaktuEdit] = useState(time.toString());
  const [column, setColumn] = useState("id");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      id: id,
      nama: nama,
      username: username,
      password: password,
      waktu: waktu,
      waktuEdit: waktuEdit,
    };

    const config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: base_url,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));

        if (response.data.updated == 1) {
          alert("Data Berhasil Ditambahkan");
          navigate("/password");
        } else {
          alert("Data Gagal Ditambahkan");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <section className="flex flex-col justify-start mt-5 items-center h-full">
        <div className="container text-center mb-5">
          <h1 className="font-ubuntu text-3xl font-bold">Edit Password {item.id}</h1>
        </div>

        <div className="container flex justify-center w-full h-[70vh]">
          <form onSubmit={handleSubmit} className="w-full flex justify-center p-5">
            <div className="container bg-green-300 flex flex-col justify-evenly w-1/2 border-4 rounded-lg p-2">
              <input type="text" className="border-2 rounded-lg h-[7vh]" placeholder="Masukkan Id" value={id} onChange={(e) => setId(e.target.value)} disabled />
              <input type="text" className="border-2 rounded-lg h-[7vh]" placeholder="Masukkan Nama Aplikasi" value={nama} onChange={(e) => setNama(e.target.value)} />
              <input type="text" className="border-2 rounded-lg h-[7vh]" placeholder="Masukkan Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input type="text" className="border-2 rounded-lg h-[7vh]" placeholder="Masukkan Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <input type="text" className="border-2 rounded-lg h-[7vh]" placeholder="Waktu Pembuatan" value={waktu} onChange={(e) => setWaktu(e.target.value)} disabled />
              <input type="text" className="border-2 rounded-lg h-[7vh]" placeholder="Waktu Edit" value={waktuEdit} onChange={(e) => setWaktuEdit(e.target.value)} disabled />

              <div className="container flex justify-center">
                <button type="submit" className="border w-1/2 bg-white rounded-lg">
                  Edit Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
