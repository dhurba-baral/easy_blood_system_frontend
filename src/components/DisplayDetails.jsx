import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar'
import Footer from './Footer'


const DisplayDetails = (props) => {
    const [user, setUser] = useState(null);
    const [alldetails, setAllDetails] = useState({});
    const {id} = useParams();
    useEffect(() => {

        const config = {
            params: {
                _id: localStorage.getItem('_id')
            }
        }
        console.log(config.params._id)
        setUser(config.params._id);

        axios.get(`http://localhost:4000/request/${id}`)
        .then(response => {
            setAllDetails(response.data);
        })
        .catch(err => console.log(err))      
    }, [])
    console.log(alldetails);

    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }

    const handleDelete = (e) => {
        window.confirm("Are you sure you wish to delete this item?") &&
            axios.delete(`http://localhost:4000/request/${id}`, config).then((res) => {
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
                <p>Note: You can help the patient by contacting on their contact details from below or you can post on our offer help page to reach more people.</p>

                <h2>Blood Group: {alldetails.bloodGroup}</h2>
                <p>Name: {alldetails.name}</p>
                <h4 className="strong">Contact Details</h4 >
                <p>Email: {alldetails.email}</p>
                <p>Address: {alldetails.address}</p>
                <p>Phone Number: {alldetails.contact}</p>
                <h4>Details:</h4>
                <p>{alldetails.description}</p>
                <button className="btn btn-primary"><Link to="/offer-help" className="text-light">Offer Help</Link></button>
                {
                    (user) && (
                        <div className='my-3'>
                            <button className='btn btn-secondary'>
                                <Link to={{pathname: `/update/${alldetails.id}`}} className="text-light">Edit</Link></button>
                            <button className='btn btn-danger mx-3'onClick={handleDelete}>Delete</button>
                        </div>
                    )
                }
            </div>
            <Footer/> 
        </>   
    )
}

export default DisplayDetails; 