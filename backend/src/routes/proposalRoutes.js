const express = require("express");

const proposalController = require("../controllers/proposalController");

const router = express.Router();

router.post("/", proposalController.createProposal);
router.get("/", proposalController.getProposals);
router.get("/:id", proposalController.getProposalById);

router.post("/:id/publish", proposalController.publishProposal);
router.post("/:id/sign", proposalController.signProposal);
router.post("/:id/simulate-goal", proposalController.simulateGoal);
router.post("/:id/freeze", proposalController.freezeExpedient);
router.post("/:id/send", proposalController.sendToCongress);

module.exports = router;