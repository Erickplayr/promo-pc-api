import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/buscar", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.json([]);

  const url =
    "https://api.mercadolibre.com/sites/MLB/search?q=" +
    encodeURIComponent(q) +
    "&limit=20";

  try {
    const r = await fetch(url);
    const d = await r.json();

    const produtos = d.results.map(p => ({
      titulo: p.title,
      preco: p.price,
      imagem: p.thumbnail.replace("http", "https"),
      link: p.permalink
    }));

    produtos.sort((a, b) => a.preco - b.preco);
    res.json(produtos);

  } catch (e) {
    res.status(500).json({ erro: true });
  }
});

app.listen(3000, () => {
  console.log("API rodando");
});
