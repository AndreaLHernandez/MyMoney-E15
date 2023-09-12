const { PORT } = require("./config/config");
const { db } = require("./config/database");
const { router } = require("./server/routes");
const { job } = require("./server/helpers/updateDate");

const express = require("express");
const cors = require("cors");
const server = express();

server.use(cors());
server.use(express.json({limit: '100mb'}));
server.use("/api/v1", router);
server.use('', express.static(__dirname + "/server/public"));
job.start();
server.use("/views", express.static(__dirname + "/views"));

db.sync().then(async () => {
  server.listen(PORT, () => console.log(`server is running at ${PORT} `));
});
