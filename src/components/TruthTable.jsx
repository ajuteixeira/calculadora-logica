import { useState, useEffect } from "react";

export default function TruthTable({ results }) {
  const [value, setValue] = useState(results || {});

  useEffect(() => {
    setValue(results);
  }, [results]);

  const renderTableHeader = () => {
    const headerVariables = Object.keys(value)[0];
    const headerResult = value[headerVariables];
    const rows = [...headerVariables.split(","), headerResult];

    return (
      <thead>
        <tr>
          {rows.map((header) => {
            return <th>{header}</th>;
          })}
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    const rowVariables = Object.keys(value).slice(1);
    const rowResults = Object.values(value).slice(1);

    return (
      <tbody>
        {rowVariables.map((variables, index) => {
          const currentResult = rowResults[index];
          const individualVals = variables.split(",");

          return (
            <tr>
              {individualVals.map((val) => {
                return <td>{val}</td>;
              })}
              <td>{currentResult}</td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  const fetchType = () => {
    const vals = Object.values(value);
    vals.shift();

    const uniqueResults = [...new Set(vals)];

    if (uniqueResults.length > 1) {
      return "contingência";
    } else if (uniqueResults[0] == "V") {
      return "tautologia";
    } else {
      return "contradição";
    }
  };

  return value && Object.keys(value).length > 0 ? (
    <div>
      <h3 className="py-3 text-center">Resultado: {fetchType()}</h3>
      <table>
        {renderTableHeader()}
        {renderTableBody()}
      </table>
    </div>
  ) : null;
}
