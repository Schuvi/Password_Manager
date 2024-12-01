import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const user = window.localStorage.getItem("Username");

  const base_url = "https://schuvi-web.biz.id/api/get";

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    axios
      .get(base_url)
      .then((response) => {
        setData(response.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <section className="h-full flex flex-col items-center font-ubuntu">
        <div className="container items-center flex flex-col font-ubuntu mb-5">
          <h1 className="text-3xl font-bold mb-3">Beranda</h1>
          <h1 className="text-xl">Selamat Datang {user}</h1>
        </div>

        <div className="container">
          <h1>Ringkasan Perubahan Password :</h1>
          <table className="border-2 table-auto w-full">
            <thead>
              <tr className="text-center font-bold bg-f1 text-white">
                <td className="border-r">No.</td>
                <td className="border-r">Nama Aplikasi</td>
                <td className="border-r">Waktu Edit</td>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => {
                return (
                  <tr key={item.id} className="border-b text-center">
                    <td className="border-r p-2">{item.id}</td>
                    <td className="border-r p-2">{item.nama_aplikasi}</td>
                    <td className="border-r p-2">{item.tanggal_edit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="pagination text-center">
            {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map((number) => (
              <button key={number + 1} onClick={() => paginate(number + 1)} className={`m-2 ${currentPage === number + 1 ? "bg-gray-300" : "bg-white"}`}>
                {number + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
