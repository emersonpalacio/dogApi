const { Router } = require("express");
//const { getAlltemperemnt } = require("../controllers/temperamentController");
const axios = require("axios");
const router = Router();
const { Temperament } = require("../db");

router.get("/", async (req, res) => {
  try {
    const apiInfo = (await axios.get("https://api.thedogapi.com/v1/breeds"))
      .data;

    const temperaments = apiInfo
      .map((element) => element.temperament)
      .join()
      .split(",")
      .sort();
    // console.log(temperaments)
    await temperaments
      .filter((temp, ind) => temperaments.indexOf(temp) === ind) //hago un filter para eliminar los duplicados con indexOf
      .forEach((temp) => {
        if (temp.trim() !== "") {
          //si el temp no es una cadena vacia
          Temperament.findOrCreate({
            where: {
              name: temp.trim(),
            },
          });
        }
      });

    const dbTemperaments = await Temperament.findAll({
      order: ["name"],
    });
    // console.log(dbTemperaments)
    res.status(200).json(dbTemperaments);
  } catch (error) {
    error.message;
  }
});

module.exports = router;
