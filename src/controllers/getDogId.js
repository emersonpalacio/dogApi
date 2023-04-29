const getAllDog = require("./getAllDog");

const getDogId = async (id) => {
  const allDogs = await getAllDog();
  let miDog = await allDogs.find((d) => d.id === id || d.id === Number(id));
  if (!miDog) return Error(`Id ${id} dog not found`);
  return miDog;
};

module.exports = getDogId;
