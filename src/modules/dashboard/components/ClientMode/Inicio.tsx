import ConsumoDiario from './ConsumoDiario'; 

const Inicio = () => {
  return (
    <div className="mt-8 space-y-6">
      {/* Card de Consumo Diario */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">Consumo Diario</h3>
        <p className="text-gray-600 mb-4 text-sm">
          Visualización de tu consumo de hidrogeno por día. La línea representa la tendencia de tu uso a lo largo de la semana.
        </p>
        <div className="w-full overflow-x-auto"> {/* Para evitar desbordamiento horizontal en móviles */}
          <ConsumoDiario />
        </div>
      </div>

      {/* Aquí podrías añadir otro gráfico en un card similar */}
      {/* Ejemplo de otro gráfico (simulado) */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">Consumo Anual</h3>
        <p className="text-gray-600 mb-4 text-sm">
          Descripción concisa del segundo gráfico.
        </p>
        <div className="w-full overflow-x-auto">
          {/* <OtroGrafico /> */}
          {/* <p className="text-gray-400 text-center py-8">Aquí iría otro gráfico...</p> */}
          <ConsumoDiario />
        </div>
      </div>
    </div>
  );
};

export default Inicio;