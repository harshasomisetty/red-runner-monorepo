const { PrismaClient } = require('@prisma/client');
const { PaymentStatus } = require('../utils/staticData');

const prisma = new PrismaClient();

const createPayment = async (paymentData) => {
  return prisma.payment.create({
    data: paymentData,
  });
};

const getPaymentByPaymentId = async (paymentId) => {
  return prisma.payment.findUnique({
    where: { paymentId },
  });
};

module.exports = {
  createPayment,
  getPaymentByPaymentId,
};
