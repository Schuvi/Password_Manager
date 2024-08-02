const express = require("express");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT;
const token = process.env.VITE_API_TOKEN;
const base_url = process.env.VITE_API_URL;
const token2 = process.env.VITE_API_TOKEN2;
const base_url2 = process.env.VITE_API_URL2;
const sheet = process.env.VITE_SHEET;

const corsOptions = {
  origin: "https://pass.schuvi-web.biz.id",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
  const origin = req.get("origin");
  if (origin !== "https://pass.schuvi-web.biz.id") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
});

app.get("/api/get", async (req, res) => {
  try {
    const response = await axios.get(`${base_url}?sheet=${sheet}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.json(response.data);
  } catch (error) {
    if (error.response.data.error === "Request limit exceeded. Upgrade your plan.") {
      console.log("Limit API sudah tercapai, mengalihkan pada API cadangan");
      try {
        const response = await axios.get(`${base_url2}?sheet=${sheet}`, {
          headers: {
            Authorization: `Bearer ${token2}`,
          },
        });
        return res.json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.get("/api/login", async (req, res) => {
  const { username } = req.query;

  try {
    const response = await axios.get(`${base_url}/search?username=${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    console.log("mengalihkan");
    if (error.response.data.error === "Request limit exceeded. Upgrade your plan.") {
      console.log("Limit API sudah tercapai, mengalihkan pada API cadangan");

      try {
        const backupResponse = await axios.get(`${base_url2}/search?username=${username}`, {
          headers: { Authorization: `Bearer ${token2}` },
        });

        return res.json(backupResponse.data);
      } catch (backupError) {
        console.error(backupError);
        return res.status(500).json({ error: "Internal Server Error from Backup API" });
      }
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.get("/api/search", async (req, res) => {
  const { nama_aplikasi } = req.query;
  try {
    const response = await axios.get(`${base_url}/search?sheet=${sheet}&nama_aplikasi=${nama_aplikasi}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    if (error.response.data.error === "Request limit exceeded. Upgrade your plan.") {
      console.log("Limit API sudah tercapai, mengalihkan pada API cadangan");

      try {
        const response = await axios.get(`${base_url2}/search?sheet${sheet}&nama_aplikasi=${nama_aplikasi}`, {
          headers: {
            Authorization: `Bearer ${token2}`,
          },
        });
        return res.json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.delete("/api/hapus", async (req, res) => {
  const { id } = req.query;
  try {
    const response = await axios.delete(`${base_url}/id/${id}?sheet=${sheet}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    if (error.response.data.error === "Request limit exceeded. Upgrade your plan.") {
      console.log("Limit API sudah tercapai, mengalihkan pada API cadangan");

      const response = await axios.delete(`${base_url2}/id/${id}?sheet=${sheet}`, {
        headers: {
          Authorization: `Bearer ${token2}`,
        },
      });
      return res.json(response.json);
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.post("/api/create", async (req, res) => {
  const { id, nama, username, password, waktu } = req.body;

  const data = {
    id: id,
    nama_aplikasi: nama,
    username: username,
    password: password,
    tanggal_pembuatan: waktu,
  };

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${base_url}?sheet=${sheet}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  const config2 = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${base_url2}?sheet=${sheet}`,
    headers: {
      Authorization: `Bearer ${token2}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    res.json(response.data);
  } catch (error) {
    if (error.response.data.error === "Request limit exceeded. Upgrade your plan.") {
      console.log("Limit API sudah tercapai, mengalihkan pada API cadangan");

      try {
        const response = await axios.request(config2);
        return res.json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.patch("/api/edit", async (req, res) => {
  const { id, nama, username, password, waktu, waktuEdit } = req.body;

  const data = {
    id: id,
    nama_aplikasi: nama,
    username: username,
    password: password,
    tanggal_pembuatan: waktu,
    tanggal_edit: waktuEdit,
  };

  const config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `${base_url}/id/${id}?sheet=${sheet}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  const config2 = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `${base_url2}/id/${id}?sheet=${sheet}`,
    headers: {
      Authorization: `Bearer ${token2}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    if (error.response.data.error === "Request limit exceeded. Upgrade your plan.") {
      console.log("Limit API sudah tercapai, mengalihkan pada API cadangan");

      try {
        const response = await axios.request(config2);
        return res.json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.listen(port, () => console.log(`Server berjalan pada ${port}`));
