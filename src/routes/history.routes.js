module.exports = (app) => {
  const tesdna = require("../controllers/tesdna.controller.js")
  var router = require("express").Router();

  // GET ALL TEST
  router.get("/get-all-tes-dna", tesdna.getAllTesDNA);
  // SEARCH TesDNA
  router.get("/search", tesdna.searchTesDNA);
  app.use('/history', router);
}