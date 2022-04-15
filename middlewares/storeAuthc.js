const { verifyToken } = require("../helpers/jwt");
const { Store } = require("../models");

let authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = verifyToken(access_token);

    const store = await Store.findByPk(payload.StoreId);
    if (!store) {
      throw {
        name: `storeAuthc Failed`,
      };
    }

    req.store = {
      StoreId: store.id,
      email: store.email,
      address: store.address,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
