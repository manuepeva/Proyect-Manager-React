import React, { Fragment, useState, useContext } from "react";
import ProyectoContext from "../Context/Proyectos/ProyectoContext";

const NuevoProyecto = () => {
  // Obtener el state del formulario

  const proyectosContext = useContext(ProyectoContext);

  const {
    formulario,
    errorformulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext;

  // State para el proyecto

  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });

  // Extraer nombre del proyecto

  const { nombre } = proyecto;

  // Lee los contenidos del input

  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  // Cuando el usuario registra un proyeco
  const onSubmitProyecto = (e) => {
    e.preventDefault();

    // Validar el proyecto
    if (nombre === "") {
      mostrarError();
      return;
    }

    // Agregar el state si esta todo correcto
    agregarProyecto(proyecto);

    // Reiniciar el form
    guardarProyecto({
      nombre: "",
    });
  };

  // Mostrar el formulario
  const onClickFormulario = () => {
    mostrarFormulario();
  };

  return (
    <Fragment>
      <button
        data-cy="boton-nuevo-proyecto"
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClickFormulario}
      >
        Nuevo Proyecto
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            data-cy="input-nuevo-proyecto"
            type="text"
            className="input-text"
            placeholder="Nombre del Proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />

          <input
            data-cy="submit-nuevo-proyecto"
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}
      {errorformulario ? (
        <p data-cy="alerta" className="mensaje error">El Nombre del Proyecto es Obligatorio</p>
      ) : null}
    </Fragment>
  );
};
export default NuevoProyecto;
