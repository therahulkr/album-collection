import { Fragment, useEffect, useState } from "react";
import "./app.css";

function App() {

  const [albums,SetAlbums] = useState([]);

  // in this async function we will get all the request 
const getAlbums = async()=>{
      const response = await fetch("https://jsonplaceholder.typicode.com/albums");
      SetAlbums(await response.json());
}

// this function is used to add an album and will get a success response
const addAlbum = async()=>{
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'test',
      id: albums.length+1,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data = await response.json()
  // console.log(data)
  albums.push(data)
  console.log(albums)
  SetAlbums(albums);
}

// this function will update the album
const updateAlbum = async()=>{
  await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PUT',
    body: JSON.stringify({
      id: 1,
      title: 'foo',
      body: 'bar',
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

// for delete an album
const deleteAlbum = async()=>{
  await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'DELETE',
  });
}

// it will call once and run all the functions for the corresponding action to take place
useEffect(()=>{
  getAlbums();
  addAlbum();
  updateAlbum();
  deleteAlbum();
},[]);


  return (
    <Fragment>
      <div className="heading">Album List</div>
      <div id="outer">

          <div className="container">
             {
               albums.map((currAlbum)=>{
                return (
                   <div className="item">
                     <span>{currAlbum.id}</span><span>{currAlbum.userId}</span><span>{currAlbum.title}</span>
                   </div>
                );
              })
             }
              
              
          </div>
      </div>
    </Fragment>
  );
}

export default App;
