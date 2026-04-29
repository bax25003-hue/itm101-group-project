const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

let totals = {
  calories: 0,
  protein: 0,
  carbs: 0,
  fats: 0,
};

app.post("/add", (req, res) => {
  const { calories, protein, carbs, fats } = req.body;

  totals.calories += Number(calories);
  totals.protein += Number(protein);
  totals.carbs += Number(carbs);
  totals.fats += Number(fats);

  res.json(totals);
});

app.get("/totals", (req, res) => {
  res.json(totals);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
