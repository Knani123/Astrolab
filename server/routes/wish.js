const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../helpers/authMidlewar");
const { body, validationResult } = require("express-validator");
const Wish = require("../models/Wish");

//create Wish
router.post(
  "/",
  [
    AuthMiddleware,
    [
      body("name", "Name is empty,enter wishlist name! ")
        .notEmpty()
        .isLength({ min: 2, max: 20 }),
    ],
  ],

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    } else {
      Wish.find({ name: req.body.name })
        .then((wish) => {
          if (wish.length && wish[0].owner == req.userId) {
            return res.status(400).send({
              errors: [
                {
                  msg: "Name already used,. Please try another",
                },
              ],
            });
          } else {
            let newWish = new Wish({
              ...req.body,
              owner: req.userId,
            });
            newWish
              .save()
              .then((data) => res.status(200).send(data))
              .catch((err) => console.log(err.message));
          }
        })
        .catch((err) => res.status(400).send(err));
    }
  }
);

//get user wishs
router.get("/", AuthMiddleware, (req, res) => {
  Wish.find({ owner: req.userId })
    .then((wishs) => res.send(wishs))
    .catch((err) => console.log(err.message));
});

//delet wish by id
router.delete("/:id", AuthMiddleware, (req, res) => {
  Wish.deleteOne({ _id: req.params.id })
    .then(() => res.send({ msg: "Your Wishlist is deleted" }))
    .catch((err) => console.log(err.message));
});

//Edit Product
router.put("/:id", AuthMiddleware, (req, res) => {
  Wish.find({ name: req.body.name }).then((wish) => {
    if (wish.length && wish[0]._id != req.params.id) {
      return res.status(400).send({
        errors: [
          {
            msg: "Name already  used. Please try another . ",
          },
        ],
      });
    } else {
      Wish.findByIdAndUpdate(
        req.params.id,
        { $set: { ...req.body } },
        (err, data) => {
          if (err) {
            return res.send(500).send({ msg: "Server Errors" });
          } else {
            Wish.findById(req.params.id)
              .then((wish) => {
                res.status(200).send(wish);
              })
              .catch((err) => {
                res.send(500).send({ msg: "Server Errors" });
              });
          }
        }
      );
    }
  });
});
module.exports = router;
