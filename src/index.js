import React, { Component } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import SearchBar from "./components/search_bar";

const API = "24ad0c2914ee4ca7983d996ef1128800";
const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=${API}`

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      selectedArticle: null
    };
  }

  articleSearch(term) {
  } 
  render() {
    const articleSearch = _.debounce(term => {
      this.articleSearch(term);
    }, 500);
    return (
      <div>
        <SearchBar onSearchTermChange={articleSearch} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));