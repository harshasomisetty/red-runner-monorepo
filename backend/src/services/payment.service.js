const { PrismaClient } = require('@prisma/client');
const { PaymentStatus } = require('../utils/staticData');

const prisma = new PrismaClient();

const createPayment = async (paymentData) => {
  return prisma.payment.create({
    data: {
      userId: paymentData.userId,
      paymentId: paymentData.paymentId,
      itemId: paymentData.itemId,
      status: PaymentStatus.PENDING,
      consentUrl: paymentData.consentUrl,
      isAutoMinted: paymentData.isAutoMinted,
    },
  });
};

module.exports = {
  createPayment,
};
