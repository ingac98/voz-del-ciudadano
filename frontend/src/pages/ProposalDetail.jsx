import { useState } from "react";
import { signProposal, simulateGoal } from "../api/proposalApi";
import StatusBadge from "../components/StatusBadge";
import ProgressBar from "../components/ProgressBar";
import { formatDate } from "../utils/formatDate";

const ProposalDetail = ({ selectedProposal, setSelectedProposal, setCurrentPage }) => {
  const [signatureData, setSignatureData] = useState({
    citizenId: "DNI12345678",
    citizenName: "Juan Pérez",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!selectedProposal) {
    return (
      <section className="card empty-state">
        <h2>No hay propuesta seleccionada</h2>
        <p>Primero registra y publica una propuesta normativa.</p>
        <button onClick={() => setCurrentPage("register")}>Ir a registrar propuesta</button>
      </section>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignatureData({
      ...signatureData,
      [name]: value,
    });
  };

  const handleSign = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await signProposal(selectedProposal._id, signatureData);

      setSelectedProposal(response.data);
      setMessage("Firma digital registrada correctamente.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error al firmar propuesta");
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateGoal = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await simulateGoal(selectedProposal._id);

      setSelectedProposal(response.data);
      setMessage("Meta de 25,000 firmas simulada correctamente.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error al simular meta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <div className="section-header">
        <div>
          <p className="eyebrow">Caso de uso CU-02</p>
          <h2>Detalle de propuesta y firma ciudadana</h2>
        </div>

        <StatusBadge status={selectedProposal.status} />
      </div>

      <div className="proposal-detail">
        <h3>{selectedProposal.title}</h3>
        <p>{selectedProposal.description}</p>

        <div className="grid">
          <div className="info-box">
            <span>Categoría</span>
            <strong>{selectedProposal.category}</strong>
          </div>

          <div className="info-box">
            <span>Fecha de publicación</span>
            <strong>{formatDate(selectedProposal.publishedAt)}</strong>
          </div>

          <div className="info-box">
            <span>Meta constitucional</span>
            <strong>25,000 firmas</strong>
          </div>
        </div>

        <ProgressBar value={selectedProposal.validSignaturesCount || 0} />

        <div className="text-block">
          <h4>Texto normativo</h4>
          <p>{selectedProposal.normativeText}</p>
        </div>

        <div className="text-block">
          <h4>Exposición de motivos</h4>
          <p>{selectedProposal.justification}</p>
        </div>
      </div>

      <div className="divider" />

      <div className="pattern-note">
        <strong>Patrones aplicados:</strong> Proxy controla si el ciudadano puede firmar. Adapter simula la validación externa de firma digital.
      </div>

      <div className="form compact-form">
        <label>
          DNI o identificador ciudadano
          <input
            type="text"
            name="citizenId"
            value={signatureData.citizenId}
            onChange={handleChange}
          />
        </label>

        <label>
          Nombre del ciudadano
          <input
            type="text"
            name="citizenName"
            value={signatureData.citizenName}
            onChange={handleChange}
          />
        </label>

        <div className="actions">
          <button onClick={handleSign} disabled={loading}>
            Firmar digitalmente
          </button>

          <button className="secondary" onClick={handleSign} disabled={loading}>
            Probar firma duplicada
          </button>

          <button className="warning" onClick={handleSimulateGoal} disabled={loading}>
            Simular 25,000 firmas
          </button>

          <button className="secondary" onClick={() => setCurrentPage("expedient")}>
            Ir al expediente
          </button>
        </div>
      </div>

      {message && <p className="message">{message}</p>}
    </section>
  );
};

export default ProposalDetail;