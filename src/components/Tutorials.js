import TutorialItem from "./TutorialItem";
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';

const Tutorials = (props) => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const title = searchParams.get('title');
  const fetchData = async () => {
    let api;
    if(title){
      api = `http://localhost:8080/api/tutorials?title=${title}`
    }else{
      api = "http://localhost:8080/api/tutorials"
    }
    const res = await fetch(api, {
      method: "GET",
    });

    if (!res) {
      throw new Error("ERROR: Could not fetch data from server!");
    } else {
      const data = await res.json();
      setResponse(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    if(title){
      document.title = `"${title}" - SRA`
    }else{
      document.title = "SRA - Home"
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return (
    <div className="mx-5">
      <h3>Tutorials:</h3>
      {loading && <p className="text-center my-5">Loading...</p>}
      {!loading && response.length === 0 && (
        <p className="text-center my-5">
          No data in Database, add a new Tutorial!
        </p>
      )}
      {!loading && (
        <div className="row">
          {response.map((e) => {
            return (
              <div className="col-md-4 my-2 x" key={e.id}>
                <TutorialItem
                  id={e.id}
                  title={e.title}
                  description={e.description}
                  status={e.published}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Tutorials;
