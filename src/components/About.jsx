import Navbar from './Navbar';
import Footer from './Footer'
import Hero from './Hero';

const About = () => {

    return (
        <>
            <Navbar/>
            <Hero title="About" desc="A brief description about Easy Blood System"/>
            <div className="container">
                <div className="text-center about-description">

                <p>Easy Blood System is a is a web based application where any patient in need for
blood can post blood requests, search for donor according to the required blood
group, and others who can donate the blood can register their name and can offer
help to those in need for blood in real time</p>                             
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default About;