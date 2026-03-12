import { component$ } from '@builder.io/qwik';
import { routeAction$, Form, z, zod$ } from '@builder.io/qwik-city';
import { addSongRequest } from '../../../../lib/db';

export const useRequestSongAction = routeAction$(
  async (data, { params }) => {
    const eventId = params.eventId;
    await addSongRequest({
      eventId,
      title: data.title,
      artist: data.artist,
      guestName: data.guestName || undefined,
    });
    return { success: true };
  },
  zod$({
    title: z.string().min(1, 'El título de la canción es obligatorio.'),
    artist: z.string().min(1, 'El artista es obligatorio.'),
    guestName: z.string().optional(),
  })
);

export default component$(() => {
  const action = useRequestSongAction();

  return (
    <div class="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans antialiased">
      <div class="w-full max-w-md bg-neutral-900 shadow-2xl rounded-3xl p-8 border border-neutral-800">
        <div class="text-center mb-10">
          <h1 class="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
            VibeDrop
          </h1>
          <p class="text-neutral-400 text-sm">Pide tu canción al DJ y haz vibrar la pista.</p>
        </div>

        {action.value?.success && (
          <div class="mb-6 p-4 bg-green-950/50 border border-green-500/20 text-green-400 rounded-xl text-center text-sm font-medium animate-pulse">
            ¡Canción enviada al DJ con éxito!
          </div>
        )}

        <Form action={action} class="space-y-5">
          <div class="space-y-1.5">
            <label for="title" class="block text-sm font-medium text-neutral-300">
              Canción <span class="text-pink-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Ej: Tití Me Preguntó"
              class="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
            />
            {action.value?.fieldErrors?.title && (
              <p class="text-red-400 text-xs mt-1">{action.value.fieldErrors.title[0]}</p>
            )}
          </div>

          <div class="space-y-1.5">
            <label for="artist" class="block text-sm font-medium text-neutral-300">
              Artista <span class="text-pink-500">*</span>
            </label>
            <input
              type="text"
              id="artist"
              name="artist"
              required
              placeholder="Ej: Bad Bunny"
              class="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
            />
            {action.value?.fieldErrors?.artist && (
              <p class="text-red-400 text-xs mt-1">{action.value.fieldErrors.artist[0]}</p>
            )}
          </div>

          <div class="space-y-1.5">
            <label for="guestName" class="block text-sm font-medium text-neutral-300">
              Tu Nombre <span class="text-neutral-500 font-normal">(opcional)</span>
            </label>
            <input
              type="text"
              id="guestName"
              name="guestName"
              placeholder="¿Quién la pide?"
              class="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
            />
          </div>

          <div class="pt-4">
            <button
              type="submit"
              class="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-purple-900/20 transform transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              disabled={action.isRunning}
            >
              {action.isRunning ? (
                <span class="flex items-center gap-2">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : (
                'Pedir Canción'
              )}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
});
