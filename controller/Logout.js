export const Logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
