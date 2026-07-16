import { categoryModel } from "../models/categoryModel.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.send(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getByIdCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    res.send(category);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createCategory = async (req, res) => {
  try {
    const newCategory = new categoryModel(req.body);
    await newCategory.save();
    res.send(newCategory);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateByIdCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await categoryModel.findByIdAndUpdate(id, req.body, { new: true });
    res.send(updated);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteByIdCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.send("Category deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
};