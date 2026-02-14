import { AnimationComponent } from "../../animation/AnimationComponent";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../../services/config";
import NovedadItem from "./EventItem";

interface Event {
  title: string;
  date: string;
  description: string;
  category: 'Evento' | 'Reconocimiento';
  image: string;
}

const getImageUrl = (url: string): string => {
  if (!url) return "";
  const needsProxy = (u: string) =>
    u?.includes("external") || u?.includes("wp-content");

  if (needsProxy(url)) {
    return `${API_BASE_URL}/proxy_image.php?url=${encodeURIComponent(url)}`;
  }
  return url;
};

const Eventos = () => {
  const [eventos, setEventos] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get_novedades.php?plataforma=hidranix&tipo=evento&limit=6`);
        const data = await response.json();

        const mappedEventos = data.map((item: any) => ({
          title: item.titulo,
          date: item.fecha,
          description: item.descripcion,
          category: item.categoria,
          image: getImageUrl(item.imagen),
        }));

        setEventos(mappedEventos);
      } catch (error) {
        console.error('Error al cargar eventos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="eventos" className="w-full py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white overflow-x-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600">Cargando eventos...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="eventos" className="w-full py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimationComponent
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary-light to-slate-900 bg-clip-text text-transparent">
                Eventos
              </span>
            </h2>
          </div>
        </AnimationComponent>

        <AnimationComponent
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.3, duration: 0.8 } }
          }}
        >
          <p className="text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto mb-16 px-4">
            Participaciones y logros destacados de Hidranix.
          </p>
        </AnimationComponent>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full">
          {eventos.map((event, index) => (
            <NovedadItem key={index} event={event} animationDelay={0.1 + index * 0.2} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Eventos;
