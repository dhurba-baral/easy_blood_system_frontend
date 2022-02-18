import {useState} from 'react';
import Navbar from "./Navbar";
import Hero from './Hero'
import Footer from "./Footer";
import axios from 'axios';


const GetHelp = (props) => {    
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [email, setEmail] = useState("");
    const [value, setValue] = useState();
    const [details, setDetails] = useState("");

    const helpDesc="Choose your blood group!";  

    // const handleClick = e => {
    //     e.preventDefault();
    //     const data = { email,
    //         name,
    //         contactNumber: phoneNum,
    //         category: value,
    //         details  }

    //     const config = {
    //         headers: {
    //             Authorization: 'Bearer ' + localStorage.getItem('token')
    //         }
    //     }

    //     axios.post(`http://localhost:4000/request`, data, config).then((res) => {
    //         if (res.data.errorMessage) {
    //             return console.log(res.data.errorMessage);
    //         }
    //         console.log(res.data, "Request saved in DB")
    //     })
    //         .catch((error) => {
    //             console.log(error);
    //         });

    //     // console.log(title, body)
    //     props.history.push('/');


    // }

    const handleClick = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/request', {
            name,
            address,
            contact: phoneNum,
            email,
            bloodGroup: value,
            description: details    
        })
        .then(response => {
            console.log(response);
            props.history.push('/')
        })
        .catch(err => console.log(err))        
    }
    return (
        <>
        <Navbar/>
        <Hero title="Post Request" desc="Need help for yourself or someone you know? Fill the form below and someone will contact you."/>
        <form className="container my-3">
                <div className="form-group my-3">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" className="form-control" id="fullName" placeholder="Enter Full Name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="fullAddress">Full Address</label>
                    <input type="text" className="form-control" id="fullAddress" placeholder="Enter Full Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="tel" className="form-control" id="phoneNumber" placeholder="Enter Phone Number" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)}/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="getHelpFor">{helpDesc}</label>
                    <select className="form-select" value={value}
      onChange={e => setValue(e.currentTarget.value)}>
                        <option defaultValue>Choose your blood group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="details">Other Details</label>
                    <textarea className="form-control" id="details" rows="5" value={details} onChange={e => setDetails(e.target.value)}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        <Footer/>
        </>
    )
}

export default GetHelp;