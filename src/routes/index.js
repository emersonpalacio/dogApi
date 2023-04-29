const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const dogRouter = require("./dogs");
const temperamentRouter = require("./temperamentRouter");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogRouter);
router.use("/temperament", temperamentRouter);

module.exports = router;
