import Product from "../models/productModel.js";
import fs from "fs";

export const getAllproducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const isExist = await Product.findById(id);
    if (!isExist)
      return res.status(400).json({ message: "product does not exist" });
    fs.unlink(`./uploads${isExist.image}`, async (err) => {
      if (err) return res.status(400).json({ messgage: `${err}` });
      await Product.findByIdAndDelete(id);
      return res.status(200).json({ message: "product successfully removed" });
    });
  } catch (err) {
    return res.status(400).json({ messgage: `${err}` });
  }
};

export const updateProduct = async (req, res) => {
  const { title, description, price, category, brand, image } = req.body ?? {};
  const { id } = req.params;
  try {
    const isExist = await Product.findById(id);
    if (!isExist)
      return res.status(400).json({ message: "product does not exist" });
    isExist.title = title || isExist.title;
    isExist.description = description || isExist.description;
    isExist.price = price || isExist.price;
    isExist.category = category || isExist.category;
    isExist.brand = brand || isExist.brand;
    if (image)
      fs.unlink(`./uploads${isExist.image}`, (err) => {
        if (err) return res.status(400).json({ messgage: `${err}` });
      });
    isExist.image = image || isExist.image;
    await isExist.save();
    return res.status(200).json({ message: "product successfully updated" });
  } catch (err) {
    return res.status(400).json({ messgage: `${err}` });
  }
};

export const addProduct = async (req, res) => {
  const { title, description, price, category, image, brand } = req.body;
  try {
    await Product.create({
      title,
      description,
      price,
      category,
      image,
      brand,
    });
    return res.status(200).json({ message: "product successfully added" });
  } catch (error) {
    fs.unlink(`./uploads${image}`, (err) => {
      if (err) return res.status(400).json({ messgage: `${err}` });
      return res.status(400).json({ messgage: `${error}` });
    });
  }
};
