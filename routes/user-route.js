const router = require("express").Router();
const usersController = require("../controllers/user-controller");

router.get("/all", usersController.getUsers);
router.post("/save", usersController.postUser);
router.patch("/update/:id", usersController.patchUser);
router.delete("/delete/:id", usersController.deleteUser);
router.patch("/bulk-update", usersController.bulkUpdate);
router.get("/random", usersController.getRandomUser);

module.exports = router;
