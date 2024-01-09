import React from "react";
import github from "../img/github.svg";
import linkedin from "../img/linkedin.svg";
import instagram from "../img/instagram.svg";
import mail from "../img/mail.svg";

let year = new Date().getFullYear();
let creator_name =  "Shubham"

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="social-icon">
          <a
            href="https://github.com/rancho-shubh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} className="icon github" alt="" />
          </a>
          <a
            href="https://www.linkedin.com/in/shubham-7050a9206"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} className="icon" alt="" />
          </a>
          <a
            href="mailto:20je0930@ece.iitism.ac.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={mail} className="icon" alt="" />
          </a>
        </div>
        <div className="personal-info">
          <p>Created with ❤️ using MERN by </p>
          <h4>
            <span className="symbol">{creator_name}</span>
          </h4>
          <h6>Full Stack Developer</h6>
        </div>
        <h5 style={{ textAlign: "center" }}>
          Copyright © {year} {creator_name}. All rights reserved.
        </h5>
      </div>
      {/* <div className="About">
    <div>
      <h1>About the project</h1>
      <p>
        
      </p>
    </div>
  </div> */}
    </>
  );
};

export default Footer;
