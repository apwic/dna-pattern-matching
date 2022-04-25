const TesDNA = require("../models/tesdna.model.js");

// CREATE tesDNA
exports.createTesDNA = (req, res) => {
  // VALIDATE REQUEST
  if (!req.body){
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // CREATE A TESDNA
  const tesdna = new TesDNA({
    namapengguna : req.body.namapengguna,
    penyakit : req.body.penyakit,
    status : req.body.status,
    kemiripan : req.body.kemiripan,
    tanggal : req.body.tanggal,   
    sekuens : req.body.sekuens,
  });

  // SAVE INTO DB
  TesDNA.create(tesdna, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
};

/// GET All
exports.getAllTesDNA = (req, res) => {
  TesDNA.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  })
};

// GET by Tanggal
exports.getTesDNAbyTanggal = (req, res) => {
  TesDNA.findByTanggal(req.params.tanggal, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with tanggal ${req.params.tanggal}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with tanggal " + req.params.tanggal
        });
      }
    } else res.send(data);
  });
};

// GET by Penyakit
exports.getTesDNAbyPenyakit = (req, res) => {
  TesDNA.findByPenyakit(req.params.penyakit, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with penyakit ${req.params.penyakit}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with penyakit " + req.params.penyakit
        });
      }
    } else res.send(data);
  });
};

// GET tesDNA byTanggalAndPenyakit
exports.getTesDNAbyTanggalAndPenyakit = (req, res) => {
  TesDNA.findByTanggalAndPenyakit(req.params.tanggal, req.params.penyakit, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with tanggal ${req.params.tanggal} and penyakit ${req.params.penyakit}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with tanggal " + req.params.tanggal + " and penyakit " + req.params.penyakit
        });
      }
    } else res.send(data);
  });
};
