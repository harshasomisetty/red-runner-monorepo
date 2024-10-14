const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { leaderboardService } = require('../services');

const AddLeaderboardEntry = catchAsync(async (req, res) => {
  const leaderboardEntry = await leaderboardService.AddLeaderboardEntry(req.body.userId, req.body.score);
  res.status(httpStatus.CREATED).send(leaderboardEntry);
});

const GetLeaderBoardEntries = catchAsync(async (req, res) => {
  const user = await leaderboardService.GetLeaderboard();
  res.status(httpStatus.OK).send(user);
});

const GetLeaderBoardEntriesNoAuth = catchAsync(async (req, res) => {
  const user = await leaderboardService.GetLeaderboard();
  res.status(httpStatus.OK).send(user);
});

const GetRelativeRanks = catchAsync(async (req, res) => {
  const rankEntries = await leaderboardService.GetRelativeRank(req.body.userId);
  res.status(httpStatus.OK).send(rankEntries);
});

module.exports = {
  AddLeaderboardEntry,
  GetLeaderBoardEntries,
  GetLeaderBoardEntriesNoAuth,
  GetRelativeRanks,
};
