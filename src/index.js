import React, { Component } from "react";
import ReactDOM from "react-dom";
import { SearchBar } from "./components/search_bar";
import { NumberInput } from "./components/number_input";
import {ArticleList} from "./components/article_list";
import {ArticleListItem} from "./components/article_list_item";
import SearchBtn from "./components/search_btn";
import AddBtn from "./components/add_btn";
import moment from "moment";

let year = moment().year();
//import ArticleListItem from "./components/article_list_item";

//const API = "24ad0c2914ee4ca7983d996ef1128800";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: "news",
      begin: "",
      end: "",
      articles: []
    };
  }
  articleSearch = (term, begin, end) => {
    if (!begin) {
      begin = 1852;
    }
    if (!end) {
      end = year;
    }
    console.log(term, begin, end);
    let api = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&begin_date=${begin}0101&end_date=${end}1231&api-key=24ad0c2914ee4ca7983d996ef1128800`;
    console.log(api);
    fetch(api).then(response => {
      response.json().then(data => {
        // eslint-disable-next-line
          this.setState({ articles: data.response.docs });
      });
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.articleSearch(this.state.term, this.state.begin, this.state.end);
    this.setState({
      term: "",
      begin: "",
      end: ""
    });
  };

  render() {
    return (
      <div>
        <form>
          <SearchBar
            value={this.state.term}
            name="term"
            onChange={this.handleInputChange}
          />
          <NumberInput
            value={this.state.begin}
            name="begin"
            onChange={this.handleInputChange}
          />
          <NumberInput
            value={this.state.end}
            name="end"
            onChange={this.handleInputChange}
          />
          <SearchBtn onClick={this.handleFormSubmit}>Search</SearchBtn>
        </form>
        <ArticleList articles={this.state.articles}>
        {this.state.articles.map(article =>
        <ArticleListItem key={article._id}><div><a href={article.web_url}>{article.headline.main}</a></div><div>Date: {article.pub_date}</div><AddBtn /></ArticleListItem>)}
        
         </ArticleList>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
