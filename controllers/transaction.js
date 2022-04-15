const { Transaction } = require("../models");

class Controller {
  static async addTransaction(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { CustomerId, StoreId, pickupDate, location } = req.body;
      let newTransaction = await Transaction.create(
        {
          CustomerId,
          StoreId,
          pickupDate,
          location,
        },
        { transaction: t }
      );

      await t.commit();
      res.status(201).json(newTransaction);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async getTransactions(req, res, next) {
    try {
      const transactions = await Transaction.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      res.status(200).json(transactions);
    } catch (error) {
      next(error);
    }
  }

  static async getTransactionById(req, res, next) {
    try {
      const { transactionId } = req.params;
      const transaction = await Transaction.findOne({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          id: transactionId,
        },
      });
      if (!transaction) {
        throw {
          name: "transactionNotFound",
        };
      }
      res.status(200).json(transaction);
    } catch (error) {
      next(error);
    }
  }

  static async editTransaction(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { pickupDate, deliveryDate, location, status, isPaid } = req.body;
      const { transactionId } = req.params;
      let transaction = await Transaction.create(
        {
          pickupDate,
          deliveryDate,
          location,
          status,
          isPaid,
        },
        {
          where: {
            id: transactionId,
          },
          returning: true,
          transaction: t,
        }
      );

      await t.commit();
      res.status(200).json({
        message: "Transaction updated",
        transaction: transaction[1][0],
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async deleteTransaction(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { transactionId } = req.params;

      const transaction = await Transaction.findByPk(transactionId)

      if (!transaction) {
        throw {name : "transactionNotFound"}
      }

      await Transaction.destroy({
        where: {
          id: transactionId,
        },
        transaction: t,
      });

      await t.commit();
      res.status(200).json({ message: `Transaction Deleted` });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

module.exports = Controller;
