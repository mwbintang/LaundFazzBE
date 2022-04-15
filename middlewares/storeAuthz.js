const { Store } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { StoreId } = req.store;

    const auth = await Store.findByPk(StoreId);
    if (!auth) {
      throw { name: "storeAuthz Failed" };
    }

    if (auth.id !== StoreId) {
      throw { name: "storeAuthz Failed" }
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
