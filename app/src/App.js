import { useState } from 'react';
import './App.css';

export default function App() {
  const [alunni, setAlunni] = useState([]);
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingAlunno, setEditingAlunno] = useState(null); // New state for the student being edited

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const caricaAlunni = async () => {
    setLoading(true);
    await sleep(2000);
    try {
      const response = await fetch('http://localhost:8080/alunni');
      const data = await response.json();
      setAlunni(data);
    } catch (error) {
      alert('Errore nel caricamento degli alunni');
    }
    setLoading(false);
  };

  const aggiungiAlunno = async (e) => {
    e.preventDefault();
    try {
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
        alert("Errore nella creazione dell'alunno");
      }
    } catch (error) {
      alert("Errore nella richiesta al server");
    }
    caricaAlunni();
  };

  const aggiornaAlunno = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/alunni/${editingAlunno.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Nome: nome, Cognome: cognome })
      });

      const updatedAlunno = await response.json();

      if (response.ok) {
        setAlunni(prevAlunni => 
          prevAlunni.map(alunno => 
            alunno.id === editingAlunno.id ? updatedAlunno : alunno
          )
        );
        setEditingAlunno(null); 
        setNome('');
        setCognome('');
      } else {
        alert("Errore nell'aggiornamento dell'alunno");
      }
    } catch (error) {
      alert("Errore nella richiesta al server");
    }
  };

  const eliminaAlunno = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/alunni/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAlunni(alunni.filter(alunno => alunno.id !== id));
      } else {
        alert("Errore nell'eliminazione dell'alunno");
      }
    } catch (error) {
      alert("Errore nella richiesta al server");
    }
  };

  const iniziaModifica = (alunno) => {
    setEditingAlunno(alunno);
    setNome(alunno.nome);
    setCognome(alunno.cognome);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Elenco Alunni</h1>
        <button className="btn" onClick={caricaAlunni}>Carica Alunni</button>

        {loading ? (
          <div className="spinner">Caricamento...</div>
        ) : (
          alunni.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Cognome</th>
                  <th>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {alunni.map(alunno => (
                  <tr key={alunno.id}>
                    <td>{alunno.id}</td>
                    <td>{alunno.nome}</td>
                    <td>{alunno.cognome}</td>
                    <td>
                      <button 
                        className="btn-delete"
                        onClick={() => eliminaAlunno(alunno.id)}
                      >
                        Elimina
                      </button>
                      <button 
                        className="btn-edit"
                        onClick={() => iniziaModifica(alunno)}
                      >
                        Aggiorna
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}

        <form className="form" onSubmit={editingAlunno ? aggiornaAlunno : aggiungiAlunno}>
          <div className="form-field">
            <label htmlFor="nome">Nome:</label>
            <input 
              type="text" 
              id="nome" 
              value={nome} 
              onChange={e => setNome(e.target.value)} 
              required 
              placeholder="Inserisci il nome"
            />
          </div>
          <div className="form-field">
            <label htmlFor="cognome">Cognome:</label>
            <input 
              type="text" 
              id="cognome" 
              value={cognome} 
              onChange={e => setCognome(e.target.value)} 
              required 
              placeholder="Inserisci il cognome"
            />
          </div>
          <button type="submit" className="btn">
            {editingAlunno ? 'Aggiorna' : 'Aggiungi'}
          </button>
        </form>
      </div>
    </div>
  );
}
