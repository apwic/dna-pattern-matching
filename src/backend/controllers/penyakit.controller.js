const Penyakit = require("../models/penyakit.model.js");

// CREATE PENYAKIT
exports.createPenyakit = (req, res) => {
  // VALIDATE REQUEST
  if (!req.body){
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // CREATE A PENYAKIT
  const penyakit = new Penyakit({ 
    namapenyakit: req.body.namapenyakit,
    sekuens: req.body.sekuens
  });

  // SAVE INTO DB
  Penyakit.create(penyakit, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
}; 

// GET PENYAKIT
exports.getPenyakit = (req, res) => {
  Penyakit.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  })
};

// GET PENYAKIT By Name
exports.getPenyakitByName = (req, res) => {
  Penyakit.findByName(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with nama ${req.params.nama}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with nama " + req.params.nama
        });
      }
    } else res.send(data);
  });
};

