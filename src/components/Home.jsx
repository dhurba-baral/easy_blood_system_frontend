import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Navbar from './Navbar';
import Hero from './Hero';
import Footer from './Footer';
// import People from './people';

const Home = () => {
const [people, setPeople] = useState([]);  
const [offers, setOffer] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/request')
    .then(response => setPeople(response.data))
    .catch(err => console.log(err)) 
  }, [])

  useEffect(() => {
    axios.get('http://localhost:4000/donor')
    .then(response => setOffer(response.data))
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
              people.map((person, index) => {
                return (
                  <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{person.name}</td>
                  <td>{person.bloodGroup}</td>
                  <td>{person.address}</td>
                  <td>{person.contact}</td>
                  <td>{person.email}</td>
                  <td>{person.description}</td>
                  <td><button className="btn btn-primary"><Link className="text-light offerBtn" to={{pathname: `/req-details/${person.id}`}}>View Request</Link></button></td>
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
              offers.map((offer, index) => {
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
      <Footer/>
        </>
    )
}

export default Home;