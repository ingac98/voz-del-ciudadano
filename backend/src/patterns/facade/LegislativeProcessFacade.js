const generateHash = require("../../utils/generateHash");
const {
  ExpedientElement,
  ExpedientComposite,
} = require("../composite/ExpedientComposite");

class LegislativeProcessFacade {
  buildExpedient(proposal) {
    const expedient = new ExpedientComposite();

    expedient.addElement(
      new ExpedientElement("PROPUESTA_NORMATIVA", {
        title: proposal.title,
        description: proposal.description,
        normativeText: proposal.normativeText,
        justification: proposal.justification,
        category: proposal.category,
      })
    );

    expedient.addElement(
      new ExpedientElement("FIRMAS_VALIDAS", {
        total: proposal.validSignaturesCount,
        signatures: proposal.signatures,
      })
    );

    expedient.addElement(
      new ExpedientElement("COMENTARIOS", proposal.comments)
    );

    expedient.addElement(
      new ExpedientElement("MODIFICACIONES", proposal.modifications)
    );

    expedient.addElement(
      new ExpedientElement("RECURSOS", proposal.resources)
    );

    return expedient.getElements();
  }

  freezeExpedient(proposal) {
    if (proposal.validSignaturesCount < 25000) {
      throw new Error("La propuesta no alcanza las 25,000 firmas válidas");
    }

    if (proposal.status !== "activa") {
      throw new Error("Solo se pueden congelar propuestas activas");
    }

    const elements = this.buildExpedient(proposal);
    const hash = generateHash(elements);

    proposal.status = "congelada";
    proposal.expedient = {
      elements,
      hash,
      frozenAt: new Date(),
      sentAt: null,
    };

    proposal.audit.push({
      action: "EXPEDIENTE_CONGELADO",
      detail: `Expediente congelado con hash ${hash}`,
    });

    return proposal;
  }

  sendToCongress(proposal) {
    if (proposal.status !== "congelada") {
      throw new Error("Solo se pueden enviar expedientes congelados");
    }

    proposal.status = "enviada";
    proposal.expedient.sentAt = new Date();

    proposal.audit.push({
      action: "EXPEDIENTE_ENVIADO",
      detail: "Expediente enviado a la Oficina del Congreso",
    });

    return proposal;
  }
}

module.exports = LegislativeProcessFacade;