import { useState } from "react";
import { createProposal, publishProposal } from "../api/proposalApi";

const RegisterProposal = ({ selectedProposal, setSelectedProposal, setCurrentPage }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    normativeText: "",
    justification: "",
    category: "Transparencia",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response = await createProposal(formData);

      setSelectedProposal(response.data);
      setMessage("Propuesta registrada correctamente en estado borrador.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error al registrar propuesta");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!selectedProposal?._id) {
      setMessage("Primero debes registrar una propuesta.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await publishProposal(selectedProposal._id);

      setSelectedProposal(response.data);
      setMessage("Propuesta publicada correctamente. Ya puede recibir firmas.");
      setCurrentPage("detail");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error al publicar propuesta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <div className="section-header">
        <div>
          <p className="eyebrow">Caso de uso CU-01</p>
          <h2>Registrar propuesta normativa</h2>
        </div>
      </div>

      <form onSubmit={handleCreate} className="form">
        <label>
          Título de la propuesta
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ej. Ley de Transparencia Ciudadana"
          />
        </label>

        <label>
          Descripción
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe brevemente la propuesta"
          />
        </label>

        <label>
          Texto normativo
          <textarea
            name="normativeText"
            value={formData.normativeText}
            onChange={handleChange}
            placeholder="Artículo 1: ..."
          />
        </label>

        <label>
          Exposición de motivos
          <textarea
            name="justification"
            value={formData.justification}
            onChange={handleChange}
            placeholder="Explica por qué es necesaria esta propuesta"
          />
        </label>

        <label>
          Categoría
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Transparencia">Transparencia</option>
            <option value="Educación">Educación</option>
            <option value="Salud">Salud</option>
            <option value="Seguridad">Seguridad</option>
            <option value="Medio ambiente">Medio ambiente</option>
          </select>
        </label>

        <div className="actions">
          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar propuesta"}
          </button>

          <button type="button" className="secondary" onClick={handlePublish} disabled={loading}>
            Publicar propuesta
          </button>
        </div>
      </form>

      {message && <p className="message">{message}</p>}

      {selectedProposal && (
        <div className="summary-box">
          <strong>Propuesta seleccionada:</strong>
          <p>{selectedProposal.title}</p>
          <p>Estado actual: {selectedProposal.status}</p>
        </div>
      )}
    </section>
  );
};

export default RegisterProposal;