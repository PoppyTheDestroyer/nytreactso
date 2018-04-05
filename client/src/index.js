import React, { Component } from "react";
import ReactDOM from "react-dom";
import { SearchBar } from "./components/search_bar";
import { NumberInput } from "./components/number_input";
import { ArticleList } from "./components/article_list";
import { ArticleListItem } from "./components/article_list_item";
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
      term: "",
      begin: "",
      end: "",
      articles: []
    };
  }
  articleSearch = (term, begin, end) => {
    if (!begin) {
      begin = 18520101;
    }
    if (!end) {
      end = year + "1231";
    } else {
      begin = begin.replace(/-/g, "");
      end = end.replace(/-/g, "");
    }
    let api = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&begin_date=${begin}&end_date=${end}&api-key=24ad0c2914ee4ca7983d996ef1128800`;
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
          <label htmlFor="term">Search</label>
          <SearchBar
            className="col-md-4"
            value={this.state.term}
            name="term"
            onChange={this.handleInputChange}
          />
          <br />
          <label htmlFor="begin">Start Date (Optional)</label>
          <NumberInput
            className="col-md-4"
            value={this.state.begin}
            name="begin"
            onChange={this.handleInputChange}
          />
          <br />
          <label htmlFor="end">End Date (Optional)</label>
          <NumberInput
            className="col-md-4"
            value={this.state.end}
            name="end"
            onChange={this.handleInputChange}
          />
          <br />
          <SearchBtn onClick={this.handleFormSubmit}>Search</SearchBtn>
        </form>
        <ArticleList articles={this.state.articles}>
          {this.state.articles.map(article => (
            <ArticleListItem key={article._id}>
              <div>
                <a href={article.web_url} target="_blank">
                  {article.headline.main}
                </a>
              </div>
              <div>{moment(article.pub_date).format("MMMM DD YYYY")}</div>
              <AddBtn />
            </ArticleListItem>
          ))}
        </ArticleList>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
