import React, { useEffect, useState } from "react";
import novelService from "../services/NovelService";

const SingleNovel = (props) => {
  const [novel, setNovel] = useState([]);
  const [user_info, setUserInfo] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [library, setLibrary] = useState([]);
  const id = props.match.params.id;

  useEffect(() => {
    novelService
      .getSingleNovel(id)
      .then((data) => {
        setNovel(data.novel);
        setUserInfo(data.user_info);
        setChapters(data.chapters);
        setLibrary(data.library);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div></div>;
};

export default SingleNovel;
