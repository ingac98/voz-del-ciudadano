const ProgressBar = ({ value, goal = 25000 }) => {
  const percentage = Math.min((value / goal) * 100, 100);

  return (
    <div>
      <div className="progress-info">
        <span>{value.toLocaleString()} firmas válidas</span>
        <span>{percentage.toFixed(1)}%</span>
      </div>

      <div className="progress">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;