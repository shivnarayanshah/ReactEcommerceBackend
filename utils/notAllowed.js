export const not_allowed = (req, res) => {
  return res.status(405).json({ message: "method not allowed" });
};
