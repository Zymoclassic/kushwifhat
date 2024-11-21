import React, { useState } from "react";
import DataItem from "./DataItem";
import { Placeholder } from "../assets/js/file";


const Data = () => {

    const [postData, setPostData] = useState(Placeholder);

  return (
    <section className="posts">
      <div className="container postsContainer">
      {
        postData.map(({id, image, category, title, description, user}) => 
        <DataItem key={id} image={image} category={category} title={title} description={description} user={user} />)
      }
      </div>
    </section>
  )
}

export default Data;

