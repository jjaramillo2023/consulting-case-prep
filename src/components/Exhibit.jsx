function Exhibit({ exhibit }) {
  return (
    <div className="exhibit">
      <p className="exhibit__title">{exhibit.title}</p>
      {exhibit.description && (
        <p className="exhibit__description">{exhibit.description}</p>
      )}

      {exhibit.type === 'table' && (
        <div className="exhibit__table-wrap">
          <table className="exhibit__table">
            <thead>
              <tr>
                {exhibit.columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {exhibit.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {exhibit.note && <p className="exhibit__note">{exhibit.note}</p>}
    </div>
  )
}

export default Exhibit
