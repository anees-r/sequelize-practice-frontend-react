import React from "react";
import { Link } from "react-router";

const AddButton = () => {
  const handleDeleteAll = async()=>{
    if (window.confirm('All items will be deleted permanently!')) {
      const res = await fetch("http://localhost:8080/api/tutorials",{
        method: "DELETE",
      })

      if(!res){
        throw new Error("ERROR: Could not process request! Please try later.")
      }
      else(
        window.location.href = "/"
      )
    }}
  return (
    <>
    <Link to="/tutorial/add-new" className="btn btn-dark position-fixed bottom-0 end-0 m-5 col-md-1">
      Add New
    </Link>
    <div onClick={handleDeleteAll} className="btn btn-danger position-fixed bottom-0 start-0 m-5 col-md-1">
      Delete All
    </div></>
    
  );
};

export default AddButton;
