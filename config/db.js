const mongoose = require("mongoose");

mongoose.
   connect(`mongodb+srv://mobile-app:${process.env.DB_USER_PASS}@mobile-app.womj8.mongodb.net/db-mobileapp`,
      {
         useUnifiedTopology: true,
      }
   )
   .then(() => console.log("Connected to mongoDB"))
   .catch((err) => console.log("Failed to connect to mongoDB", err));