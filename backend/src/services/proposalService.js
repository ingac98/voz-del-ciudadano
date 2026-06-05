const Proposal = require("../models/Proposal");

const SignatureValidationAdapter = require("../patterns/adapter/SignatureValidationAdapter");
const SignatureProxy = require("../patterns/proxy/SignatureProxy");
const LegislativeProcessFacade = require("../patterns/facade/LegislativeProcessFacade");

const signatureValidator = new SignatureValidationAdapter();
const signatureProxy = new SignatureProxy(signatureValidator);
const legislativeProcessFacade = new LegislativeProcessFacade();

const createProposal = async (proposalData) => {
  const proposal = await Proposal.create({
    ...proposalData,
    status: "borrador",
    audit: [
      {
        action: "PROPUESTA_CREADA",
        detail: "La propuesta normativa fue registrada en estado borrador",
      },
    ],
  });

  return proposal;
};

const getProposals = async () => {
  return Proposal.find().sort({ createdAt: -1 });
};

const getProposalById = async (proposalId) => {
  const proposal = await Proposal.findById(proposalId);

  if (!proposal) {
    throw new Error("Propuesta no encontrada");
  }

  return proposal;
};

const publishProposal = async (proposalId) => {
  const proposal = await getProposalById(proposalId);

  if (proposal.status !== "borrador") {
    throw new Error("Solo se pueden publicar propuestas en estado borrador");
  }

  proposal.status = "activa";
  proposal.publishedAt = new Date();

  proposal.audit.push({
    action: "PROPUESTA_PUBLICADA",
    detail: "La propuesta fue publicada y comenzó el plazo de 90 días",
  });

  await proposal.save();
  return proposal;
};

const signProposal = async (proposalId, signatureData) => {
  const proposal = await getProposalById(proposalId);

  const validationResult = signatureProxy.canSign(proposal, signatureData);

  proposal.signatures.push({
    citizenId: signatureData.citizenId,
    citizenName: signatureData.citizenName || "Ciudadano anónimo",
    isValid: validationResult.isValid,
    validationMessage: validationResult.message,
    signedAt: new Date(),
  });

  proposal.validSignaturesCount = proposal.signatures.filter(
    (signature) => signature.isValid
  ).length;

  proposal.audit.push({
    action: "FIRMA_REGISTRADA",
    detail: `Firma registrada para el ciudadano ${signatureData.citizenId}`,
  });

  await proposal.save();
  return proposal;
};

const simulateGoal = async (proposalId) => {
  const proposal = await getProposalById(proposalId);

  if (proposal.status !== "activa") {
    throw new Error("Solo se puede simular la meta en propuestas activas");
  }

  proposal.validSignaturesCount = 25000;

  proposal.audit.push({
    action: "META_SIMULADA",
    detail: "Se simuló el cumplimiento de 25,000 firmas válidas para fines académicos",
  });

  await proposal.save();
  return proposal;
};

const freezeExpedient = async (proposalId) => {
  const proposal = await getProposalById(proposalId);

  const frozenProposal = legislativeProcessFacade.freezeExpedient(proposal);

  await frozenProposal.save();
  return frozenProposal;
};

const sendToCongress = async (proposalId) => {
  const proposal = await getProposalById(proposalId);

  const sentProposal = legislativeProcessFacade.sendToCongress(proposal);

  await sentProposal.save();
  return sentProposal;
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