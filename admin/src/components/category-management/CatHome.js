import axios from 'axios';
import React, { Component } from 'react';
import swal from 'sweetalert';
import Footer from '../Footer/Footer';
import SidebarOrder from '../Sidebar-Order/SidebarOrder';



class CatHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }
  retrievePosts() {
    axios.get("http://localhost:8000/admincat").then(res => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingPosts
        });
        console.log(this.state.posts)
      }
    });
  }
  onDelete=(id)=>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {

      if (willDelete) {
        axios.delete(`http://localhost:8000/admincat/delete/${id}`).then((res)=>{
      swal("Deleted Successful", "Category is removed", "success");
      this.retrievePosts();
    })
        // swal("Poof! Your imaginary file has been deleted!", {
        //   icon: "success",
        // });
      } else {
        swal("Your imaginary file is safe!");
      }
    });

    
  }

  filterData(posts,searchKey){
    const result =posts.filter((post)=>
    post.name.toLowerCase().includes(searchKey)||
    post.type.toLowerCase().includes(searchKey)
   
    
    )
    this.setState({posts:result})
  }
  
  handleSearchArea =(e) =>{
    const searchKey=e.currentTarget.value;
  
    axios.get("http://localhost:8000/admincat").then(res =>{
      if(res.data.success){
  
        this.filterData(res.data.existingPosts,searchKey)
      }
    });
  }

  render() {
    return (
     <div>
        <SidebarOrder/>
        <br/>
        <br/>
      <div className="container">
        <div className="text-center">
        <h3 className="adminletter"> Category / SubCategory Summary </h3>
        </div>
      <br/>
      <br/>
      
        <div className="col-md-6 mb-4">
        <form class="form-inline">
        <i class="fas fa-search" aria-hidden="true"></i>
          <input
          className="form-control form-control-sm ml-3 w-75"
          type="search"
          placeholder="search"
          name="searchQuery"
          onChange={this.handleSearchArea}>
          </input>
          </form>
        </div>

      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Category ID</th>
            <th scope="col">Category/Sub Category Name</th>
            <th scope="col">Parent ID</th>
            <th scope="col">Parent Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.posts.map((posts,index)=>(
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>
                  <a href={`/category/post/${posts._id}`} style={{textDecoration:'none'}}>
                  {posts.name}
                </a>
                  </td>
                
                <td>{posts.parentId}</td>
                <td>{posts.type}</td>
                
                <td>
                  <a className="btn btn-warning" href={`/category/edit/${posts._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a className="btn btn-danger" href="#" onClick={()=>this.onDelete(posts._id)}>
                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
            )) }
        </tbody>
        <br/>
        <br/>
        <div className="text-center">
        <button className="btn btn-success"><a href="/category/add" style={{textDecoration:'none',color:'white'}}>Add new Category</a></button>
        </div>
      </table>
       
      </div>
      <br/>
      <br/>
      <Footer />
      </div>
    )
  }
}


export default CatHome;