import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Masbajoin = () => {
  return (
    <div className="container mt-5 p-4 shadow-lg rounded" style={{ backgroundColor: "#f8f9fa" }}>
      <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active fw-bold text-uppercase"
            id="who-we-are-tab"
            data-bs-toggle="tab"
            data-bs-target="#who-we-are"
            type="button"
            role="tab"
            aria-controls="who-we-are"
            aria-selected="true"
            style={{ color: "#0e1fba" }}
          >
            ¿Quiénes somos?
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link fw-bold text-uppercase"
            id="vision-tab"
            data-bs-toggle="tab"
            data-bs-target="#vision"
            type="button"
            role="tab"
            aria-controls="vision"
            aria-selected="false"
            style={{ color: "#0e1fba" }}
          >
            Nuestra Visión
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link fw-bold text-uppercase"
            id="mission-tab"
            data-bs-toggle="tab"
            data-bs-target="#mission"
            type="button"
            role="tab"
            aria-controls="mission"
            aria-selected="false"
            style={{ color: "#0e1fba" }}
          >
            Misión
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link fw-bold text-uppercase"
            id="objective-tab"
            data-bs-toggle="tab"
            data-bs-target="#objective"
            type="button"
            role="tab"
            aria-controls="objective"
            aria-selected="false"
            style={{ color: "#0e1fba" }}
          >
            Objetivo
          </button>
        </li>
      </ul>
      <div className="tab-content pt-4" id="myTabContent">
        <div className="tab-pane fade show active text-center" id="who-we-are" role="tabpanel" aria-labelledby="who-we-are-tab">
          <p className="lead" style={{ color: "#555" }}>Descripción sobre nosotros.</p>
        </div>
        <div className="tab-pane fade text-center" id="vision" role="tabpanel" aria-labelledby="vision-tab">
          <p className="lead" style={{ color: "#555" }}>
            Nuestra visión es proporcionar a los abogados una herramienta integral y fácil de usar que optimice la gestión de clientes, simplifique la comunicación y mejore la eficiencia en la práctica legal, permitiendo que los profesionales se enfoquen en brindar el mejor servicio a sus clientes.
          </p>
        </div>
        <div className="tab-pane fade text-center" id="mission" role="tabpanel" aria-labelledby="mission-tab">
          <p className="lead" style={{ color: "#555" }}>
            Nuestra misión es proporcionar a los abogados una herramienta integral y fácil de usar que optimice la gestión de clientes, simplifique la comunicación y mejore la eficiencia en la práctica legal, permitiendo que los profesionales se enfoquen en brindar el mejor servicio a sus clientes.
          </p>
        </div>
        <div className="tab-pane fade text-center" id="objective" role="tabpanel" aria-labelledby="objective-tab">
          <p className="lead" style={{ color: "#555" }}>
            Nuestro objetivo es facilitar a los abogados la gestión eficiente de clientes mediante funcionalidades que incluyan el seguimiento de casos, la gestión de documentos, todo en un solo lugar, con el fin de aumentar la satisfacción del cliente y optimizar el tiempo de trabajo.
          </p>
        </div>
      </div>
    </div>
  );
};
