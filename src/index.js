import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyCQP0-IfGOheQ-fooZ5Mq1LdlUZZiQ-POA';


// Create a new component. This component should produce seom HTML
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch("reactjs to the moon");
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term}, videos => {
      console.log(videos)
      this.setState({
        videos,
        selectedVideo: videos[0]
      })
    });
  }
  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 500);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  };
}

// Take this component's generate HTML and put inspect
// on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
