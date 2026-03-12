import { component$ } from '@builder.io/qwik';
import { Link, type DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-purple-500/30">
      
      {/* Navbar Simple */}
      <nav class="border-b border-neutral-900 bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              VibeDrop
            </span>
          </div>
          <Link
            href="/admin"
            class="text-sm font-semibold text-neutral-300 hover:text-white transition-colors"
          >
            Panel DJ
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main class="relative overflow-hidden">
        {/* Glows Decorativos de Fondo */}
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
        <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

        <section class="relative max-w-6xl mx-auto px-4 pt-24 pb-32 md:pt-36 md:pb-40 flex flex-col items-center text-center">
          
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-sm text-neutral-400 font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            Revoluciona tus eventos
          </div>

          <h1 class="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 max-w-5xl">
            La pista de baile, conectada directamente a la  
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 pt-2">
              cabina.
            </span>
          </h1>

          <p class="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Permite que los invitados de tu fiesta pidan sus canciones favoritas escaneando un código QR, sin interrumpir el flow del DJ.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link
              href="/admin"
              class="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-900/30"
            >
              <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <span class="relative flex items-center gap-2">
                Crear Sala para mi Evento
                <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </Link>
          </div>
          
        </section>

        {/* Features Section */}
        <section class="max-w-6xl mx-auto px-4 pb-32 relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Beneficio 1 */}
            <div class="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 backdrop-blur-sm hover:border-purple-500/30 transition-colors animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
              <div class="w-12 h-12 bg-purple-900/30 text-purple-400 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v20"></path>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">Cero Fricción</h3>
              <p class="text-neutral-400 leading-relaxed">
                Los invitados no descargan nada, ni se registran. Escanean tu QR exclusivo en la mesa y piden la canción al instante desde su navegador.
              </p>
            </div>

            {/* Beneficio 2 */}
            <div class="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 backdrop-blur-sm hover:border-fuchsia-500/30 transition-colors animate-in fade-in slide-in-from-bottom-12 duration-700 delay-[600ms]">
              <div class="w-12 h-12 bg-fuchsia-900/30 text-fuchsia-400 rounded-2xl flex items-center justify-center mb-6 border border-fuchsia-500/20">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">Tiempo Real</h3>
              <p class="text-neutral-400 leading-relaxed">
                El DJ recibe las notificaciones de los pedidos al instante en su dashboard privado conectado directamente a Supabase.
              </p>
            </div>

            {/* Beneficio 3 */}
            <div class="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 backdrop-blur-sm hover:border-pink-500/30 transition-colors animate-in fade-in slide-in-from-bottom-12 duration-700 delay-[700ms]">
              <div class="w-12 h-12 bg-pink-900/30 text-pink-400 rounded-2xl flex items-center justify-center mb-6 border border-pink-500/20">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">Control Total</h3>
              <p class="text-neutral-400 leading-relaxed">
                El DJ marca las canciones como escuchadas, manteniendo una lista limpia. Tú decides qué suena y qué se descarta en la pista.
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* Footer Minimalista */}
      <footer class="border-t border-neutral-900 py-8">
        <div class="max-w-6xl mx-auto px-4 flex flex-col items-center">
          <p class="text-neutral-500 text-sm font-medium">
            © {new Date().getFullYear()} VibeDrop. Creado para DJs y Dueños de Salones.
          </p>
        </div>
      </footer>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'VibeDrop | Conecta la pista de baile con el DJ',
  meta: [
    {
      name: 'description',
      content: 'Permite a los invitados pedir canciones por QR sin interrumpir al DJ.',
    },
  ],
};
