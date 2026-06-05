const StatusBadge = ({ status }) => {
  const labels = {
    borrador: "Borrador",
    activa: "Activa",
    congelada: "Congelada",
    enviada: "Enviada",
    vencida: "Vencida",
  };

  return <span className={`status-badge status-${status}`}>{labels[status] || status}</span>;
};

export default StatusBadge;