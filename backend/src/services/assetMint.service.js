const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Create a new asset mint record
 * @param {Object} assetMintData
 * @returns {Promise<AssetMint>}
 */
const createAssetMint = async (assetMintData) => {
  try {
    const mintModel = await prisma.assetMint.create({
      data: assetMintData,
    });
    console.log('Asset mint record created:', mintModel);
    return mintModel;
  } catch (error) {
    console.error('Error creating asset mint record:', error);
    throw error;
  }
};

/**
 * Find an asset mint record by gsAssetId
 * @param {string} gsAssetId
 * @returns {Promise<AssetMint | null>}
 */
const findAssetMintByGsAssetId = async (gsAssetId) => {
  try {
    const mintModel = await prisma.assetMint.findUnique({
      where: { gsAssetId },
    });
    return mintModel;
  } catch (error) {
    console.error('Error finding asset mint record:', error);
    throw error;
  }
};

/**
 * Update the status of an asset mint record
 * @param {string} id
 * @param {AssetMintStatus} status
 * @returns {Promise<AssetMint>}
 */
const updateAssetMintStatus = async (id, status) => {
  try {
    const updatedMintModel = await prisma.assetMint.update({
      where: { id },
      data: { status },
    });
    return updatedMintModel;
  } catch (error) {
    console.error('Error updating asset mint status:', error);
    throw error;
  }
};

module.exports = {
  createAssetMint,
  findAssetMintByGsAssetId,
  updateAssetMintStatus,
};
