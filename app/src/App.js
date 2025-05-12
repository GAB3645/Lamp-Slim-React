import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [alunni, setAlunni] = useState([]);
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [show, setShow] = useState(false);

  const loadAlunni = async () => {
    const response = await fetch('http://localhost:8080/alunni');
    const data = await response.json();
    setAlunni(data);
  };

  const handleShow = () => {
    setShow(!show);
    if (!show) loadAlunni(); 
  };

  const handleAddAlunno = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/alunni', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Nome: nome, Cognome: cognome })
    });
    const newAlunno = await response.json();
    if (response.ok) {
      setAlunni([...alunni, newAlunno]);
      setNome('');
      setCognome('');
    } else {
      alert('Errore nella creazione dell\'alunno');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Elenco Alunni</h1>
        <button className="btn" onClick={handleShow}>
          {show ? 'Nascondi Elenco' : 'Mostra Elenco'}
        </button>
        {show && (
          <div>
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

            <form onSubmit={handleAddAlunno}>
              <div>
                <label htmlFor="nome">Nome:</label>
                <input 
                  type="text" 
                  id="nome"
                  value={nome} 
                  onChange={e => setNome(e.target.value)} 
                  required 
                />
              </div>
              <div>
                <label htmlFor="cognome">Cognome:</label>
                <input 
                  type="text" 
                  id="cognome"
                  value={cognome} 
                  onChange={e => setCognome(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit">Aggiungi</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

