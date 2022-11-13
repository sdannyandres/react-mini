import React from 'react'
import axios from 'axios'
import {useQuery} from "react-query"



function getProductos() {
  return axios.get('http://localhost:8080/sql?sql=select * from products order by product_name')
}

export function Producto() {
  const {data: productos, isLoading, isError} = useQuery(['productos'], getProductos)

  if (isLoading) {
    return <div>Cargando...</div>
}
 
return (
  <table className="table">
    <thead>
      <tr>
        <th>Id</th>
        <th>Nombre</th>
        <th>Precio</th>
      </tr>
    </thead>
    <tbody>
      {productos.data(producto => (
        <tr key={producto.product_id}>
          <td>{producto.product_id}</td>
          <td>{producto.product_name}</td>
          <td>{producto.unit_price}</td>
        </tr>
        ))}
    </tbody>
  </table>
)
}
  