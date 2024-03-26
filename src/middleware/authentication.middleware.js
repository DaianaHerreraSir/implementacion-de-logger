
const authorization = roleArray => {
    return (req, res, next) => {
        if (roleArray[0] === "PUBLIC") return next();

        if (!req.user) return res.status(401).json({ status: "error", error: "Unauthorized" });

        if (!roleArray.includes(req.user.role)) return res.status(401).json({ status: "error", error: "Not permissions" });

        // Asegúrate de que req.user incluya el ID del usuario
        const userId = req.user._id;
        req.looger.info("User ID:", userId);

        next();
    };
};
export default authorization