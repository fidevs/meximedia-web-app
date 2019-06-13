import React, { Component } from 'react';
import Slogan from '../components/home/Slogan';
import Descriptions from '../components/home/Descriptions';
import HomeMain from '../components/home/HomeMain';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NewUser from '../components/home/NewUser'
import Login from '../components/home/Login'

const arrayDesc = [
  {
    title: "Calidad",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe nam atque rerum.",
    imgroute: "img/icons/icon_shopping_cart.png"
  },
  {
    title: "Puntualidad",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe nam atque rerum.",
    imgroute: "img/icons/icon_shopping_cart.png"
  },
  {
    title: "El mejor servicio",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe nam atque rerum.",
    imgroute: "img/icons/icon_shopping_cart.png"
  }
];

function compHome() {
  return(
    <div>
      <Slogan slogan="¡Bienvenido a Nuestra tienda Online!"
        sentence="La mejor opción para tus ventas" />
      <Descriptions array={arrayDesc} />
    </div>
  )
}

export default class Home extends Component {
  render() {
    return (
      <div>
        <Router>
          <HomeMain name="AppName">
            <Route exact path="/index" component={compHome} />
            <Route exact path="/index/signup" component={NewUser} />
            <Route exact path="/index/login" component={Login} />
          </HomeMain>
        </Router>
      </div>
    )
  }
}
