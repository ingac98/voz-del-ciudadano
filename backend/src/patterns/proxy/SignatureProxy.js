class SignatureProxy {
  constructor(signatureValidator) {
    this.signatureValidator = signatureValidator;
  }

  canSign(proposal, signatureData) {
    if (!proposal) {
      throw new Error("La propuesta no existe");
    }

    if (proposal.status !== "activa") {
      throw new Error("Solo se pueden firmar propuestas activas");
    }

    const alreadySigned = proposal.signatures.some(
      (signature) => signature.citizenId === signatureData.citizenId
    );

    if (alreadySigned) {
      throw new Error("El ciudadano ya firmó esta propuesta");
    }

    const validationResult = this.signatureValidator.validateSignature(signatureData);

    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    return validationResult;
  }
}

module.exports = SignatureProxy;