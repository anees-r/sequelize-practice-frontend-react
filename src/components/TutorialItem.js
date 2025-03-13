import React from "react";
import { Link } from "react-router";

const TutorialItem = (props) => {
  const handleDelete = async()=>{
    if (window.confirm('This item will be deleted permanently!')) {
      const res = await fetch(`http://localhost:8080/api/tutorials/${props.id}`,{
        method: "DELETE",
      })

      if(!res){
        throw new Error("ERROR: Could not process request! Please try later.")
      }
      else(
        window.location.href = "/"
      )
    }
  }

  return (
    <div>
      <div className="card text-dark bg-light mb-3 shadow">
        <div className="card-header">
          <h5>{props.title}</h5>
        </div>
        <div className="card-body">
          <p className="card-text">{props.description}</p>
          <p className="card-text">
            Status:{" "}
            {props.status ? (
              <span className="text-success">Published!</span>
            ) : (
              <span className="text-danger">Not Published!</span>
            )}
          </p>
          <div className="d-flex justify-content-end">
            <Link to={`/tutorial/edit/${props.id}`} className="btn btn-dark mx-1 col-md-3">
              Edit
            </Link>
            <div onClick={handleDelete} className="btn btn-danger mx-1 col-md-3">
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialItem;
