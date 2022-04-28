module.exports = (app) => {
  const tesdna = require("../controllers/tesdna.controller.js")
  var router = require("express").Router();

  // CREATE DNA TEST KMP
  router.post("/create-tes-dna-kmp", tesdna.createTesDNAKMP);
  // CREATE DNA TEST Booyer-Moore
  router.post("/create-tes-dna-bm", tesdna.createTesDNABM);
  // GET LATEST
  router.get("/get-latest", tesdna.getLatestTesDNA);
  // // GET ALL TEST
  // router.get("/history/get-all-tes-dna", tesdna.getAllTesDNA);
  // // GET BY Tanggal
  // router.get("/history/search/:value", tesdna.searchTesDNA);
  app.use('/dnatest', router);
}