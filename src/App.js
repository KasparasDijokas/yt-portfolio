import './App.scss';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Videos from './components/Videos/Videos';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Watch from './pages/Watch';
import React, { useState } from 'react';
import YoutubeContext from './YoutubeContext';
import useAxios from './hooks/useAxios';

function App() {
  const [input, setInput] = useState('javascript');
  const [token, setToken] = useState(false);
  const [sidebarState, setSidebarState] = useState(false);
  const { videos, nextPageToken } = useAxios(input, token);

  // get user search Input
  const userSearchHandler = (userInput) => {
    setInput(userInput);
  };

  // load more videos when user scrolls to the bottom of the page
  const loadMoreVideos = () => {
    setToken(nextPageToken);
  };

  // toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarState((prev) => {
      return !prev;
    });
  };

  return (
    <YoutubeContext.Provider
      value={{
        keyword: input,
        sidebarState: sidebarState,
        data: videos,
        loadMoreVideos: loadMoreVideos,
      }}
    >
      <div className="app">
        <Router>
          <Header
            userSearchHandler={userSearchHandler}
            toggleSidebar={toggleSidebar}
          />
          <Switch>
            <Route exact path="/">
              <Home toggleSidebar={toggleSidebar} />
            </Route>
            <Route exact path="/watch/:id" component={Watch} />

            <Sidebar />
            <Videos />
          </Switch>
        </Router>
      </div>
    </YoutubeContext.Provider>
  );
}

export default App;
