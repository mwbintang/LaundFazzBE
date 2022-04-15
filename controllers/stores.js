const { Store } = require("../models");
const { signToken } = require("../helpers/jwt");
const { compare } = require("../helpers/bcrypt");

class Controller {
  static async register(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { email, password, name, location } = req.body;
      let newStore = await Store.create(
        {
          email,
          password,
          name,
          location,
        },
        { transaction: t }
      );

      await t.commit();
      res.status(201).json(newStore);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw { name: "storeLogin noInput" };

      let store = await Store.findOne({
        where: {
          email: email,
        },
      });

      if (!store) {
        throw {
          name: "storeLogin Failed",
        };
      }

      const comparePassword = compare(password, store.password);

      if (!comparePassword) {
        throw {
          name: "storeLogin Failed",
        };
      }

      const payload = {
        StoreId: store.id,
        email: store.email,
        address: store.address,
      };

      const token = signToken(payload);

      res.status(200).json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }

  static async profile(req, res, next) {
    try {
      const { StoreId } = req.store;
      const store = await Store.findOne({
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        where: {
          id: StoreId,
        },
      });
      if (!store) {
        throw {
          name: "storeNotFound",
        };
      }
      res.status(200).json(store);
    } catch (error) {
      next(error);
    }
  }

  static async deleteStore(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { StoreId } = req.store;
      const store = await Store.destroy({
        where: {
          id: StoreId
        },
        transaction: t
      });

      await t.commit();
      res.status(200).json({ message: `Store Deleted` });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

module.exports = Controller;
