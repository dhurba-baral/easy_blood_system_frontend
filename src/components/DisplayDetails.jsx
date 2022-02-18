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
                id: localStorage.getItem('id')
            }
        }
        console.log(config.params.id)
        setUser(config.params.id);

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
                <p>Note: You can donate/help by contacting on the contact details from below or you can post on our post details page to reach more people.</p>

                <h2>Name: {alldetails.name}</h2>
                <h4 className="strong">Contact Details</h4 >
                <p>Address: {alldetails.address}</p>
                <p>Phone Number: {alldetails.contact}</p>
                <p>Email: {alldetails.email}</p>
                <p>Blood Group: {alldetails.bloodGroup}</p>
                <h4>Details:</h4>
                <p>{alldetails.description}</p>
                <button className="btn btn-primary"><Link to="/offer-help" className="text-light">Donate Blood</Link></button>
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