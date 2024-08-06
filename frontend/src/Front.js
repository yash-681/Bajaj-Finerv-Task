import React, { useState } from 'react';
import axios from 'axios';
import Result from './components/Result';
import './App.css';

const Front = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!Array.isArray(parsedInput.data)) {
        setError('Invalid JSON format: Data should be an array.');
        return;
      }
      const res = await axios.post('https://bajaj-finerv-task-mdum.vercel.app/bfhl', parsedInput);
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  return (
    <div className="App">
      <h1>ABCD123</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON here...'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <>
          <select multiple onChange={handleOptionChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          <Result response={response} selectedOptions={selectedOptions} />
        </>
      )}
    </div>
  );
}

export default Front;