import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 text-center font-sans antialiased overflow-hidden relative">
      
      {/* Elementos decorativos de fondo (luces de discoteca tenues) */}
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative z-10 flex flex-col items-center max-w-lg">
        {/* Número 404 Estilizado */}
        <h1 class="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 drop-shadow-lg mb-4">
          404
        </h1>
        
        {/* Título Temático */}
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">
          La pista está vacía
        </h2>
        
        {/* Mensaje */}
        <p class="text-neutral-400 text-base md:text-lg mb-10 max-w-md">
          Parece que el DJ no tiene este tema en su repertorio o la invitación se perdió en el camino.
        </p>
        
        {/* Botón de Inicio */}
        <Link
          href="/"
          class="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-200 bg-neutral-900 border border-neutral-700 rounded-xl hover:bg-neutral-800 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-900/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
        >
          <span class="absolute left-0 w-0 h-full transition-all duration-300 ease-out bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl group-hover:w-full opacity-0 group-hover:opacity-10"></span>
          <span class="relative flex items-center gap-2">
            <svg class="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Volver a la fiesta
          </span>
        </Link>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: '404: Pista Vacía - VibeDrop',
  meta: [
    {
      name: 'description',
      content: 'Página no encontrada en VibeDrop.',
    },
  ],
};
