import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar'
import Footer from './Footer'


const OfferDetails = (props) => {
    const {id} = useParams();
    const [user, setUser] = useState(null);
    const [alldetails, setAllDetails] = useState({});

    useEffect(() => {

        const config = {
            params: {
                _id: localStorage.getItem('_id')
            }
        }
        // console.log(config.params._id)
        setUser(config.params._id);

    axios.get(`http://localhost:4000/donor/${id}`)
        .then(response => {
           setAllDetails(response.data);
        })
        .catch(err => console.log(err))      
    }, [])


    // console.log(alldetails);

    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }

    const handleDelete = (e) => {
        window.confirm("Are you sure you wish to delete this item?") &&
            axios.delete(`http://localhost:4000/donor/${id}`, config).then((res) => {
                console.log(res.data);
                props.history.push('/');
                
            }).catch((error) => {
                console.log(error)
            })
    }

    
    return (
        <>
            <Navbar/>
            <div className="container my-5">
                <p>Note: If the details matches your requirement for blood-group, contact donor and get help ASAP.</p>

                <h2>Blood-group: {alldetails.bloodGroup}</h2>
                <p>Name: {alldetails.name}</p>
                <h4 className="strong">Contact Details</h4 >
                <p>Email: {alldetails.email}</p>
                <p>Phone Number: {alldetails.contact}</p>
                <p>Address: {alldetails.address}</p>
                <h4>Details:</h4>
                <p>{alldetails.description}</p>
                <button className="btn btn-primary"><Link to="/get-help" className="text-light">Request Blood</Link></button>
                {
                    (user) && (
                        <div className='my-3'>
                            <button className='btn btn-secondary'>
                                <Link to={{pathname: `/offer-update/${alldetails.id}`}} className="text-light">Edit</Link></button>
                            <button className='btn btn-danger mx-3'onClick={handleDelete}>Delete</button>
                        </div>
                    )
                }
            </div>
            <Footer/> 
        </>   
    )
}

export default OfferDetails; 