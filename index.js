const app = require("./app/app");
const userRoute = require("./routes/user-route");

const PORT = 5000;

app.use("/user", userRoute);
app.use("/*", (_req, res) => {
  res.send({
    message: "Page not found",
  });
});

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});
