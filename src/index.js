import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import APIrouter from "./routes/API-gatway.js";
import entityManager from "./modal/entityManager.js";
import { connectDB } from "./config/database.js";
import session from "express-session";
import passport from "passport";
import "./utils/passportSetup.js";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

// Session setup (needed for OAuth)
app.use(session({
   secret: "d9299145be01fc3f8cb9fccf4515bbf9175164dbdda0151b26ae590875b0f83f",
   resave: false,
   saveUninitialized: false,
   cookie: { secure: false }, // Set to true if using HTTPS
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", APIrouter);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
   await connectDB(); // Connect to database and show message
   new entityManager(); // Create tables
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
