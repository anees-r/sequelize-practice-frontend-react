import TutorialItem from "./TutorialItem";
import React, { useState, useEffect } from "react";

const Tutorials = (props) => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8080/api/tutorials", {
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
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = response.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.published.toString().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    document.title = "SRA - Home";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, response]);

  return (
    <div className="mx-5 mb-5 pb-5">
      <div className="d-flex mx-5 justify-content-center my-2 ">
        <input
          style={{ borderRadius: "25px", height: "40px", border: "solid 1px" }}
          className="p-3 mx-2 col-md-4"
          type="text"
          id="query"
          placeholder="Search here"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <h3 className="my-4">Tutorials:</h3>
      {loading && (
        <div className="d-flex justify-content-center flex-column align-items-center my-5">
          <div className="spinner-border" role="status"></div>
          <p>Loading</p>
        </div>
      )}
      {!loading && response.length === 0 && (
        <div
          className=" d-flex mx-auto col-md-4 justify-content-center px-2 py-3 my-5"
          style={{ borderRadius: "15px", backgroundColor: "#DEDEDE" }}
        >
          &#x26A0; Nothing to show! Start by adding a new tutorial!
        </div>
      )}
      {!loading && (
        <div className="row">
          {filteredData.map((e) => {
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
