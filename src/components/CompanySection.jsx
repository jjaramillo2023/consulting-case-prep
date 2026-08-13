import CaseCard from './CaseCard'
import './CompanySection.css'

function CompanySection({ company, onSelectCase }) {
  return (
    <section
      className="company-section"
      style={{ '--company-accent': company.accentColor }}
    >
      <div className="company-section__header">
        <h2>{company.name}</h2>
        <p>{company.description}</p>
      </div>

      {company.cases.length > 0 ? (
        <div className="company-section__grid">
          {company.cases.map((c) => (
            <CaseCard key={c.id} caseData={c} onSelect={() => onSelectCase(c)} />
          ))}
        </div>
      ) : (
        <div className="company-section__empty">
          Cases for {company.shortName} are coming soon.
        </div>
      )}
    </section>
  )
}

export default CompanySection
