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
                  msg: "Name existe",
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
          console.log(err);
          res.status(400).send(err);
        });
    }
  }
);

// get Product list by assigned
// router.get("/:id", AuthMiddleware, (req, res) => {
//   console.log(req.userId);
//   Product.find(req.params.id)
//     .then((products) => res.send(products))
//     .catch((err) => console.log(err.message));
// });
//get products by owner
// get Product list by assigned
router.get("/owner", AuthMiddleware, (req, res) => {
  console.log("req.userId", req.userId);
  Product.find({ owner: req.userId })
    .then((products) => res.send(products))
    .catch((err) => console.log(err.message));
});

module.exports = router;
