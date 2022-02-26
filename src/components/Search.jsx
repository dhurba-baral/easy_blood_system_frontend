import {useState,useEffect} from 'react';
import Navbar from "./Navbar";
import Hero from './Hero'
import Footer from "./Footer";
import {Link} from 'react-router-dom'
import axios from 'axios';


const Search = (props) => {    
    const [searchResult, setSearchResult] = useState([]);
    const [searchRequest, setSearchRequest] = useState([]);
    const [query, setQuery] = useState("");
    const [requestQuery, setRequestQuery] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:4000/donorsearch?bloodGroup=${query}`)
        .then(response => {setSearchResult(response.data)})
        .catch(err => console.log(err))    
    }

    const handleRequestClick = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:4000/requestsearch?bloodGroup=${requestQuery}`)
        .then(response => {setSearchRequest(response.data)})
        .catch(err => console.log(err))    
    }

 
    return (
        <>
        <Navbar/>
        <Hero title="Search" desc="Search blood requests and donors according to your blood group."/>
        <form className="container my-3">
                <div className="form-group my-3">
                    <input type="text" className="form-control" id="bloodgroup" placeholder="Search Donor By Blood Group" onChange={(e) => setQuery(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Search Donor</button>
            </form>

        <div className="container my-5">
        <h2>Search Result for donor</h2>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Full Name</th>
              <th scope="col">Blood-Group</th>
              <th scope="col">Address</th>
              <th scope="col">Contact</th>
              <th scope="col">Email</th>
              <th scope="col">Details</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              searchResult.map((offer, index) => {
                return (
                  <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{offer.name}</td>
                  <td>{offer.bloodGroup}</td>
                  <td>{offer.address}</td>
                  <td>{offer.contact}</td>
                  <td>{offer.email}</td>
                  <td>{offer.description}</td>
                  <td><button className="btn btn-primary"><Link to={{pathname: `/offer-details/${offer.id}`}} className="text-light offerBtn">View Donor</Link></button></td>
                </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>


      <form className="container my-3">
                <div className="form-group my-3">
                    <input type="text" className="form-control" id="bloodgroup" placeholder="Search Blood Request By Blood Group" onChange={(e) => setRequestQuery(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleRequestClick}>Search Request</button>
            </form>

        <div className="container my-5">
        <h2>Search Result for Request</h2>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Full Name</th>
              <th scope="col">Blood-Group</th>
              <th scope="col">Address</th>
              <th scope="col">Contact</th>
              <th scope="col">Email</th>
              <th scope="col">Details</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              searchRequest.map((request, index) => {
                return (
                  <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{request.name}</td>
                  <td>{request.bloodGroup}</td>
                  <td>{request.address}</td>
                  <td>{request.contact}</td>
                  <td>{request.email}</td>
                  <td>{request.description}</td>
                  <td><button className="btn btn-primary"><Link to={{pathname: `/req-details/${request.id}`}} className="text-light offerBtn">View Request</Link></button></td>
                </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
        <Footer/>
        </>
    )
}

export default Search;