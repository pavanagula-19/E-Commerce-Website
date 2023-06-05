const app = require("./app");
const dotenv = require('dotenv');
const connectDatabase = require("./config/database");

//config 
dotenv.config({path: "backend/config/.env"});

//connect to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
  });

  //Unhandle Promise Rejection 
  process.on("unhandledRejection", err=>{
    console.log(`Error, ${err.message}`);
    console.log("shutting down server due to unhandled promise rejection");
    server.close(()=>{
      process.exit(1);
    })
  })