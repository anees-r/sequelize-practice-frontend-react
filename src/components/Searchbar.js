import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/tutorial?title=${query}`);
  };
  return (
    <>
        <div className="d-flex mx-5 justify-content-center my-2">
          <input
          style={{borderRadius:"25px", height:"40px", border:"solid 1px"}}
            className="p-3 mx-2"
            type="text"
            id="query"
            placeholder="Search by title"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <div className="btn btn-dark" style={{borderRadius:"25px"}} onClick={handleSearch}>
            Search
          </div>
        </div>
    </>
  );
};

export default Searchbar;
