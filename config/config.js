require("dotenv").config(); // Módulo que carga variables de entorno desde un archivo .env a process.env

//Sustituir valores de host, user, name, password con los process.env una vez que tengamos el archivo .env con los valores a sustituir
module.exports = {
  PORT: process.env.PORT || 5000,
  URL_FRONTEND: process.env.URL_FRONTEND,
  OL_EMAIL:process.env.OL_EMAIL,
  OL_PASS:process.env.OL_PASS,
  
  
  URL_HEROKU:process.env.URL_HEROKU,
  DB: {
    PORT: process.env.PORT || 5432,
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    NAME: process.env.DB_NAME,
    PASSWORD: process.env.DB_PASSWORD,
    ENV: process.env.ENV || "development",
    DIALECT: "postgres",
  },
  
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_TIME: process.env.JWT_ACCESS_TIME,
  JWT_REFRESH_TIME: process.env.JWT_REFRESH_TIME

  


};

