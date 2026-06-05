import { useState } from "react";
import { freezeExpedient, sendToCongress } from "../api/proposalApi";
import StatusBadge from "../components/StatusBadge";
import { formatDate } from "../utils/formatDate";

const ExpedientPanel = ({ selectedProposal, setSelectedProposal, setCurrentPage }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!selectedProposal) {
    return (
      <section className="card empty-state">
        <h2>No hay expediente disponible</h2>
        <p>Primero registra una propuesta normativa.</p>
        <button onClick={() => setCurrentPage("register")}>Ir a registrar propuesta</button>
      </section>
    );
  }

  const handleFreeze = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await freezeExpedient(selectedProposal._id);

      setSelectedProposal(response.data);
      setMessage("Expediente congelado correctamente. Se generó el hash de integridad.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error al congelar expediente");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await sendToCongress(selectedProposal._id);

      setSelectedProposal(response.data);
      setMessage("Expediente enviado al Congreso correctamente.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error al enviar expediente");
    } finally {
      setLoading(false);
    }
  };

  const expedient = selectedProposal.expedient || {};
  const elements = expedient.elements || [];
  const audit = selectedProposal.audit || [];

  return (
    <section className="card">
      <div className="section-header">
        <div>
          <p className="eyebrow">Caso de uso CU-03</p>
          <h2>Expediente legislativo</h2>
        </div>

        <StatusBadge status={selectedProposal.status} />
      </div>

      <div className="grid">
        <div className="info-box">
          <span>Propuesta</span>
          <strong>{selectedProposal.title}</strong>
        </div>

        <div className="info-box">
          <span>Firmas válidas</span>
          <strong>{selectedProposal.validSignaturesCount?.toLocaleString() || 0}</strong>
        </div>

        <div className="info-box">
          <span>Fecha de congelamiento</span>
          <strong>{formatDate(expedient.frozenAt)}</strong>
        </div>

        <div className="info-box">
          <span>Fecha de envío</span>
          <strong>{formatDate(expedient.sentAt)}</strong>
        </div>
      </div>

      <div className="pattern-note">
        <strong>Patrones aplicados:</strong> Facade coordina congelamiento y envío. Composite agrupa los elementos del expediente. Proxy evita acciones no permitidas.
      </div>

      <div className="hash-box">
        <span>Hash o sello de integridad</span>
        <code>{expedient.hash || "Aún no generado"}</code>
      </div>

      <div className="actions">
        <button onClick={handleFreeze} disabled={loading}>
          Congelar expediente
        </button>

        <button className="secondary" onClick={handleSend} disabled={loading}>
          Enviar al Congreso
        </button>

        <button className="secondary" onClick={() => setCurrentPage("detail")}>
          Volver al detalle
        </button>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="divider" />

      <h3>Elementos del expediente</h3>

      {elements.length === 0 ? (
        <p className="muted">El expediente todavía no ha sido congelado.</p>
      ) : (
        <div className="list">
          {elements.map((element, index) => (
            <div className="list-item" key={`${element.type}-${index}`}>
              <strong>{element.type}</strong>
              <span>{formatDate(element.createdAt)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="divider" />

      <h3>Historial de auditoría</h3>

      {audit.length === 0 ? (
        <p className="muted">No hay eventos registrados.</p>
      ) : (
        <div className="list">
          {audit.map((item, index) => (
            <div className="list-item" key={`${item.action}-${index}`}>
              <strong>{item.action}</strong>
              <p>{item.detail}</p>
              <span>{formatDate(item.createdAt)}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ExpedientPanel;