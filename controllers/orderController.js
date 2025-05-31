import Orders from "../models/orderModel.js";

export const getOrders = async (req, res) => {
  try {
    if (req.role === "Admin") {
      const response = await Orders.find({});

      return res.status(200).json(response);
    } else {
      const response = await Orders.find({ userId: req.userId }).select(
        "-orderItems"
      );
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(400).json({
      message: `${error}`,
    });
  }
};

export const getOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Orders.findById(id);
    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};

export const createOrder = async (req, res) => {
  const { totalAmount, orderItems } = req.body;
  try {
    const order = {
      userId: req.userId,
      orderItems,
      totalAmount,
    };

    await Orders.create(order);
    return res.status(200).json({
      message: "Order created successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      message: `${error}`,
    });
  }
};
