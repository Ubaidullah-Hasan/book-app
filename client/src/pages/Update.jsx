import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bookId = location.pathname.split("/")[2];
  const bookDetails = location?.state?.book;
  // console.log(bookDetails);

  const [book, setBook] = useState({
    title: bookDetails?.title,
    desc: bookDetails?.desc,
    price: bookDetails?.price,
    cover: bookDetails?.cover,
  });
  const [error, setError] = useState(false)

  
  

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(e.target.name);
  };


  const handleUpdate = async (e) => {
    console.log(book);
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <form className="form" >
      <h1>Update the Book</h1>
      <input
        defaultValue={bookDetails?.title}
        type="text"
        placeholder="Book title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        defaultValue={bookDetails?.desc}
        rows={5}
        type="text"
        placeholder="Book desc"
        name="desc"
        onChange={handleChange}
      />
      <input
        defaultValue={bookDetails?.price}
        type="number"
        placeholder="Book price"
        name="price"
        onChange={handleChange}
      />
      <input
        defaultValue={bookDetails?.cover}
        type="text"
        placeholder="Book cover"
        name="cover"
        onChange={handleChange}
      />
      <button onClick={handleUpdate}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </form>
  );
};

export default Update;
