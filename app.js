const express = require("express");
const app = express();

app.use(express.json());
const quizRouter = require("./routes/info");
app.use("/quiz", quizRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port${port}`);
});
