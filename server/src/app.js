const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(helmet());
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, origin || "*");
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

///////////////  route middleware
const UserRoutes = require("./routes/user.routes");
const TaskRoutes = require("./routes/task.routes");

/////////////  route
app.use("/api/user", UserRoutes);
app.use("/api/task", TaskRoutes);

const healthRoutes = require("./routes/health.routes");

// ✅ Health check route
app.use("/api/health", healthRoutes);

// Error Middleware
const { notFound, errorHandler } = require("./middlewares/error.middleware");
// 404 Not Found handler (after all routes)
app.use(notFound);
// General Error handler
app.use(errorHandler);

module.exports = app;
