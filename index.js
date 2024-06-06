import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

let teaData = [];
let nextId = 1;

//add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(200).send(newTea);
});
//get all teas
app.get("/teas", (req, res) => {
  res.status(201).send(teaData);
});

//get specific tea
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

//update tea

app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

//delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((tea) => tea.id === parseInt(req.params.id));
  if (index === -1) {
    req.status(404).send("Tea not found");
  }
  teaData.splice(index, 1);
  req.status(204).send("Tea Deleted");
});
app.get("/", (req, res) => {
  res.send("Hello from Ambition");
});

app.get("/ice-tea", (req, res) => {
  res.send("What Ice Tea would you prefer?");
});

app.get("/twitter", (req, res) => {
  res.send("ambikndsdotcom");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
