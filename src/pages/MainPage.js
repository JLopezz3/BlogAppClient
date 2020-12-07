import React, { useEffect, useState } from "react";
import Axios from "axios";

import { useHistory } from "react-router-dom";
export default function MainPage() {
  const [postList, setPostList] = useState([]);
  let history = useHistory();

  useEffect(() => {
    Axios.get('https://blog-posting-app.herokuapp.com/api/get').then(
      (data) => {
        setPostList(data.data);
        console.log(data.data);
      }
    );
  }, []);



  return (
    <div className="MainPage">
      <div className="PostContainer">
        {postList == [] ? (
          <h1>Loading...</h1>
        ) : (
          postList.map((val, key) => {
            return (
              <div
                className="Post"
                key={key}
                onClick={() => {
                  // history.push(`/post/${val.id}`);
                }}
              >
                <h1>{val.title}</h1>
                <p>
                  {val.post_text.length > 500
                    ? val.post_text.substring(0, 500) + " ..."
                    : val.post_text}
                </p>

                <div className="bottom">
                  <h4> {val.user_name} </h4>
                  <h4> {val.likes}</h4>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}