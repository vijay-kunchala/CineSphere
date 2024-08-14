import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const executeSearch = async (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return { query, setQuery, executeSearch, handleInputChange };
};

export default useSearch;