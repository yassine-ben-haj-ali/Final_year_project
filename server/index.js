const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const path = require("path");

const Auth = require("./routes/Auth");
const Doctor = require("./routes/Doctor");
const Patient = require("./routes/Patient");
const Conversation = require("./routes/Conversation");
const Message = require("./routes/Message");
const Admin = require("./routes/Admin");
const Notification = require("./routes/Notification");
const Allergy = require("./routes/Allergy");
const Analysis = require("./routes/Analysis");
const Disease = require("./routes/Disease");
const Antecedent = require("./routes/Antecedent");
const Radiography=require("./routes/Radiography");

const realtime = require("./modules/Realtime");

const app = express();

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());
app.use(express.json());
dotenv.config();

mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use("/Assets", express.static(path.join(__dirname, "Assets")));

app.use("/api/auth", Auth);
app.use("/api/profile/doctor", Doctor);
app.use("/api/profile/patient", Patient);
app.use("/api/conversation", Conversation);
app.use("/api/message", Message);
app.use("/api/profile/admin", Admin);
app.use("/api/notification", Notification);

app.use("/api/allergy", Allergy);
app.use("/api/disease", Disease);
app.use("/api/antecedent", Antecedent);
app.use("/api/analysis", Analysis);
app.use("/api/radiography", Radiography);



realtime(io);

server.listen(8800, () => {
  console.log("server connected");
});
