import React from 'react';
import SearchBar from './SearchBar';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub logo" style={{ width: '200px' }} />
      <h1 style={{ marginTop: '50px', textAlign: 'center' }}>GitHub Search</h1>
      <SearchBar />
    </div>
  );
};

export default App;
