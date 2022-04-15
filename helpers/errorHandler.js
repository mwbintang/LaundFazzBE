function errorHandler(err, req, res, next) {
  console.log(err.name, err, "ERROR HANDLER");

  let errors = [];
  switch (err.name) {
    case "SequelizeValidationError":
      err.errors.forEach((e) => {
        errors.push(e.message);
      });
      res.status(400).json({ Error: errors });
      errors = [];
      break;
    case "SequelizeUniqueConstraintError":
      err.errors.forEach((e) => {
        errors.push(e.message);
      });
      res.status(400).json({ Error: errors });
      errors = [];
      break;
    case "JsonWebTokenError":
      res.status(401).json({ Error: "Invalid token" });
      break;
    case "TokenExpiredError":
      res.status(401).json({ Error: "Token expired" });
      break;
    case "customerAuthc Failed":
      res.status(401).json({ Error: "Invalid token or customer" });
      break;
    case "storeAuthc Failed":
      res.status(401).json({ Error: "Invalid token or store" });
      break;
    case "storeAuthz Failed":
      res.status(403).json({ Error: "Forbidden to modify item" });
      break;
    case "customerAuthz Failed":
      res.status(403).json({ Error: "Forbidden to modify item" });
      break;
    default:
      res.status(500).json({ Error: "Internal server error" });
      break;
  }
}

module.exports = errorHandler;
