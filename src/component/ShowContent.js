import { MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import { MdFavorite } from "react-icons/md";
import styled from "styled-components";
import React, { useState } from 'react';
import axios from "axios";
import { useEffect } from "react";
import RateComponent from "./Rate";

const ShowContent = () => {

  let token = JSON.parse(localStorage.getItem('user'));
  const [data , setData] = useState([]);
  const [id_content, setId_content] = useState('')

 const next = () => {
  axios.get("http://127.0.0.1:8000/mood_app/display_content/",
  {headers:{"Authorization" : `Bearer ${token}`}})
  .then((res)=>{
    console.log(res.data)
    setData(res.data.content)
    setId_content(res.data.content.id)
    console.log(data)  
  }).catch((err)=>{
      console.log(err)
  })
  };

  const addFav = () =>{
    let id = id_content.toString();
    const url =`http://127.0.0.1:8000/profile_app/add_user_fav/${id}`;
    axios.post(url,{},
    {headers:{"Authorization" : `Bearer ${token}`}})
  .then((res)=>{
  }).catch((err)=>{
      console.log(err)
  })
  window.location.reload()
  };
  useEffect (() =>{
    next()
    
},[]);

  return (
    <>
      <MDBRow className="justify-content-md-center">
        <MDBCol>
          <img
            src={data.img}
            className="img-thumbnail"
            alt="..."
            style={{ maxWidth: "24rem" }}
          />
          <p>{data.description}</p>
          <MDBCol style={{ paddingTop: "50px" }}>
            <MDBBtn
              className="text-dark"
              color="light"
              style={{ fontSize: "20px", width: "120px" }}
             onClick={next}
            >
              Next
            </MDBBtn>

            <MDBBtn
              className="text-dark"
              color="light"
              style={{ marginLeft: "50px", width: "120px" }}
              onClick={addFav}
              
            >
              <MdFavorite size={30} color={"#0b0b25"} />
            </MDBBtn>
            <RateComponent></RateComponent>
          </MDBCol>
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default ShowContent;
