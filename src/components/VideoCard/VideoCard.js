import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './videoCard.scss';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import NumberFormat from 'react-number-format';
import ReactTimeAgo from 'react-time-ago';
TimeAgo.addDefaultLocale(en);

const VideoCard = ({
  image,
  channelLogo,
  videoTitle,
  channelName,
  views,
  date,
  description,
}) => {
  const newDate = new Date(date);

  return (
    <div className={`videoCard`}>
      <div className="videoCard__imageContainer">
        <img src={image} alt={videoTitle} className="videoCard__image" />
      </div>

      <div className="videoCard__body">
        <div className="videoCard__videoTitle">
          <Avatar
            src={channelLogo}
            alt="channel logo"
            className="videoCard__avatar"
          />
          <p>{videoTitle}</p>
        </div>
        <p className="videoCard__channelName">{channelName}</p>
        <div className="videoCard__description">
          <NumberFormat
            value={views}
            displayType={'text'}
            thousandSeparator={true}
          />
          <span className="videoCard__span">views</span> <span className="videoCard__span"> • </span>{' '}
          <ReactTimeAgo date={newDate} locale="en-US" />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
