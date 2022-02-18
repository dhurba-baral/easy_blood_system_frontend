import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Navbar from './Navbar';
import Hero from './Hero';
import Footer from './Footer';
// import People from './people';

const Home = () => {
const [request, setRequest] = useState([]);  
const [donors, setDonor] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/request')
    .then(response => setRequest(response.data))
    .catch(err => console.log(err)) 
  }, [])

  useEffect(() => {
    axios.get('http://localhost:4000/donor')
    .then(response => setDonor(response.data))
    .catch(err => console.log(err)) 
  }, [])


    return (
        <>
        <Navbar/>
      <Hero title="Easy Blood System" desc="A live portal to post blood request,search for donor and post blood details"/>
      <div className="container my-5">
        <h2>Live Blood Requests List</h2>
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
              request.map((req, index) => {
                return (
                  <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{req.name}</td>
                  <td>{req.bloodGroup}</td>
                  <td>{req.address}</td>
                  <td>{req.contact}</td>
                  <td>{req.email}</td>
                  <td>{req.description}</td>
                  <td><button className="btn btn-primary"><Link className="text-light offerBtn" to={{pathname: `/req-details/${req.id}`}}>View Request</Link></button></td>
                  {/* <a href="/offer-help" className="text-light offerBtn"></a> */}
                </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>


      <div className="container my-5">
        <h2>Live Donors List</h2>
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
              donors.map((donor, index) => {
                return (
                  <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{donor.name}</td>
                  <td>{donor.bloodGroup}</td>
                  <td>{donor.address}</td>
                  <td>{donor.contact}</td>
                  <td>{donor.email}</td>
                  <td>{donor.description}</td>
                  <td><button className="btn btn-primary"><Link to={{pathname: `/offer-details/${donor.id}`}} className="text-light offerBtn">View Donor</Link></button></td>
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

export default Home;