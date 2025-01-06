const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors")

const app = express();
const PORT = 3000

app.use("/api/v1", rootRouter);
app.use(cors())
app.use(express.json())

app.listen(PORT, ()=>{
    console.log("Server is running", PORT)
})