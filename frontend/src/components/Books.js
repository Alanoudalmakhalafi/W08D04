import React from 'react'
import { useEffect, useState } from "react"
import axios from "axios"

export default function Books() {

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const [NewBooks, setNewBooks] = useState();

  let decodedData ;
  const storedToken = localStorage.getItem("token");
  if (storedToken){
    decodedData = jwt_decode(storedToken, { payload: true });
     console.log(decodedData);
     let expirationDate = decodedData.exp;
      var current_time = Date.now() / 1000;
      if(expirationDate < current_time)
      {
          localStorage.removeItem("token");
      }
   }

  useEffect(() => {
    axios
    .get("http://localhost:3001/books/getBooks")
    .then((res) => {
        setBooks(res.data);
    });
  }, [NewBooks])

  const addBook = (e) => {
    e.preventDefault();
       axios
      .post("http://localhost:3001/books/postBook", {
        title: title,
        pages: pages,
        price: price,
        image: image,
       
      })
      .then(
        (response) => {
          console.log("response");
          console.log(response);
          setNewBooks(response);
        },
        (error) => {
        setNewBooks("response");
          console.log(error);
        }
      );
    }

    function deleteIn(id) {
        // e.preventDefault()
        console.log(id);
        axios.delete(`http://localhost:3001/books/deleteBook/${id}`)
        .then((res) => {
          console.log("deleted", res.data);
          setNewBooks(res.data);
        });
      }

      function edit(id){
        axios.put(`http://localhost:3001/books/updateBook/${id}`,
        {
            title: title,
            pages: pages,
            price: price,
            image: image,
           
          })
        .then((res)=>{
          console.log("updated", res.data)
          setNewBooks(res.data)
      })
      }

    return (
        <div>
        {(function(){
          if(decodedData!= undefined){
            return (
              <>
              
         <h4>Add books</h4>
      <form>
        <input
          placeholder="book title:"
          onChange={(e) => setTitle(e.target.value)}
        ></input><br/>
        <input
          placeholder="pages :"
          onChange={(e) => setPages(e.target.value)}
        ></input><br/>
        <input
          placeholder="price :"
          onChange={(e) => setPrice(e.target.value)}
        ></input><br/>
        <input
          placeholder="Image :"
          onChange={(e) => setImage(e.target.value)}
        ></input><br/>
        
        <button className="button-8"  onClick={(e) => addBook(e)}>Add</button>
      </form>

              </>
            )
          }
        })}
      <div className="authors-container">
        {books.map((get) => {
          return (
            <div className=" authors-cards">
              <img src={get.image} height="200px" width="200px" />
              <p>{get.title}</p>
              <p>{get.pages}</p>
              <p>{get.price}</p>
             
             

              <button className="button-8" 
               onClick={()=>{
                 edit(get._id)}}
                 >Edit</button>

              <button className="button-8" 
                onClick={() => {
                  deleteIn(get._id);
                }}
              >
                Delete
              </button>

              
            </div>
          );
        })}
      </div>
           
        </div>
    )
}
