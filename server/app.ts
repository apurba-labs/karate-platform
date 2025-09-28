import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';


// Routes
import authRoutes from "@/routes/auth.routes";
import dojoRoutes from "@/routes/dojo.routes";


// Middleware
import { authenticateToken } from "@/middleware/auth.middleware";

export const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());



// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!', timestamp: new Date().toISOString() });
});


app.get("/", (req, res) => {
  res.json({ message: "Scoreboard API running" });
});


// Public routes
app.use("/api/auth", authRoutes);
app.use("/api/dojos", dojoRoutes);
// Protected routes
app.use(authenticateToken);

//app.use("/api/events", eventRoutes);
//app.use("/api/score-types", scoreTypeRoutes);
//app.use("/api/scores", scoreRoutes);
//app.use("/api/matches", matchRoutes);
