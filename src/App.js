import './App.css';
import React , { Component } from 'react';
import ReactPaginate from 'react-paginate';


class App extends Component{
  state = {
    users: null,
    total: null,
    per_page: null,
    current_page:1
  }
  componentDidMount()
  {
    this.request(1);

  }
  request = async pageNumber =>{
   const response = await fetch(`https://reqres.in/api/users?page=${pageNumber}`,{
    method: 'GET',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    
    },
  });
  const data = await response.json();
  console.log(data)
  this.setState({
    users: data.data,
    total: data.total,
    per_page: data.per_page,
    current_page: data.page,


  })
}
render(){
  let users, renderPageNumbers;

  if (this.state.users !== null) {
    users = this.state.users.map(user => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
      </tr>
    ));
  }

  const pageNumbers = [];
  if (this.state.total !== null) {
    for (let i = 1; i <= Math.ceil(this.state.total / this.state.per_page); i++) {
      pageNumbers.push(i);
    }


renderPageNumbers = pageNumbers.map(number => {
  let classes = this.state.current_page === number ;

  return (
    <span key={number} className={classes} onClick={() => this.request(number)}>{number}</span>
  );
});
}
return(
  <div >

        <table className = 'Table'>
          <thead>
            <tr>
              <th>S/N</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </table>
       
        <div>
          
          <span onClick={() => this.request(1)}>&laquo;</span>
          {renderPageNumbers}
          <span onClick={() => this.request(1)}>&raquo;</span>
        </div>
</div>
);

}}



export default App;
