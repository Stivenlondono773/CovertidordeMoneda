import React, { useRef, useState, useEffect } from "react";

export default function ListaTareas() {
  const eurosRef = useRef(null);
  const cambioRef = useRef(null);
  const [valorCambio, setValorCambio] = useState(null);
  useEffect(() => {
    const llamarApi = async () => {
      try {
        const respuesta = await fetch(
          "https://v6.exchangerate-api.com/v6/169cc59005b21c194cd4dde5/latest/USD"
        );
        const datos = await respuesta.json();

        setValorCambio(datos.conversion_rates.COP);
        
      } catch(error){
        console.error("Error al ingresar a la API: ", error);
      }
    };

    llamarApi(); // Llamar a la función para realizar la solicitud
  }, []); // El array de dependencias vacío asegura que se ejecute solo una vez

  const resultado = () => {
    if (eurosRef.current && cambioRef.current) {
      const valor = parseFloat(eurosRef.current.value);
      if (!isNaN(valor)) {
        const dolares = valor*valorCambio;
        cambioRef.current.innerHTML = dolares.toFixed(2) + "$"; // Usar toFixed para formatear a 2 decimales
      } else {
        cambioRef.current.innerHTML = "Ingrese un número válido";
      }
    } else {
      console.log("Algun ref no está asignado");
    }
  };

  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <h2>Convertidor USD/COP</h2>
        <p></p>
        <div className="input">
          <input type="text" ref={eurosRef} className="dato" />
        </div>
        <p></p>
        <div>
          <button onClick={resultado} className="boton">
            Calcular
          </button>
        </div>
        <p></p>
        <div ref={cambioRef} className="convertido"></div>
      </div>
    </div>
  );
}
