const axios = require("axios");
const { Dog, Temperament } = require("../db");

const getAllApi = async () => {
  try {
    const dogsApi = await axios.get("https://api.thedogapi.com/v1/breeds");

    const dogsApiData = dogsApi.data.map((dog) => {
      //creo 4 contantes para sacar la altura y peso de cada perro
      const [heightMin, heightMax] = dog.height.metric
        ? dog.height.metric.split(" - ")
        : [null, null];

      const [weightMin, weightMax] = dog.weight.metric
        ? dog.weight.metric.split(" - ")
        : [null, null];

      return {
        id: dog.id,
        name: dog.name,
        //height: dog.height,
        heightMin,
        heightMax,
        //weight: dog.weight,
        weightMin,
        weightMax,
        breed_group: dog.breed_group,
        life_span: dog.life_span,
        image: dog.image.url,
        bred_for: dog.bred_for,
        origin: dog.origin,
        temperaments: dog.temperament,
      };
      // console.log(dogsApiData);
    });
    return dogsApiData;
  } catch (error) {
    return { error: error.message };
  }
};
const getAllDb = async () => {
  try {
    return await Dog.findAll({
      //el metodo trae todo y me devuelve una promesa
      include: Temperament,
      //     [{
      //         model: Temperament,
      //         attributes: ["name"],
      //         // through: {
      //         //     attributes: []
      //         // }
      //     }]
    });
  } catch (error) {
    return error.message;
  }
};

const getAllDog = async () => {
  try {
    const dataApi = await getAllApi();
    let dataDB = await getAllDb();

    dataDB = await dataDB.map((dog) => {
      return {
        id: dog.dataValues.id,
        name: dog.dataValues.name,
        heightMax: dog.dataValues.heightMax,
        heightMin: dog.dataValues.heightMin,
        weightMin: dog.dataValues.weightMin,
        weightMax: dog.dataValues.weightMax,
        life_span: dog.dataValues.life_span,
        breed_group: dog.dataValues.breed_group,
        image: dog.dataValues.image,
        origin: dog.dataValues.origin,
        bred_for: dog.dataValues.bred_for,
        temperaments: dog.dataValues.temperaments
          .map((item) => item.name)
          .join(", "),
      };
    });

    // console.log("dataaaaaaaaaaa", dataApi);

    const allDogs = dataDB.concat(dataApi);
    // const allDogs = [...dataDB, ...dataApi];
    //todo lo que tenga en dataDB y todo lo que tenga en dataApi

    return allDogs;
  } catch (error) {
    return error.message;
  }
};

module.exports = getAllDog;
