require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Config de la DB (utilisera les variables de la VM2)
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const dbRes = await pool.query('SELECT NOW()');
    res.send(`
      <h1>🚀 Node App Déployée !</h1>
      <p>Statut : <b>Opérationnel</b></p>
      <p>Première modification pour déploiement automatiser</p>
      <p>Connexion DB (VM3) : ✅ Réussie à ${dbRes.rows[0].now}</p>
    `);
  } catch (err) {
    res.status(500).send("❌ Erreur de connexion à la VM3 : " + err.message);
  }
});

app.listen(port, () => {
  console.log(`App test lancée sur http://localhost:${port}`);
});