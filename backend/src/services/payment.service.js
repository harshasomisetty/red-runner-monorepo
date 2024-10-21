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

/**
 * Find a payment record by paymentId
 * @param {string} paymentId
 * @returns {Promise<Payment | null>}
 */
const findPaymentByPaymentId = async (paymentId) => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { paymentId },
    });
    return payment;
  } catch (error) {
    console.error('Error finding payment record:', error);
    throw error;
  }
};

/**
 * Update a payment record
 * @param {string} id
 * @param {Object} updateData
 * @returns {Promise<Payment>}
 */
const updatePayment = async (id, updateData) => {
  try {
    const updatedPayment = await prisma.payment.update({
      where: { id },
      data: updateData,
    });
    return updatedPayment;
  } catch (error) {
    console.error('Error updating payment record:', error);
    throw error;
  }
};

module.exports = {
  createPayment,
  getPaymentByPaymentId,
  findPaymentByPaymentId,
  updatePayment,
};
