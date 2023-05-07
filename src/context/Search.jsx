import { useState, useContext, createContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [Search, setSearch] = useState({
    keyword: null,
    results: [],
  });

  return (
    <SearchContext.Provider value={[Search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
