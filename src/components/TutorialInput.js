// import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TutorialInput = (props) => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState("");

  // when this comp is rendered for update then fetch existing data
  const fetchData = async () => {
    const res = await fetch(`http://localhost:8080/api/tutorials/${id}`, {
      method: "GET",
    });
    if (!res) {
      throw new Error("ERROR: Could not fetch data from server!");
    } else {
      return res.json();
    }
  };

  // if edit then fetch and populate
  useEffect(() => {
    const setData = async () => {
      const data = await fetchData();

      setTitle(data.title);
      setDescription(data.description);
      setPublished(data.published);
    };
    // populating fields with existing data
    if (props.type !== "new") {
      setData();
      document.title = "Edit - SRA";
    } else {
      document.title = "Add - SRA";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async () => {
    const res = await fetch("http://localhost:8080/api/tutorials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        published,
      }),
    });

    if (!res) {
      throw new Error("ERROR: Could not save data! Try again later.");
    } else {
      window.location.href = "/";
    }
  };

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:8080/api/tutorials/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        published,
      }),
    });

    if (!res) {
      throw new Error("ERROR: Could not save data! Try again later.");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <form className="col-md-4 mx-auto p-5">
      <h3 className="text-center mb-4">
        {props.type === "new" ? "Create Tutorial" : "Edit Tutorial"}
      </h3>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Title
        </label>
        <input
          value={title}
          type="text"
          className="form-control"
          id="title"
          aria-describedby="emailHelp"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Description
        </label>
        <input
          value={description}
          type="text"
          className="form-control"
          id="desc"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="published"
          checked={published}
          onChange={(e) => {
            setPublished(e.target.checked);
          }}
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Publish Tutorial
        </label>
      </div>
      <div
        className="d-flex justify-content-center"
        onClick={props.type === "new" ? handleAdd : handleUpdate}
        style={{ textDecoration: "none" }}
      >
        <div className="btn btn-dark col-md-12">
          {props.type === "new" ? "Add" : "Update"}
        </div>
      </div>
    </form>
  );
};

export default TutorialInput;
