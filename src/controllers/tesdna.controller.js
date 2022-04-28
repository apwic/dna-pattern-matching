const TesDNA = require("../models/tesdna.model.js");
const Penyakit = require("../models/penyakit.model.js");
const Algo = require("../algorithm/algorithm.js")
const Query = require("../algorithm/query.js");

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
      console.log(req.body);
      console.log(penyakit);
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
  
      if (kemiripan >= 80){
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

// GET Latest
exports.getLatestTesDNA = (req, res) => {
  TesDNA.getLatest((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving TesDNA."
      });
    else res.send(data);
  })
}

exports.searchTesDNA = (req, res) => {
  console.log(req.query.value);
  const query = Query.parseString(req.query.value);
  console.log(query);

  if (query.type === 1){
    TesDNA.findByTanggal(query.tanggal, (err, data) => {
      console.log(data);
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found TesDNA with tanggal ${query.tanggal}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving TesDNA with tanggal " + query.tanggal
          });
        }
      } else { res.send(data); }
    });
  } else if (query.type === 2){
    TesDNA.findByPenyakitAndTanggal(query.penyakit, query.tanggal, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found TesDNA with tanggal ${query.tanggal} and penyakit ${query.penyakit}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving TesDNA with tanggal " + query.tanggal + " and penyakit " + query.penyakit
          });
        }
      } else { res.send(data); }
    });
  } else if (query.type === 3){
    TesDNA.findByPenyakit(query.penyakit, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found TesDNA with penyakit ${query.penyakit}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving TesDNA with penyakit " + query.penyakit
          });
        }
      } else { res.send(data); }
    });
  } else {
    res.status(404).send({
      message: "TesDNA Not found "
    });
  }
}
