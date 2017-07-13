import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const Button = ({ onClick, className = '', children }) =>
    <button onClick={onClick} className={className} type="button">
      {children}
    </button>

const Search = ({value, onChange, onSubmit, children}) =>
  <form onSubmit={onSubmit}>
    {children}
    <input className="box" type="text" value = {value} onChange = {onChange}/>
    <button type="submit">
      {children}
    </button>
  </form>

const Table = ({ list, onDismiss }) =>
      <div className="table">
        { list.map(item=>
              <div key={item.objectID} className="table-row" >
                <span style={{ width: '40%'}}>
                  <a href={item.url}>
                    {item.title}
                  </a>
                </span>
                <span style={{ width: '30%'}}>
                  {item.author}
                </span>
                <span style={{ width: '10%'}}>
                  {item.num_comments}
                </span>
                <span style={{ width: '10%'}}>
                  {item.points}
                </span>
                <span style={{ width: '10%'}}>
                  <Button onClick={() => onDismiss(item.objectID)} className="button-inLine">
                    Dismiss
                  </Button>
                </span>
              </div>
            )}
      </div>

const isSearched = searchTerm => item => !searchTerm ||
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
 constructor(props){
   super(props);

   this.state={
     result: null,
     searchKey: '',
     searchTerm: DEFAULT_QUERY,
   };

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this)
 }

 needsToSearchTopStories(searchTerm) {
   return !this.state.results[searchTerm];
 }

 onSearchSubmit(event) {
   const { searchTerm } = this.state;
   this.setState({ searchKey: searchTerm});

   if (this.needsToSearchTopStories(searchTerm)) {
     this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
   }
   event.preventDefault();
 }

 setSearchTopStories(result) {
   const { hits, page } = results;
   const { searchKey, results } = this.state;

   const oldHits = results && results[searchKey] ? results[searchKey].hits: [];

   const updatedHits = [...oldHits, ...hits];

   this.setState({
     results: {
     ...results,
     [searchKey]: {hits: updatedHits, page}
   }
   });
 }

 fetchSearchTopStories(searchTerm, page) {
   fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
   .then(response => response.json())
   .then(result => this.setSearchTopStories(result))
   .catch(e => e);
 }

 componentDidMount() {
   const { searchTerm } = this.state;
   this.setState({ searchKey: searchTerm });
   this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
 }

 onSearchChange(event) {
   this.setState({ searchTerm: event.target.value});
 }

 onDismiss(id){
   const { searchKey, results } = this.state;
   const { hits, page } = results[searchKey];

   const isNotId = item => item.objectID !== id;
   const updateHits = hits.filter(isNotId);
   this.setState({
     results: {
      ...results,
      [searchKey]: { hits: updateHits, page }
    }
   });
 }

 render() {
   console.log(this.state);
   const { searchTerm, results, searchKey } = this.state;
   const page = (results && results[searchKey] && results[searchKey.page]) || 0;
   const list = (results && results[searchKey] && results[searchKey].hits) || [];
   return (
     <div className="page">
       <div className="interactions">
       <Search value={searchTerm} onChange={this.onSearchChange}
         onSubmit={this.onSearchSubmit}>
          Search
       </Search>
     </div>
     <Table list={list} onDismiss={this.onDismiss}/>
     <div className="interactions">
     <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
       More
     </Button>
     </div>
       </div>
   );
 }
}

export default App;

// result: {
//   hits: [...]
//   page: 2,
// }
//
// results: {
//   redux: {
//     hits: [...],
//     page: 2
//   },
//   react: {
//     hits: [...],
//     page: 3
//   }
// }
