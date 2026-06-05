const proposalService = require("../services/proposalService");

const sendSuccess = (res, statusCode, message, data) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendError = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

const createProposal = async (req, res) => {
  try {
    const proposal = await proposalService.createProposal(req.body);

    sendSuccess(res, 201, "Propuesta registrada correctamente", proposal);
  } catch (error) {
    sendError(res, 400, error.message);
  }
};

const getProposals = async (req, res) => {
  try {
    const proposals = await proposalService.getProposals();

    sendSuccess(res, 200, "Propuestas obtenidas correctamente", proposals);
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const getProposalById = async (req, res) => {
  try {
    const proposal = await proposalService.getProposalById(req.params.id);

    sendSuccess(res, 200, "Propuesta obtenida correctamente", proposal);
  } catch (error) {
    sendError(res, 404, error.message);
  }
};

const publishProposal = async (req, res) => {
  try {
    const proposal = await proposalService.publishProposal(req.params.id);

    sendSuccess(res, 200, "Propuesta publicada correctamente", proposal);
  } catch (error) {
    sendError(res, 400, error.message);
  }
};

const signProposal = async (req, res) => {
  try {
    const proposal = await proposalService.signProposal(req.params.id, req.body);

    sendSuccess(res, 200, "Firma registrada correctamente", proposal);
  } catch (error) {
    sendError(res, 400, error.message);
  }
};

const simulateGoal = async (req, res) => {
  try {
    const proposal = await proposalService.simulateGoal(req.params.id);

    sendSuccess(res, 200, "Meta de 25,000 firmas simulada correctamente", proposal);
  } catch (error) {
    sendError(res, 400, error.message);
  }
};

const freezeExpedient = async (req, res) => {
  try {
    const proposal = await proposalService.freezeExpedient(req.params.id);

    sendSuccess(res, 200, "Expediente congelado correctamente", proposal);
  } catch (error) {
    sendError(res, 400, error.message);
  }
};

const sendToCongress = async (req, res) => {
  try {
    const proposal = await proposalService.sendToCongress(req.params.id);

    sendSuccess(res, 200, "Expediente enviado al Congreso correctamente", proposal);
  } catch (error) {
    sendError(res, 400, error.message);
  }
};

module.exports = {
  createProposal,
  getProposals,
  getProposalById,
  publishProposal,
  signProposal,
  simulateGoal,
  freezeExpedient,
  sendToCongress,
};