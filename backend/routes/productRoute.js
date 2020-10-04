import express from 'express';
import Product from '../models/productModel';
import { isAdmin, isAuth } from '../util';

const router = express.Router();

router.get('/', (req, res) => {
  Product.find({}).then((products) => res.send(products));
});

router.get('/:id', (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => res.send(product))
    .catch((err) => res.status(404).send({ message: '' }));
});

router.post('/', isAuth, isAdmin, (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });

  product
    .save()
    .then((newProduct) =>
      res.status(201).send({ message: 'New Product Created', newProduct })
    )
    .catch((err) => res.send({ message: 'Error in Creating Product.' }));
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  Product.findOne({ _id: productId })
    .then((product) => {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;

      product
        .save()
        .then((updatedProduct) =>
          res
            .status(200)
            .send({ message: 'Product Updated', data: updatedProduct })
        );
    })
    .catch((err) =>
      res.status(500).send({ message: 'Error in Updating Product.' })
    );
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  Product.findById(req.params.id)
    .then((deletedProduct) => {
      deletedProduct
        .remove()
        .then(() => res.send({ message: 'Product Deleted' }));
    })
    .catch((error) => res.send('Error in Deletion.'));
});

export default router;
