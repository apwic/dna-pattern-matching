module.exports = (app) => {
  const penyakit = require("../controllers/penyakit.controller.js");
  var router = require("express").Router();

  // CREATE PENYAKIT
  router.post("/create-penyakit", penyakit.createPenyakit);
  // GET ALL PENYAKIT
  router.get("/get-penyakit", penyakit.getPenyakit);
  // GET PENYAKIT By Name
  router.get("/get-penyakit/:name", penyakit.getPenyakitByName);
  app.use("/penyakit", router);
}