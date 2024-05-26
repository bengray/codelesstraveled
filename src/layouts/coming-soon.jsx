import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/images/logo/clt-logo-v3.png";

const comingSoon = () => {
    return (
        <div className="container text-center">
            <div className="row justify-content-center mt-5">
                <div className="col-6">
                    <img src={logo} alt="Code Less Traveled Logo" />
                    <p className="lead">coming soon...</p>
                </div>
            </div>
            <div className="row mt-5 justify-content-md-center">
                <div className="col-xs-12 col-sm-6 text-start">
                    Hi, I'm Ben Gray.  I've been developing software for the web for over 20 years.  I've built and enhanced systems for myriad different businesses; from Wall Street advisors, to high voltage R&D labratories, power companies, multi-national news agencies, automotive retailers, magazine publishers, point of sale providers, furniture retailers and flooring retailers.<br/><br/>

                    Now I'm taking all my experience and bringing it to the world.<br/><br/>

                    I'm choosing the road less traveled by.<br/><br/>

                    Welcome to <span style={{fontFamily:"Courier",color:"#000",fontSize:"1.2em"}}>Code Less Traveled</span>.
                </div>
            </div>
            <div className="row mt-5 justify-content-md-center">
                <div className="col-xs-12 col-md-6 text-center">
                    Let's build something great together!<br/>
                    Contact me: <a href="mailto:&#098;&#101;&#110;&#064;&#099;&#111;&#100;&#101;&#108;&#101;&#115;&#115;&#116;&#114;&#097;&#118;&#101;&#108;&#101;&#100;&#046;&#099;&#111;&#109;">&#098;&#101;&#110;&#064;&#099;&#111;&#100;&#101;&#108;&#101;&#115;&#115;&#116;&#114;&#097;&#118;&#101;&#108;&#101;&#100;&#046;&#099;&#111;&#109;</a>
                </div>
            </div>
        </div>
    )
}

export default comingSoon