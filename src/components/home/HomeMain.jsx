import React, { Component } from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Parallax} from 'react-parallax';

import '../../css/home/HomeMain.css'

const socialData = [
  {
    label: "facebook",
    text: "/meximedia",
    link: "https://www.facebook.com/meximedia.cuauhtemoc",
    imgRoute: "img/icons/icon_facebook.png"
  },
  {
    label: "whatsapp",
    text: "(775) 74 25 8 23",
    link: "#whatsapp",
    imgRoute: "img/icons/icon_whatsapp.png"
  },
  {
    label: "maps",
    text: "Cuahut&#233;moc, 104, Col. Centro Tulancingo de Bravo Hgo.",
    link: "https://www.google.com/maps/place/Movistar+Tulancingo/@20.0814614,-98.3688931,21z/data=!4m8!1m2!3m1!2sMovistar+Tulancingo!3m4!1s0x85d056f594fa8805:0x99d3cdc55397b4f7!8m2!3d20.0814655!4d-98.3689917",
    imgRoute: "img/icons/icon_marker.png"
  }
];

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      lnks: [
        {
          link : "/index/login",
          label: "Iniciar Sesión"
        },
        {
          link : "/index/signup",
          label: "Registrarse"
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <Parallax bgImage="img/backgrounds/NlpTF9.jpg" strength={800}>
          <div className="jumbotro jumbotron-fluid">
            <div className="container">

              <nav className="navbar navbar-expand-lg sticky-top">
                <Link to="/index" className="navbar-brand mb-0 h1 text-light">{this.props.name}</Link>
                <button className="navbar-toggler"
                type="button" data-toggle="collapse"
                data-target="#navbarApp" aria-controls="navbarApp"
                aria-expanded="false" aria-label="Toggle Navigation">
                  <img src="img/icons/icon_menu.png" alt="menu"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarApp">
                  <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    {
                      this.state.lnks.map((data, i) => {
                        return (
                          <li className="nav-item" key={i}>
                            <Link to={data.link} className="nav-link text-light rounded">{data.label}</Link>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </nav>

              <hr/>

              {this.props.children}

              <div className="footer mt-4 p-3 text-center text-light text-wrap">
                {this.props.name} &copy; - 2019
                {
                  socialData.map((data, i) => {
                    return (
                      <OverlayTrigger
                      key={i}
                      placement="top"
                      overlay={
                        <Tooltip id={i + "-tooltip"}>
                          {data.text}
                        </Tooltip>
                      } >
                        <a href={data.lnk}>
                          <img className="ml-2" src={data.imgRoute} alt={data.label}/>
                        </a>
                      </OverlayTrigger>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </Parallax>
      </div>
    )
  }
}