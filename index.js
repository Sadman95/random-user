const app = require("./app/app");
const userRoute = require("./routes/user-route");

const PORT = 5000;
app.get("/", (_req, res) => {
  res.send(`<ul>
  <li><b><a href="https://random-user-api-gz54.onrender.com/user/random">GET/user/random</a></b> - get a random user</li>
  <li><b><a href="https://random-user-api-gz54.onrender.com/user/all">GET/user/all</a></b>?limit=3 - if query get query users otherwise get all users</li>
  <li><b>POST/user/save</b> - save a new user</li>
  <li><b>PATCH/user/update</b>/:id - update a user</li>
  <li><b>PATCH/user/bulk-update</b> - update multiple users</li>
  <li><b>DELETE/user/delete</b>/:id - delete a user</li>
  </ul>`);
});
app.use("/user", userRoute);
app.use("/*", (_req, res) => {
  res.send({
    message: "Page not found",
  });
});

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});
