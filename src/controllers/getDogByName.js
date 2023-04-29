const getAllDog = require("./getAllDog");
const specialCharactresTypeRegex = /[0-9@:%._+~#=]/gi;

const getDogByName = async (name) => {
  if (specialCharactresTypeRegex.test(name)) {
    throw new Error("Debes ingresar un nombre valido");
  }
  const allDogs = await getAllDog();
  const dogFilters = allDogs.filter(
    (dog) => name.toLowerCase() === dog.name.toLowerCase()
  );

  if (!dogFilters.length) throw new Error(`Dont found name ${name}`);
  return dogFilters;
};

module.exports = getDogByName;

// async function searchByName(name) {
//   //Validamos los datos ingresados en la busqueda
//   if (!name) throw new Error("Debe ingresar el nombre de la raza a buscar");

//   if (specialCharactresTypeRegex.test(name)) {
//     throw new Error("Debes ingresar un nombre valido");
//   }
//   // Guardamos los datos de la API/DB en data
//   const data = await getApiDb();
//   if (!data) throw new Error("No hay info");

//   //Transformo todo a minuscula
//   let findDog = data.filter((dog) =>
//     dog.name.toLowerCase().includes(name.toLowerCase())
//   );

//   if (!findDog.length) throw new Error("No se pudo encontrar");

//   return findDog;
// }
