import { useState, useEffect } from 'react';
import axios from 'axios';
import { youtube_key } from '../keys';

const useAxios = (keyword, token) => {
  const [, setError] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos([]);
  }, [keyword]);

  useEffect(() => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${keyword}&${
          token && `pageToken=${token}`
        }&key=${youtube_key}`
      )
      .then((res) => {
        setNextPageToken(res.data.nextPageToken);
        const data = [...res.data.items];
        return data;
      })
      .then((data) => {
        data.forEach((video) => {
          axios
            .get(
              `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${video.id.videoId}&key=${youtube_key}`
            )
            .then((res) => {
              setVideos((prevVideos) => {
                return [...prevVideos, ...res.data.items];
              });
            });
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [keyword, token]);

  return { videos, nextPageToken };
};

export default useAxios;
