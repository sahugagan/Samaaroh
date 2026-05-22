import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: token missing",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: payload.id,
      role: payload.role || "user",
      email: payload.email || "",
      name: payload.name || "",
    };
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: invalid or expired token",
    });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden: admin access required",
    });
  }
  return next();
};
