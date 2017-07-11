import React, { Component } from 'react';
import './App.css';

const list = [
 {
   title: 'React',
   url: 'https://facebook.github.io/react',
   author:'Jordan Walke',
   num_comments: 3,
   points: 4,
   objectID: 0
},
 {
   title: 'Redux',
   url: 'https://facebook.github.io/react',
   author:'Dan Abramov, Andrew Clarck',
   num_comments: 2,
   points: 5,
   objectID: 1
 },
];

function isSearched(searchTerm) {
  return function(item) {
    return !searchTerm ||
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase());
  };
}

class App extends Component {
 constructor(props){
   super(props);

   this.state={
     list,
     searchTerm: ''
   };

  this.onSearchChange = this.onSearchChange.bind(this);
   this.onDismiss = this.onDismiss.bind(this)
 }

 onSearchChange(event) {
   this.setState({ searchTerm: event.target.value});
 }

 onDismiss(id){
   const updateList = this.state.list.filter(item => item.objectID !== id);
   this.setState({ list: updateList });
 }

 render() {
   const { searchTerm, list } = this.state;
   return (
     <div className="app">
       <form>
         <input type="text" value = {searchTerm} onChange= {this.onSearchChange}
          />
       </form>
       { this.state.list.filter(isSearched(this.state.searchTerm)).map(item=>
             <div key={item.objectID}>
               <span>
                 <a href={item.url}>
                   {item.title}
                 </a>
               </span>
               <span>
                 {item.author}
               </span>
               <span>
                 {item.num_comments}
               </span>
               <span>
                 {item.points}
               </span>
               <span>
                 <button
                   onClick={() => this.onDismiss(item.objectID)}
                   type="button">
                     Dismiss
                   </button>
               </span>
             </div>
         )}
     </div>
   );
 }
}

export default App;

// import React, { Component } from 'react';
// import './App.css';
//
// const list = [
//   {
//     title: 'React',
//     url: 'https://facebook.github.io/react/',
//     author: 'Jordan Walke',
//     num_comments: 3,
//     points: 4,
//     objectID: 0
//   },
//   {
//     title: 'Redux',
//     url: 'https://github.com/reactjs/redux',
//     author: 'Dan Abramov, Andrew Clark',
//     num_comments: 2,
//     points: 5,
//     objectID: 1
//   }
// ];
//
//
//
// class App extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       list
//     };
//
//     this.onDismiss = this.onDismiss.bind(this)//we bind our class here
//   }
//
//   onDismiss(id) {//we declair our function here
//     const updateList = this.state.list.filter(item => item.objectID !== id);
//     this.setState({ list: updateList });
//   }
//
//   render() {
//     return (
//       <div className="app">
//         {this.state.list.map(function(item) {
//           return( <div key={item.objectID}>
//             <span>
//               <a href={item.url}><h2>{item.title}</h2></a>
//             </span>
//             <span>
//               Author:<h2>{item.author}</h2>
//             </span>
//             <span>
//               Number of Comments:<h3>{item.num_comments}</h3>
//             </span>
//             <span>
//               Points:<h4>{item.points}</h4>
//             </span>
//             <span>
//               <button
//                 onClick = {() => this.onDismiss(item.objectID)}
//                 type="button">
//                   Dismiss
//                 </button>
//             </span>
//           </div>
//         );
//         })}
//       </div>
//     );
//   }
// }
//
// export default App;
