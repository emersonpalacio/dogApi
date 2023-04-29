const { Router } = require("express");
const getAllDog = require("../controllers/getAllDog");
const getDogByName = require("../controllers/getDogByName");
const getDogById = require("../controllers/getDogId");
const { Dog, Temperament } = require("../db");

// const {
//   searchDogsInApiAndDB,
//   searchByName,
//   createDog,
// } = require("../controllers/dogController");

const router = Router();

// router.get("/p", async (req, res) => {
//   //console.log("pruebas");
//   try {
//     const allDogs = await searchDogsInApiAndDB();
//     res.status(200).json(allDogs);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    let data;
    if (name) {
      data = await getDogByName(name);
    } else {
      data = await getAllDog();
    }
    //console.log(data);
    if (data.error) throw new Error("No se encuentran datos");
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let dogFound = await getDogById(id);
    res.status(200).json(dogFound);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.post("/", async (req, res) => {
  let {
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    life_span,
    breed_group,
    bred_for,
    image,
    origin,
    temperaments,
  } = req.body;
  try {
  } catch (error) {}
  //Validacion los datos
  if (!name || !heightMin || !heightMax || !weightMin || !weightMax) {
    throw new Error("Mandatory data is missing");
  }
  if (!Array.isArray(temperaments)) {
    throw new Error("Temperaments should be an array");
  }
  let findName = await Dog.findOne({ where: { name: name } });

  if (findName) {
    return res.status(400).json({ message: "El nombre ya ha sido registrado" });
  }
  try {
    let newDog = await Dog.create({
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      life_span,
      breed_group,
      bred_for,
      image,
      origin,
      temperaments,
    });

    //Relaciona el newDog con los temperaments creados en la bd.
    const temperamentsDb = await Temperament.findAll({
      where: { name: temperaments },
    });
    newDog.addTemperaments(temperamentsDb);

    res.status(201).send(`Dogs ${name} created successfully!`);
  } catch (error) {
    return { error: error.message };
  }
});
//https://i.ibb.co/tqPn4dv/lobo-logo.png

//extra deleete
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dogDelete = await Dog.findByPk(id);
    dogDelete.destroy();
    res.status(200).send(dogDelete);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
