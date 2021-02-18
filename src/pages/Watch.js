import React, { useContext, useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import './watch.scss';
import VideoCard from '../components/VideoCard/VideoCard';
import { Link } from 'react-router-dom';
import YoutubeContext from '../YoutubeContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@material-ui/core/CircularProgress';
import { animateScroll } from 'react-scroll';
import uuid from 'react-uuid';
import ReactTimeAgo from 'react-time-ago';
import NumberFormat from 'react-number-format';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const opts = {
  height: '165',
  width: '280',
  playerVars: {
    autoplay: 1,
  },
};
const Watch = (props) => {
  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const { data, loadMoreVideos } = useContext(YoutubeContext);

  const videoId = props.match.params.id;
  const { videoTitle, date, views, likes, dislikes } = props.location.state;
  const newDate = new Date(date);
  const [videos, setVideos] = useState([]);
  const { keyword } = useContext(YoutubeContext);

  useEffect(() => {
    scrollToTop();
  }, [videoId]);

  useEffect(() => {
    setVideos([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  if (videos) {
    return (
      <div className="watch">
        <div className="watch__playerContainer">
          <YouTube videoId={videoId} opts={opts} className="watch__player" />
          <div className="watch__playerDescription">
            <h3>{videoTitle}</h3>
            <div className="watch__stats">
              <div className="statsLeft">
                <NumberFormat
                  value={views}
                  displayType={'text'}
                  thousandSeparator={true}
                />
                <p>views</p>
                <span className="videoCard__span"> • </span>
                <ReactTimeAgo date={newDate} locale="en-US" />
              </div>

              <div className="statsRight">
                <ThumbUpAltIcon className="statsIcon" />{' '}
                <NumberFormat
                  value={likes}
                  displayType={'text'}
                  thousandSeparator={true}
                />
                <ThumbDownIcon className="statsIcon" />{' '}
                <NumberFormat
                  value={dislikes}
                  displayType={'text'}
                  thousandSeparator={true}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="watch__videosContainer">
          <h1>Search results</h1>
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreVideos}
            hasMore={true}
            loader={<CircularProgress color="secondary" />}
            style={{
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            {data &&
              data.map((video) => {
                console.log(video);
                return (
                  <Link
                    to={{
                      pathname: `/watch/${video.id}`,
                      state: {
                        videoTitle: `${video.snippet.title}`,
                        date: `${video.snippet.publishedAt}`,
                        views: `${video.statistics.viewCount}`,
                        likes: `${video.statistics.likeCount}`,
                        dislikes: `${video.statistics.dislikeCount}`,
                      },
                    }}
                    key={uuid()}
                  >
                    <VideoCard
                      image={video.snippet.thumbnails.high.url}
                      channelLogo={video.snippet.thumbnails.default.url}
                      videoTitle={video.snippet.title}
                      channelName={video.snippet.channelTitle}
                      date={video.snippet.publishedAt}
                      views={video.statistics.viewCount}
                      likes={video.statistics.likeCount}
                      dislikes={video.statistics.dislikeCount}
                      key={uuid()}
                    />
                  </Link>
                );
              })}
          </InfiniteScroll>
        </div>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default Watch;
