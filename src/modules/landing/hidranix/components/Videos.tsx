import { AnimationComponent } from "../../animation/AnimationComponent";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

const videos: Video[] = [
  {
    id: "BjBpNyLLxMM",
    title: "Hidranix - Conectarse para Crecer 2024",
    thumbnail: "https://img.youtube.com/vi/BjBpNyLLxMM/maxresdefault.jpg"
  },
  {
    id: "OvYsbLnjrqY",
    title: "SolarX 2025 HIDRANIX",
    thumbnail: "https://img.youtube.com/vi/OvYsbLnjrqY/maxresdefault.jpg"
  },
  {
    id: "lDfHkr3y6to",
    title: "VIDEO ATIPAQ 2025",
    thumbnail: "https://img.youtube.com/vi/lDfHkr3y6to/maxresdefault.jpg"
  },
];

const Videos = () => {
  return (
    <section id="videos" className="w-full py-20 md:py-32 bg-gradient-to-b from-white to-blue-50 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimationComponent
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary-light to-slate-900 bg-clip-text text-transparent">
                Videos
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-4">
              Conoce más sobre Hidranix a través de nuestros videos. Descubre cómo funciona la tecnología del hidrógeno verde.
            </p>
            <div className="mt-6">
              <a
                href="https://www.youtube.com/@Hidranix/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a2.997 2.997 0 0 0-2.11-2.11C19.568 3.5 12 3.5 12 3.5s-7.568 0-9.388.576A2.997 2.997 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.997 2.997 0 0 0 2.11 2.11c1.82.576 9.388.576 9.388.576s7.568 0 9.388-.576a2.997 2.997 0 0 0 2.11-2.11C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.75 15.568V8.432L15.818 12l-6.068 3.568z"/>
                </svg>
                Ver todos los videos en YouTube
              </a>
            </div>
          </div>
        </AnimationComponent>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full">
          {videos.map((video, index) => (
            <AnimationComponent
              key={video.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.2
                  }
                }
              }}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              </div>
            </AnimationComponent>
          ))}
        </div>

        {/* Mensaje cuando no hay videos configurados */}
        {videos.length === 0 && (
          <AnimationComponent
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 0.3, duration: 0.6 } }
            }}
          >
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a2.997 2.997 0 0 0-2.11-2.11C19.568 3.5 12 3.5 12 3.5s-7.568 0-9.388.576A2.997 2.997 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.997 2.997 0 0 0 2.11 2.11c1.82.576 9.388.576 9.388.576s7.568 0 9.388-.576a2.997 2.997 0 0 0 2.11-2.11C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.75 15.568V8.432L15.818 12l-6.068 3.568z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Próximamente más contenido
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Estamos preparando videos increíbles sobre Hidranix. Mientras tanto, visita nuestro canal de YouTube para ver todo el contenido disponible.
              </p>
            </div>
          </AnimationComponent>
        )}
      </div>
    </section>
  );
};

export default Videos;