class SignatureValidationAdapter {
  validateSignature(signatureData) {
    const externalResponse = this.simulateExternalProvider(signatureData);
    return this.adaptResponse(externalResponse);
  }

  simulateExternalProvider(signatureData) {
    if (!signatureData || !signatureData.citizenId) {
      return {
        code: "INVALID",
        valid: false,
        message: "Datos del ciudadano incompletos",
      };
    }

    if (signatureData.forceInvalid) {
      return {
        code: "INVALID",
        valid: false,
        message: "Firma digital inválida",
      };
    }

    return {
      code: "OK",
      valid: true,
      message: "Firma digital validada por proveedor externo simulado",
    };
  }

  adaptResponse(externalResponse) {
    return {
      isValid: externalResponse.valid,
      message: externalResponse.message,
      providerCode: externalResponse.code,
      validatedAt: new Date(),
    };
  }
}

module.exports = SignatureValidationAdapter;