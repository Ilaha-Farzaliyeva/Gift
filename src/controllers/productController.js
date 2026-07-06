import { productModel } from "../models/productModel.js";


export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({})
    // .populate("categoryID")
    res.send(products);
  }
  catch (error) {
    res.status(500).send(error.message)
  }
};
export const getByIdProducts = async (req, res) => {
  try {
    const { id } = req.params
    const product = await productModel.findById(id)
    // .populate("categoryID")
    res.send(product);
  }
  catch (error) {
    res.status(500).send(error.message)
  }
};
export const createProducts = async (req, res) => {
  try {
    const newProduct = new productModel(req.body)
    await newProduct.save()
    res.send(newProduct);
  }
  catch (error) {
    res.status(500).send(error.message)
  }
};
export const updateByIdProducts = async (req, res) => {
  try {
    const { id } = req.params
    const product = await productModel.findByIdAndUpdate(id, req.body, { new: true })
    res.send(product);
  }
  catch (error) {
    res.status(500).send(error.message)
  }
};
export const deleteByIdProducts = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id)
    res.send("Deleted");
  }
  catch (error) {
    res.status(500).send(error.message)
  }
};

