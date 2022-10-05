const express = require("express");
const app = require("express")();
app.use(express.json());

const agencies = [
  { name: "Pits", city: "Amsterdam", id: 1 },
  { name: "Marti", city: "Amsterdam", id: 2 },
  { name: "Antic", city: "Rotterdam", id: 3 },
];

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/agencies", (req, res) => {
  res.json(agencies);
});

app.post("/agencies", (req, res) => {
  const agency = req.body;

  agencies.push({ ...req.body });
  return res.status(201).json({ success: true, agencies: agencies });
});

app.get("/agencies/:id", (req, res) => {
  param = req.params;

  const findAgency = agencies.find((agency) => agency.id == param.id);

  res.status(200).json(findAgency);
});

app.patch("/agencies/:id", (req, res) => {
  const param = req.params;
  const body = req.body;

  const UpdateAgency = agencies.find((agency) => agency.id == param.id);

  for (const [key, value] of Object.entries(UpdateAgency)) {
    UpdateAgency[key] = !body[key]
      ? (UpdateAgency[key] = value)
      : (UpdateAgency[key] = body[key]);
  }

  res.status(200).json(UpdateAgency);
});

module.exports = app;
