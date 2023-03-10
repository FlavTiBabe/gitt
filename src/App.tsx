import React from 'react';
import SearchBar from '~/components/SearchBar';

const App = () => {
  return (
    <div className=''>
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub logo" style={{ width: '200px' }} />
      <h1>GitHub Search</h1>
      <SearchBar />
    </div>
  );
};

export default App;
