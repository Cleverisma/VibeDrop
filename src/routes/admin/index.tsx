import { component$, useSignal, $ } from '@builder.io/qwik';
import QRCode from 'qrcode';

export default component$(() => {
  const eventName = useSignal('');
  const eventId = useSignal('');
  const qrCodeUrl = useSignal('');
  const isGenerating = useSignal(false);
  const copyFeedback = useSignal('');

  const generateQRCode = $(async () => {
    // Validar que el nombre del evento no esté vacío
    if (!eventName.value.trim()) return;

    isGenerating.value = true;
    
    try {
      // Slugificar el nombre para generar un eventId limpio y seguro para URL
      const slug = eventName.value
        .trim()
        .toLowerCase()
        // Remover acentos y diacríticos
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        // Remover caracteres no alfanuméricos excepto espacios y guiones
        .replace(/[^a-z0-9\s-]/g, '')
        // Reemplazar espacios y múltiples guiones por un solo guión
        .replace(/[\s-]+/g, '-')
        // Quitar guiones a los extremos
        .replace(/^-+|-+$/g, '');

      eventId.value = slug;

      // Crear URL completa del invitado (basada en el origin actual)
      const guestLink = `${window.location.origin}/fiesta/${slug}`;

      // Generar el código QR en base64
      const dataUrl = await QRCode.toDataURL(guestLink, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000FF', // Código QR negro
          light: '#FFFFFFFF', // Fondo blanco para mayor contraste
        },
      });

      qrCodeUrl.value = dataUrl;
    } catch (err) {
      console.error('Error al generar el Código QR:', err);
    } finally {
      isGenerating.value = false;
    }
  });

  const copyToClipboard = $(async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      copyFeedback.value = type;
      setTimeout(() => {
        copyFeedback.value = '';
      }, 2000);
    } catch (err) {
      console.error('Fallo al copiar:', err);
    }
  });

  return (
    <div class="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans antialiased">
      <div class="w-full max-w-lg bg-neutral-900 shadow-2xl rounded-3xl p-8 border border-neutral-800">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-extrabold tracking-tight text-white mb-2">
            Panel <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Admin</span>
          </h1>
          <p class="text-neutral-400 text-sm">Crea nuevos eventos para VibeDrop y genera su QR.</p>
        </div>

        {/* Input de Nombre del Evento */}
        <div class="space-y-4 mb-8">
          <div class="space-y-1.5">
            <label for="eventName" class="block text-sm font-medium text-neutral-300">
              Nombre de la Fiesta o Evento
            </label>
            <input
              type="text"
              id="eventName"
              bind:value={eventName}
              placeholder="Ej: Boda de Ana y Juan"
              class="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
              onKeyDown$={(e) => {
                if (e.key === 'Enter') {
                  generateQRCode();
                }
              }}
            />
          </div>

          <button
            onClick$={generateQRCode}
            disabled={!eventName.value.trim() || isGenerating.value}
            class="w-full bg-neutral-100 text-neutral-900 hover:bg-white font-bold py-3.5 px-6 rounded-xl shadow-lg transform transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isGenerating.value ? 'Generando...' : 'Generar Evento y QR'}
          </button>
        </div>

        {/* Tarjeta de Resultados */}
        {qrCodeUrl.value && (
          <div class="mt-8 pt-8 border-t border-neutral-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div class="flex flex-col items-center gap-6">
              
              <div class="text-center">
                <h2 class="text-lg font-bold text-white mb-1">Código QR Generado</h2>
                <p class="text-xs text-neutral-400">ID: {eventId.value}</p>
              </div>

              {/* Imagen QR */}
              <div class="bg-white p-3 rounded-2xl shadow-xl shadow-purple-900/10">
                <img 
                  src={qrCodeUrl.value} 
                  alt={`QR de ${eventName.value}`} 
                  width="250" 
                  height="250"
                  class="rounded-xl"
                />
              </div>

              <div class="w-full flex gap-3">
                <a
                  href={qrCodeUrl.value}
                  download={`VibeDrop-QR-${eventId.value}.png`}
                  class="flex-1 flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
                >
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" x2="12" y1="15" y2="3"></line>
                  </svg>
                  Descargar QR
                </a>
              </div>

              {/* Links Rápidos */}
              <div class="w-full space-y-3 mt-2">
                
                {/* Enlace al DJ Dashboard */}
                <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex justify-between items-center group">
                  <div class="flex flex-col truncate pr-4">
                    <span class="text-xs font-semibold text-neutral-500 mb-0.5 uppercase tracking-wider">DJ Dashboard</span>
                    <span class="text-sm text-neutral-300 truncate font-mono">
                      /dj/dashboard/{eventId.value}
                    </span>
                  </div>
                  <button 
                    onClick$={() => copyToClipboard(`${window.location.origin}/dj/dashboard/${eventId.value}`, 'dj')}
                    class="p-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors flex-shrink-0 text-neutral-400 hover:text-white"
                    title="Copiar Link DJ"
                  >
                    {copyFeedback.value === 'dj' ? (
                      <svg class="w-4 h-4 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                      </svg>
                    )}
                  </button>
                </div>

                {/* Enlace Invitado */}
                <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex justify-between items-center group">
                  <div class="flex flex-col truncate pr-4">
                    <span class="text-xs font-semibold text-pink-500 mb-0.5 uppercase tracking-wider">Link Invitados</span>
                    <span class="text-sm text-neutral-300 truncate font-mono">
                      /fiesta/{eventId.value}
                    </span>
                  </div>
                  <button 
                    onClick$={() => copyToClipboard(`${window.location.origin}/fiesta/${eventId.value}`, 'guest')}
                    class="p-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors flex-shrink-0 text-neutral-400 hover:text-white"
                    title="Copiar Link Invitados"
                  >
                    {copyFeedback.value === 'guest' ? (
                      <svg class="w-4 h-4 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                      </svg>
                    )}
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
