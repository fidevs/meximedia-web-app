import React, { Component } from 'react';
import HomeMain from '../components/HomeMain.jsx';
import NewUser from '../components/NewUser.jsx'

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

const lnks = [
  {
    link: "/login",
    label: "Iniciar Sesión"
  }
]

export default class Register extends Component {
  render() {
    return (
      <HomeMain name="AppName" social={socialData} navsl={lnks}>
        <NewUser />
      </HomeMain>
    )
  }
}
