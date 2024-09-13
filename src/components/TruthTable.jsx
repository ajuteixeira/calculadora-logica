export default function TruthTable() {
  return (
    <div>
      <h3 className="py-3 text-center">tabela-verdade:</h3>
      <table>
        <thead>
          <tr>
            <th>A</th>
            <th>B</th>
            <th>A^B</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>F</td>
            <td>V</td>
            <td>F</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
