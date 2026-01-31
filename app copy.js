require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Configuration de la connexion à la base de données
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    // On tente une requête simple sur la DB
    const dbRes = await pool.query('SELECT NOW() as temps');
    res.send(`
      <body style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h1 style="color: #4A90E2;">🚀 Node App en ligne !</h1>
        <p>Statut du serveur : <strong>Opérationnel</strong></p>
        <hr>
        <p>Connexion PostgreSQL : ✅ Réussie</p>
        <p>Heure du serveur DB : ${dbRes.rows[0].temps}</p>
      </body>
    `);
  } catch (err) {
    res.status(500).send(`
      <body style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h1 style="color: #D0021B;">❌ Erreur de connexion</h1>
        <p>L'application tourne, mais ne peut pas joindre la DB.</p>
        <pre style="background: #eee; padding: 10px;">${err.message}</pre>
      </body>
    `);
  }
});

app.listen(port, () => {
  console.log(`Application lancée sur http://localhost:${port}`);
});