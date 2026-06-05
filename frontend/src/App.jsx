import { useState } from "react";
import Navbar from "./components/Navbar";
import RegisterProposal from "./pages/RegisterProposal";
import ProposalDetail from "./pages/ProposalDetail";
import ExpedientPanel from "./pages/ExpedientPanel";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("register");
  const [selectedProposal, setSelectedProposal] = useState(null);

  const renderPage = () => {
    if (currentPage === "register") {
      return (
        <RegisterProposal
          selectedProposal={selectedProposal}
          setSelectedProposal={setSelectedProposal}
          setCurrentPage={setCurrentPage}
        />
      );
    }

    if (currentPage === "detail") {
      return (
        <ProposalDetail
          selectedProposal={selectedProposal}
          setSelectedProposal={setSelectedProposal}
          setCurrentPage={setCurrentPage}
        />
      );
    }

    return (
      <ExpedientPanel
        selectedProposal={selectedProposal}
        setSelectedProposal={setSelectedProposal}
        setCurrentPage={setCurrentPage}
      />
    );
  };

  return (
    <div className="app">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="container">
        <section className="hero">
          <p className="eyebrow">Plataforma digital</p>
          <h1>Prototipo Voz del Ciudadano</h1>
          <p>
            Demo académica para registrar propuestas normativas, recolectar firmas digitales simuladas,
            congelar expedientes y enviarlos al Congreso aplicando patrones estructurales.
          </p>
        </section>

        {renderPage()}
      </main>
    </div>
  );
}

export default App;