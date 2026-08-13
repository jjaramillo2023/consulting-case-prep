import './CaseCard.css'

function CaseCard({ caseData, onSelect }) {
  return (
    <article className="case-card">
      <div className="case-card__meta">
        <span className="case-card__type">{caseData.typeLabel}</span>
        <span className="case-card__difficulty">{caseData.difficulty}</span>
      </div>
      <h3 className="case-card__title">{caseData.title}</h3>
      <p className="case-card__summary">{caseData.summary}</p>
      <div className="case-card__footer">
        <span className="case-card__time">~{caseData.estimatedMinutes} min</span>
        <button type="button" className="case-card__cta" onClick={onSelect}>
          Start practice →
        </button>
      </div>
    </article>
  )
}

export default CaseCard
