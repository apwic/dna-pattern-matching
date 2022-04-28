const sql = require("./db.js");

// CONSTRUCTOR
const TesDNA = function(tesdna){
  this.namapengguna = tesdna.namapengguna;
  this.penyakit = tesdna.penyakit;
  this.sekuens = tesdna.sekuens;
  this.status = tesdna.status;
  this.kemiripan = tesdna.kemiripan;
  this.tanggal = tesdna.tanggal;
}

// CREATE AND INSERT INTO DB
TesDNA.create = (newTesDNA, result) => {
  sql.query("INSERT INTO TesDNA SET ?", newTesDNA, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created TesDNA: ", { id: res.insertId, ...newTesDNA });
    result(null, { id: res.insertId, ...newTesDNA });
  });
};

// GET ALL
TesDNA.getAll = (result) => {
  sql.query("SELECT * FROM TesDNA", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("TesDNA: ", res);
    result(null, res);
  });
};

// GET LATEST
TesDNA.getLatest = (result) => {
  sql.query("SELECT * FROM TesDNA ORDER BY IdPengguna DESC LIMIT 1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("TesDNA: ", res);
    result(null, res);
  });
}

// FIND BY Penyakit
TesDNA.findByPenyakit = (penyakit, result) => {
  sql.query("SELECT * FROM TesDNA WHERE Penyakit = ?", [penyakit], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length){
      console.log("found " + res.length + " TesDNA" );
      result(null, res);
      return;
    }

    // not found TesDNA by penyakit
    result({kind:"not_found"}, null);
    return;
  })
}

// FIND BY Tanggal
TesDNA.findByTanggal = (tanggal, result) => {
  sql.query("SELECT * FROM TesDNA WHERE DATE(Tanggal) = ?", [tanggal], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found " + res.length + " TesDNA" );
      result(null, res);
      return;
    }

    // not found TesDNA by Tanggal
    result({kind:"not_found"}, null);
    return;
  })
}

// FIND BY Penyakit AND Tanggal
TesDNA.findByPenyakitAndTanggal = (penyakit, tanggal, result) => {
  sql.query("SELECT * FROM TesDNA WHERE Penyakit = ? AND DATE(Tanggal) = ?", [penyakit, tanggal], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length){
      console.log("found " + res.length + " TesDNA" );
      result(null, res);
      return;
    }

    // not found TesDNA by Tanggal
    result({kind:"not_found"}, null);
    return;
  })
}

module.exports = TesDNA;
