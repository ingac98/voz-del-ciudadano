const Navbar = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="navbar">
      <div>
        <h1>Voz del Ciudadano</h1>
        <p>Prototipo académico con patrones estructurales</p>
      </div>

      <nav>
        <button
          className={currentPage === "register" ? "active" : ""}
          onClick={() => setCurrentPage("register")}
        >
          Registrar propuesta
        </button>

        <button
          className={currentPage === "detail" ? "active" : ""}
          onClick={() => setCurrentPage("detail")}
        >
          Detalle y firma
        </button>

        <button
          className={currentPage === "expedient" ? "active" : ""}
          onClick={() => setCurrentPage("expedient")}
        >
          Expediente
        </button>
      </nav>
    </header>
  );
};

export default Navbar;