import React, { Component } from "react";
import Form from "../../components/Form";
import { ArticleList } from "../../components/article_list";
import { ArticleListItem } from "../../components/article_list_item";
import AddBtn from "../../components/add_btn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import Panel from "../../components/Panel";
import moment from "moment";

let year = moment().year();
//import ArticleListItem from "./components/article_list_item";

//const API = "24ad0c2914ee4ca7983d996ef1128800";

class Articles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: "",
      begin: "",
      end: "",
      articles: [],
      savedArticles: []
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

  loadArticles = () => {
    API.getArticles().then(() =>
      this.setState({ savedArticles: this.article })
    );
    console.log(this.savedArticles);
  };

  handleAdd = id => {
    const article = this.state.articles.find(article => article._id === id);
    API.saveArticle(article).then(res => this.getArticles());
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
      <Container>
        <div>
          <Row>
            <Col size="md-8">
              <Panel title="Article Search">
                <Form
                  handleInputChange={this.handleInputChange}
                  handleFormSubmit={this.handleFormSubmit}
                  term={this.state.term}
                  begin={this.state.begin}
                  end={this.state.end}
                />
              </Panel>
            </Col>
          </Row>
          <Row>
            <Col size="md-8">
              <Panel title="Results">
                <ArticleList articles={this.state.articles}>
                  {this.state.articles.map(article => (
                    <ArticleListItem key={article._id}>
                      <div>
                        <a href={article.web_url} target="_blank">
                          {article.headline.main}
                        </a>
                      </div>
                      <div>
                        {moment(article.pub_date).format("MMMM DD YYYY")}
                      </div>
                      <AddBtn onClick={this.handleAdd} />
                    </ArticleListItem>
                  ))}
                </ArticleList>
              </Panel>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default Articles;
