import { useState } from 'react';
import './App.css';

export default function App() {
  const [showAlunni, setShowAlunni] = useState(false);

  const alunni = [
    { id: 1, nome: 'marco', cognome: 'benve' },
    { id: 2, nome: 'lipo', cognome: 'bruno' },
  ];

  return (
    <div className="App">
      <div className="container">
        <h1>Elenco Alunni</h1>
        <button className="btn" onClick={() => setShowAlunni(!showAlunni)}>
          {showAlunni ? 'Nascondi Elenco' : 'Mostra Elenco'}
        </button>
        {showAlunni && (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Cognome</th>
              </tr>
            </thead>
            <tbody>
              {alunni.map(alunno => (
                <tr key={alunno.id}>
                  <td>{alunno.id}</td>
                  <td>{alunno.nome}</td>
                  <td>{alunno.cognome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

