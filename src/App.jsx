import { useState } from 'react'
import casesData from './data/cases.json'
import Home from './components/Home'
import PracticeMode from './components/PracticeMode'
import './App.css'

function App() {
  const [activeCase, setActiveCase] = useState(null)

  return (
    <>
      <header className="app-header">
        <div className="app-header__inner">
          <button
            type="button"
            className="app-header__brand"
            onClick={() => setActiveCase(null)}
          >
            <span className="app-header__mark">CI</span>
            <span className="app-header__title">Case Interview Prep</span>
          </button>
          {activeCase && (
            <button
              type="button"
              className="app-header__back"
              onClick={() => setActiveCase(null)}
            >
              ← All cases
            </button>
          )}
        </div>
      </header>

      <main className="app-main">
        {activeCase ? (
          <PracticeMode caseData={activeCase} />
        ) : (
          <Home companies={casesData.companies} onSelectCase={setActiveCase} />
        )}
      </main>
    </>
  )
}

export default App
