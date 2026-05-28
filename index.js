const express = require("express");
const mongoose = require("mongoose");

//Allow our backend application to be available to our frontend application
//Allows us to controll the app's Cross Origin Resource Sharing Settings
const cors = require("cors");


//Routes Middleware
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());

const corsOptions = {

	origin: ['*'],
	credentials: true,
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

const dbURI ="mongodb://admin:admin@ac-nhnqynh-shard-00-00.u1egopy.mongodb.net:27017,ac-nhnqynh-shard-00-01.u1egopy.mongodb.net:27017,ac-nhnqynh-shard-00-02.u1egopy.mongodb.net:27017/Course-Booking-API?ssl=true&replicaSet=atlas-55fz2g-shard-0&authSource=admin&appName=Batch610";

mongoose.connect(dbURI);

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))


app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = {app,mongoose};