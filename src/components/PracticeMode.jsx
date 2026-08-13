import { useState } from 'react'
import { useExhibitRequests } from '../hooks/useExhibitRequests'
import Exhibit from './Exhibit'
import './PracticeMode.css'

function PracticeMode({ caseData }) {
  const { log, inputValue, setInputValue, submit } = useExhibitRequests(
    caseData.exhibits
  )
  const [response, setResponse] = useState('')
  const [feedbackRequested, setFeedbackRequested] = useState(false)

  const availableTopics = caseData.exhibits.map((e) => e.title).join(', ')

  function handleRequestSubmit(e) {
    e.preventDefault()
    submit()
  }

  return (
    <div className="practice">
      <aside className="practice__brief">
        <span className="practice__badge">{caseData.typeLabel}</span>
        <h1 className="practice__title">{caseData.title}</h1>
        <p className="practice__context">{caseData.prompt.context}</p>
        <div className="practice__question">
          <h3>Initial question</h3>
          <p>{caseData.prompt.initialQuestion}</p>
        </div>
      </aside>

      <section className="practice__workspace">
        <div className="practice__panel">
          <h3>Ask for information</h3>
          <p className="practice__hint">
            Ask the way you'd ask an interviewer — e.g. &ldquo;Can I see the
            cost breakdown?&rdquo;
          </p>
          <form className="practice__request-form" onSubmit={handleRequestSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask for an exhibit or data point..."
            />
            <button type="submit">Ask</button>
          </form>

          <div className="practice__log">
            {log.length === 0 && (
              <p className="practice__log-empty">
                Nothing requested yet. Try asking about: {availableTopics}.
              </p>
            )}
            {log
              .slice()
              .reverse()
              .map((entry) => (
                <div key={entry.id} className="practice__log-entry">
                  <p className="practice__log-query">
                    You asked: &ldquo;{entry.query}&rdquo;
                  </p>
                  {entry.exhibit ? (
                    <Exhibit exhibit={entry.exhibit} />
                  ) : (
                    <p className="practice__log-miss">
                      No prepared data matches that request. Try asking about:{' '}
                      {availableTopics}.
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>

        <div className="practice__panel">
          <h3>Your response</h3>
          <textarea
            className="practice__response"
            rows={10}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Lay out your structure, state a hypothesis, walk through the math..."
          />
          <div className="practice__actions">
            <button
              type="button"
              className="practice__feedback-btn"
              onClick={() => setFeedbackRequested(true)}
              disabled={!response.trim()}
            >
              Get feedback
            </button>
          </div>
          {feedbackRequested && (
            <p className="practice__feedback-placeholder">
              AI feedback via the Claude API is coming in the next build step.
              Your response is saved above and ready to send once that's wired up.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default PracticeMode
