import React, {useContext} from 'react';
import './sidebar.scss';
import SidebarLink from '../SidebarLink/SidebarLink';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import HistoryIcon from '@material-ui/icons/History';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import YoutubeContext from '../../YoutubeContext';

const Sidebar = () => {
    const { sidebarState } = useContext(YoutubeContext);
    
  return (
    <div className={`sidebar ${sidebarState && `show`}`}>
      <SidebarLink linkTo="/" Icon={HomeIcon}>
        Home
      </SidebarLink>
      <SidebarLink linkTo="/trending" Icon={WhatshotIcon}>
        Trending
      </SidebarLink>
      <SidebarLink linkTo="/subscriptions" Icon={SubscriptionsIcon}>
        Subscriptions
      </SidebarLink>
      <hr/>
      <SidebarLink linkTo="/library" Icon={LibraryAddCheckIcon}>
        Library
      </SidebarLink>
      <SidebarLink linkTo="/history" Icon={HistoryIcon}>
        History
      </SidebarLink>
      <SidebarLink linkTo="/your-videos" Icon={OndemandVideoIcon}>
        Your videos
      </SidebarLink>
      <SidebarLink linkTo="/watch-later" Icon={WatchLaterIcon}>
        Watch Later
      </SidebarLink>
      <SidebarLink linkTo="/liked-videos" Icon={ThumbUpAltIcon}>
        Liked videos
      </SidebarLink>
    </div>
  );
};

export default Sidebar;
