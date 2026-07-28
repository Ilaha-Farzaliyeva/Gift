export const isAdmin = (req, res, next) => {
    if (req.decoded.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }

    next();
};