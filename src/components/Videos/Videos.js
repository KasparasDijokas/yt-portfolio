import React, { useContext } from 'react';
import VideoCard from '../VideoCard/VideoCard';
import './videos.scss';
import { Link } from 'react-router-dom';
import YoutubeContext from '../../YoutubeContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroll-component';
import uuid from 'react-uuid';

const Videos = () => {
  const { sidebarState, data, loadMoreVideos } = useContext(YoutubeContext);

  if (data) {
    return (
      <>
        <div
          className={`overlay ${
            sidebarState && window.innerWidth <= 624 && `show`
          }`}
        ></div>
        <div className="videos">
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
            {data.map((video) => {
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
                    description={video.snippet.description}
                    date={video.snippet.publishedAt}
                    views={video.statistics.viewCount}
                    key={uuid()}
                  />
                </Link>
              );
            })}
          </InfiniteScroll>
        </div>
      </>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default Videos;
