import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Password() {
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [cari, setCari] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [column, setColumn] = useState("id");
  const [value, setValue] = useState("");

  const base_url = "https://sheetdb.io/api/v1/243lr64k6j0xy";

  const navigate = useNavigate()

  useEffect(() => {
    fetch()
  }, []);

  const fetch = () => {
    axios
      .get(base_url + "?sheet=Password", {
        headers: { Authorization: "Bearer e4gn8vclct7evkyc1s1h4j5ldmw1sxrmpz4l920f" },
      })
      .then((response) => {
        setData(response.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
    });
  };

  const tampilkanSemua = () => {
    fetch();
  };

  const search = (e) => {
    e.preventDefault();
    axios
      .get(base_url + `/search?sheet=Password&nama_aplikasi=${cari}`, {
        headers: { Authorization: "Bearer e4gn8vclct7evkyc1s1h4j5ldmw1sxrmpz4l920f" },
      })
      .then((response) => {
        setData(response.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
    });
  };

  const hapus = (item) => {
    console.log(item.id)

    axios.delete(base_url + `/${column}/${item.id}?sheet=Password`, {
        headers: { Authorization: "Bearer e4gn8vclct7evkyc1s1h4j5ldmw1sxrmpz4l920f" },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.deleted == 1) {
            alert("Data berhasil dihapus");
            window.location.reload()
        }

    });
  };

  const edit = (item) => {
    navigate("/edit", { state: { item: item } })
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <section className="flex flex-row justify-center">
        <div className="container h-[100vh] flex flex-col font-ubuntu">
          <div className="container text-center">
            <h1 className="text-xl">Daftar Password</h1>
          </div>

          <div className="container flex flex-col justify-center items-center mt-5">
            <div className="container flex flex-row justify-between mb-5">
              <div className="container">
                <form onSubmit={search}>
                  <input type="search" className="border-2 border-f1 rounded-lg" placeholder="Cari Berdasarkan Nama Aplikasi" value={cari} onChange={(e) => setCari(e.target.value)} />
                  <button className="border-2 w-[7vw] border-f1 rounded-lg ml-5" type="submit">
                    Search
                  </button>
                </form>
              </div>

              <div className="container flex justify-end gap-3">
                <button className="border-2 w-[15vw] border-f1 rounded-lg" onClick={() => (window.location.href = "/tambah")}>
                  Tambah Password
                </button>

                <button className="border-2 w-[15vw] border-f1 rounded-lg" onClick={tampilkanSemua}>
                  Tampilkan semua
                </button>
              </div>
            </div>

            <table className="border-2 table-auto w-full">
              <thead>
                <tr className="text-center font-bold bg-f1 text-white">
                  <td className="border-r">No.</td>
                  <td className="border-r">Nama Aplikasi</td>
                  <td className="border-r">Username</td>
                  <td className="border-r">Password</td>
                  <td className="border-r">Waktu Pembuatan</td>
                  <td className="border-r">Aksi</td>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => {
                  return (
                    <tr key={item.id} className="border-b text-center">
                      <td className="border-r p-2">{item.id}</td>
                      <td className="border-r p-2">{item.nama_aplikasi}</td>
                      <td className="border-r p-2">{item.username}</td>
                      <td className="border-r p-2">{item.password}</td>
                      <td className="border-r p-2">{item.tanggal_pembuatan}</td>
                      <td className="border-r p-2">
                        <button className="mr-3 border rounded-lg w-[5vw] bg-blue-400 text-white" onClick={() => edit(item)}>Edit</button>
                        <button className="border rounded-lg w-[6vw] bg-red-500 text-white" onClick={() => hapus(item)}>Hapus</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="pagination">
              {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map((number) => (
                <button key={number + 1} onClick={() => paginate(number + 1)} className={`m-2 ${currentPage === number + 1 ? "bg-gray-300" : "bg-white"}`}>
                  {number + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
