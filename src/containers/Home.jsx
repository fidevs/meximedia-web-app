import React, { Component } from 'react';
import Slogan from '../components/Slogan.jsx';
import Descriptions from '../components/Descriptions.jsx';
import HomeMain from '../components/HomeMain.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NewUser from '../components/NewUser'
import Login from '../components/Login'

const arrayDesc = [
  {
    title: "Titulo de info 1",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe nam atque rerum.",
    imgroute: "img/icons/icon_shopping_cart.png"
  },
  {
    title: "Titulo de info 2",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe nam atque rerum.",
    imgroute: "img/icons/icon_shopping_cart.png"
  },
  {
    title: "Titulo de info 3",
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
            <Route exact path="/" component={compHome} />
            <Route exact path="/signup" component={NewUser} />
            <Route exact path="/login" component={Login} />
          </HomeMain>
        </Router>
      </div>
    )
  }
}
