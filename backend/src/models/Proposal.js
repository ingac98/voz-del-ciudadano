const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema(
  {
    citizenId: {
      type: String,
      required: true,
    },
    citizenName: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    validationMessage: {
      type: String,
      default: "Firma validada correctamente",
    },
    signedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const auditSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const expedientSchema = new mongoose.Schema(
  {
    hash: {
      type: String,
      default: null,
    },
    frozenAt: {
      type: Date,
      default: null,
    },
    sentAt: {
      type: Date,
      default: null,
    },
    elements: {
      type: Array,
      default: [],
    },
  },
  { _id: false }
);

const proposalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      trim: true,
    },
    normativeText: {
      type: String,
      required: [true, "El texto normativo es obligatorio"],
    },
    justification: {
      type: String,
      required: [true, "La exposición de motivos es obligatoria"],
    },
    category: {
      type: String,
      required: [true, "La categoría es obligatoria"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["borrador", "activa", "congelada", "enviada", "vencida"],
      default: "borrador",
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    validSignaturesCount: {
      type: Number,
      default: 0,
    },
    signatures: {
      type: [signatureSchema],
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    modifications: {
      type: Array,
      default: [],
    },
    resources: {
      type: Array,
      default: [],
    },
    expedient: {
      type: expedientSchema,
      default: () => ({}),
    },
    audit: {
      type: [auditSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Proposal", proposalSchema);