import CompanySection from './CompanySection'
import './Home.css'

function Home({ companies, onSelectCase }) {
  return (
    <div className="home">
      <section className="home__intro">
        <p className="home__eyebrow">Case Interview Prep</p>
        <h1>Practice management consulting cases, out loud.</h1>
        <p className="home__lede">
          Pick a firm and a case below. You will get the brief, pull the
          exhibits you ask for, and work through it just like a real first-round
          interview.
        </p>
      </section>

      <div className="home__companies">
        {companies.map((company) => (
          <CompanySection
            key={company.id}
            company={company}
            onSelectCase={onSelectCase}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
