import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {

  const error = useRouteError();

  return (
    <div>
      <h1>Estos no son los droides que está buscando</h1>
      <h2>Error: {error.statusText || error.message}</h2>
      <h3><Link to="/">Volver al inicio</Link></h3>
      <img src="https://lumiere-a.akamaihd.net/v1/images/62bf0e03e8459d0001f4881b-image_71900d89.jpeg?region=192%2C0%2C1152%2C864" alt="Obi-wan image" />
    </div>
  )
}

export default ErrorPage;