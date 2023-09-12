const { db } = require("./config/database");
const Sequelize = require("sequelize");
const path = require("path");
const Umzug = require("umzug");
//const db = require('./config/database');

var migrationsConfig = {
  migrations: {
    params: [db.getQueryInterface(), Sequelize],
    path: path.join(__dirname, "database/migrations"), // path to folder containing migrations
  },
  storage: "sequelize",
  storageOptions: {
    sequelize: db,
    // modelName: 'SequelizeMeta' // No need to specify, because this is default behaviour
  },
};

var seedsConfig = {
  storage: "sequelize",
  storageOptions: {
    sequelize: db,
    modelName: "SequelizeData", // Or whatever you want to name the seeder storage table
  },
  migrations: {
    params: [db.getQueryInterface(), Sequelize],
    path: path.join(__dirname, "database/seeders"), // path to folder containing seeds
  },
};

var migrator = new Umzug(migrationsConfig);
var seeder = new Umzug(seedsConfig);

(async () => {
  // checks migrations and run them if they are not already applied
  try {
    await migrator.up().then(() => seeder.up());
    console.log("All migrations performed successfully");
  } catch (error) {
    console.log("Migrations executed with errors... check this!");
  }
})();