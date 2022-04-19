const sql = require("./db.js");

// CONSTRUCTOR
const Penyakit = function(penyakit){
  this.nama = penyakit.nama;
  this.sekuens = penyakit.sekuensl;
}

// CREATE AND INSERT INTO DB
Penyakit.create = (newPenyakit, result) => {
  sql.query("INSERT INTO Penyakit SET ?", newPenyakit, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Penyakit: ", { id: res.insertId, ...newPenyakit });
    result(null, { id: res.insertId, ...newPenyakit });
  });
};

// GET ALL
Penyakit.getAll = (result) => {
  sql.query("SELECT * FROM Penyakit", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Penyakit: ", res);
    result(null, res);
  });
};

// FIND BY NAME
Penyakit.findByName = (nama, result) => {
  sql.query(`SELECT * FROM Penyakit WHERE nama = ${nama}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length){
      console.log("found " + res.length + " Penyakit" );
      return(null, res);
    }

    // not found Penyakit by nama
    return({kind:"not_found"}, null);
  });
};