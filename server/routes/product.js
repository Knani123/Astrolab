const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../helpers/authMidlewar");
const { body, validationResult } = require("express-validator");
const Product = require("../models/Product");

//create Product
router.post(
  "/",
  [
    AuthMiddleware,
    [
      body("name", "Name is empty! ").notEmpty().isLength({ min: 2, max: 20 }),
      body("descriptions", "descriptions is empty! ").notEmpty(),
      body("status", "status is empty! ").notEmpty(),
      body("assignedTo", "Wishlist is empty! ").notEmpty(),
      body("price", "price must be numeric and not empty! ").isNumeric(),
    ],
  ],

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    } else {
      Product.find({ name: req.body.name })
        .then((product) => {
          if (product.length && product[0].owner == req.userId) {
            return res.status(400).send({
              errors: [
                {
                  msg: "Name already used ",
                },
              ],
            });
          } else {
            let newProduct = new Product({
              ...req.body,
              owner: req.userId,
            });
            newProduct
              .save()
              .then((data) => res.status(200).send(data))
              .catch((err) => console.log(err.message));
          }
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  }
);

// get Product list by assigned
router.get("/owner", AuthMiddleware, (req, res) => {
  Product.find({ owner: req.userId })
    .select("-password -__v")
    .then((products) => res.send(products))
    .catch((err) => console.log(err.message));
});

//delete Product by id
router.delete("/:id", AuthMiddleware, (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.send({ msg: "Your Product is deleted" }))
    .catch((err) => console.log(err.message));
});

//Edit Product
router.put("/:id", AuthMiddleware, (req, res) => {
  console.log(req.body.name);
  Product.find({ name: req.body.name }).then((product) => {
    if (product.length && product[0]._id != req.params.id) {
      return res.status(400).send({
        errors: [
          {
            msg: "Name already  used. Please try another . ",
          },
        ],
      });
    } else {
      Product.findByIdAndUpdate(
        req.params.id,
        { $set: { ...req.body } },
        (err, data) => {
          if (err) {
            return res.send(500).send({ msg: "Server Errors" });
          } else {
            Product.findById(req.params.id)
              .then((porduct) => {
                res.status(200).send(porduct);
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
