module.exports = (app) => {
  const tesdna = require("../controllers/tesdna.controller.js")
  var router = require("express").Router();

  // CREATE DNA TEST KMP
  router.post("/dnatest/create-tes-dna-kmp", tesdna.createTesDNAKMP);
  // CREATE DNA TEST Booyer-Moore
  router.post("/dnatest/create-tes-dna-bm", tesdna.createTesDNABM);
  // GET ALL TEST
  router.get("/history/get-all-tes-dna", tesdna.getAllTesDNA);
  // GET BY Tanggal
  router.get("/history/get-tes-dna-by-tanggal/:tanggal", tesdna.getTesDNAbyTanggal);
  // GET BY Penyakit
  router.get("/history/get-tes-dna-by-penyakit/:penyakit", tesdna.getTesDNAbyPenyakit);
  // GET BY Tanggal AND Penyakit
  router.get("/history/get-tes-dna-by-tanggal-and-penyakit/:tanggal/:penyakit", tesdna.getTesDNAbyTanggalAndPenyakit);
  app.use('/', router);
}