import React, { useState } from 'react';

export default function App() {
  const [columns, setColumns] = useState({
    'A Fazer': [],
    'Fazendo': [],
    'Feito': []
  });
  const [task, setTask] = useState('');

  const addTask = () => {
    if (!task.trim()) return;
    setColumns(prev => ({
      ...prev,
      'A Fazer': [...prev['A Fazer'], task]
    }));
    setTask('');
  };

  const moveTask = (colName, index, direction) => {
    const colNames = Object.keys(columns);
    const colIndex = colNames.indexOf(colName);
    const newColIndex = colIndex + direction;

    if (newColIndex < 0 || newColIndex >= colNames.length) return;

    const taskToMove = columns[colName][index];
    const newColumns = { ...columns };
    newColumns[colName] = newColumns[colName].filter((_, i) => i !== index);
    newColumns[colNames[newColIndex]] = [...newColumns[colNames[newColIndex]], taskToMove];

    setColumns(newColumns);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Kanban com Anúncios</h1>

      <div style={{ marginBottom: '10px' }}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Nova tarefa"
        />
        <button onClick={addTask}>Adicionar</button>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        {Object.entries(columns).map(([colName, tasks]) => (
          <div key={colName} style={{ background: '#f4f4f4', padding: '10px', borderRadius: '5px', flex: 1 }}>
            <h2>{colName}</h2>
            {tasks.map((t, i) => (
              <div key={i} style={{ background: 'white', padding: '5px', margin: '5px 0', borderRadius: '3px' }}>
                {t}
                <div style={{ marginTop: '5px' }}>
                  <button onClick={() => moveTask(colName, i, -1)}>←</button>
                  <button onClick={() => moveTask(colName, i, 1)}>→</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', background: '#ddd', padding: '10px' }}>
        <p>Espaço para anúncio</p>
      </div>
    </div>
  );
}
