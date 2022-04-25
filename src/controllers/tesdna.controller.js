const TesDNA = require("../models/tesdna.model.js");
const Penyakit = require("../models/penyakit.model.js");
const Algo = require("../algorithm/algorithm.js")

// CREATE tesDNA
exports.createTesDNAKMP = (req, res) => {
  // VALIDATE REQUEST
  if (!req.body){
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // CREATE A PENYAKIT
  Penyakit.findByName(req.body.penyakit, (err, penyakit) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TesDNA."
      });
    } else {
      const kemiripan = Algo.kmpMatch(req.body.sekuens, penyakit[0].Sekuens);
      let status = 0;
  
      if (kemiripan == 100){
        status = 1;
      } 
  
      // CREATE A TESDNA
      const tesdna = new TesDNA({
        namapengguna : req.body.namapengguna,
        penyakit : req.body.penyakit,
        status : status,
        kemiripan : kemiripan,
        tanggal : req.body.tanggal,   
        sekuens : req.body.sekuens,
      });
    
      // SAVE INTO DB
      TesDNA.create(tesdna, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the TesDNA."
          });
        else res.send(data);
      });
    }
  });
};

// CREATE tesDNA Booyer-Moore
exports.createTesDNABM = (req, res) => {
  // VALIDATE REQUEST
  if (!req.body){
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // CREATE A PENYAKIT
  Penyakit.findByName(req.body.penyakit, (err, penyakit) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TesDNA."
      });
    } else {
      const kemiripan = Algo.boyerMooreMatch(req.body.sekuens, penyakit[0].Sekuens);
      let status = 0;
  
      if (kemiripan == 100){
        status = 1;
      } 
  
      // CREATE A TESDNA
      const tesdna = new TesDNA({
        namapengguna : req.body.namapengguna,
        penyakit : req.body.penyakit,
        status : status,
        kemiripan : kemiripan,
        tanggal : req.body.tanggal,   
        sekuens : req.body.sekuens,
      });
    
      // SAVE INTO DB
      TesDNA.create(tesdna, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the TesDNA."
          });
        else res.send(data);
      });
    }
  });
};

/// GET All
exports.getAllTesDNA = (req, res) => {
  TesDNA.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving TesDNA."
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
          message: `Not found TesDNA with tanggal ${req.params.tanggal}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving TesDNA with tanggal " + req.params.tanggal
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
          message: `Not found TesDNA with penyakit ${req.params.penyakit}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving TesDNA with penyakit " + req.params.penyakit
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
          message: `Not found TesDNA with tanggal ${req.params.tanggal} and penyakit ${req.params.penyakit}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving TesDNA with tanggal " + req.params.tanggal + " and penyakit " + req.params.penyakit
        });
      }
    } else res.send(data);
  });
};
