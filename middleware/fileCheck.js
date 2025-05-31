import { v4 as uuidv4 } from "uuid";

const valid_images = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export const file_check = (req, res, next) => {
  const file = req.files?.image;
  if (!file || !valid_images.includes(file?.mimetype)) {
    return res.status(400).json({ message: "invalid image" });
  } else {
    const filePath = `/${uuidv4()}-${file?.name}`;
    file.mv(`./uploads${filePath}`, (err) => {
      if (err) return res.status(500).json({ message: err });
      req.body.image = filePath;
      return next();
    });
  }
};

export const update_file_check = (req, res, next) => {
  const file = req.files?.image;
  if (!file) return next();
  if (!valid_images.includes(file?.mimetype)) {
    return res.status(400).json({ message: "invalid image" });
  } else {
    const filePath = `/${uuidv4()}-${file?.name}`;
    file.mv(`./uploads${filePath}`, (err) => {
      if (err) return res.status(500).json({ message: err });
      req.body.image = filePath;
      return next();
    });
  }
};
