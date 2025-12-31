import express from "express";

const app = express();

app.get("/buscar", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.json([]);

  try {
    const url =
      "https://api.mercadolibre.com/sites/MLB/search?q=" +
      encodeURIComponent(q) +
      "&limit=20";

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
    console.log(e);
    res.status(500).json({ erro: true });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("API rodando na porta", PORT);
});
