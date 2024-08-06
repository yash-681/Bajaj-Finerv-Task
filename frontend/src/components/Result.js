import React from 'react';

const Result = ({ response, selectedOptions }) => {
  // Helper function to render the selected data
  const renderData = (dataKey) => {
    return response[dataKey] && response[dataKey].length > 0
      ? response[dataKey].join(', ')
      : 'No data available';
  };

  return (
    <div>
      {selectedOptions.includes('alphabets') && (
        <div>
          <h2>Alphabets</h2>
          <p>{renderData('alphabets')}</p>
        </div>
      )}
      {selectedOptions.includes('numbers') && (
        <div>
          <h2>Numbers</h2>
          <p>{renderData('numbers')}</p>
        </div>
      )}
      {selectedOptions.includes('highest_alphabet') && (
        <div>
          <h2>Highest Alphabet</h2>
          <p>{renderData('highest_alphabet')}</p>
        </div>
      )}
    </div>
  );
};

export default Result;