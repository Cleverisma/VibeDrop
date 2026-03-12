import { component$, useSignal, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import { routeLoader$, routeAction$, Form, useLocation } from '@builder.io/qwik-city';
import { getRequestsByEvent, markRequestAsPlayed, supabase, type SongRequest } from '../../../../lib/db';

export const useSongsLoader = routeLoader$(async ({ params }) => {
  const eventId = params.eventId;
  const requests = await getRequestsByEvent(eventId);
  return requests;
});

export const useMarkPlayedAction = routeAction$(async (data) => {
  const reqId = data.id as string;
  if (reqId) {
    await markRequestAsPlayed(reqId);
  }
  return { success: true };
});

export default component$(() => {
  const initialRequests = useSongsLoader();
  const markPlayedAction = useMarkPlayedAction();
  const location = useLocation();
  const eventId = location.params.eventId;

  const requests = useSignal<SongRequest[]>([]);

  useTask$(({ track }) => {
    track(() => initialRequests.value);
    requests.value = [...initialRequests.value];
  });

  useVisibleTask$(({ cleanup }) => {
    const channel = supabase
      .channel(`song_requests_${eventId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'song_requests',
          filter: `event_id=eq.${eventId}`,
        },
        (payload) => {
          const newRequest = payload.new as SongRequest;
          requests.value = [newRequest, ...requests.value];
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'song_requests',
          filter: `event_id=eq.${eventId}`,
        },
        (payload) => {
          const updatedRequest = payload.new as SongRequest;
          requests.value = requests.value.map((req) =>
            req.id === updatedRequest.id ? updatedRequest : req
          );
        }
      )
      .subscribe();

    cleanup(() => {
      supabase.removeChannel(channel);
    });
  });

  const pendingRequests = requests.value.filter((r) => r.status === 'pending');
  const playedRequests = requests.value.filter((r) => r.status === 'played');

  return (
    <div class="min-h-screen bg-neutral-950 text-neutral-100 p-4 md:p-8 font-sans">
      <div class="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <h1 class="text-3xl font-extrabold tracking-tight text-white mb-1">DJ Dashboard</h1>
            <p class="text-neutral-400">Gestionando solicitudes para VibeDrop</p>
          </div>
          <div class="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 flex items-center gap-3">
            <div class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span class="text-sm font-medium text-neutral-300">Live Updates</span>
          </div>
        </header>

        {/* Board */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Pending requests column */}
          <div class="flex flex-col gap-4">
            <h2 class="text-xl font-bold text-neutral-200 flex items-center gap-2">
              <span class="bg-purple-500/20 text-purple-400 px-2.5 py-0.5 rounded-full text-sm">
                {pendingRequests.length}
              </span>
              Pendientes
            </h2>
            
            {pendingRequests.length === 0 ? (
              <div class="bg-neutral-900/50 border border-neutral-800/50 rounded-2xl p-8 text-center text-neutral-500">
                Aún no hay canciones en cola...
              </div>
            ) : (
              <div class="space-y-3">
                {pendingRequests.map((req) => (
                  <div key={req.id} class="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 hover:border-purple-500/30 transition-colors group">
                    <div class="flex justify-between items-start gap-4">
                      <div>
                        <h3 class="font-bold text-lg text-white mb-0.5">{req.title}</h3>
                        <p class="text-pink-400 text-sm font-medium mb-3">{req.artist}</p>
                        {req.guest_name && (
                          <div class="inline-flex items-center gap-1.5 bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-neutral-400">
                            <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            {req.guest_name}
                          </div>
                        )}
                      </div>
                      
                      <Form action={markPlayedAction}>
                        <input type="hidden" name="id" value={req.id} />
                        <button 
                          type="submit"
                          class="bg-neutral-800 hover:bg-green-600/20 text-neutral-300 hover:text-green-400 border border-neutral-700 hover:border-green-500/30 p-2.5 rounded-xl transition-all duration-200 active:scale-95 tooltip"
                          title="Marcar como reproducida"
                        >
                          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 6 9 17l-5-5"></path>
                          </svg>
                        </button>
                      </Form>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Played requests column */}
          <div class="flex flex-col gap-4">
            <h2 class="text-xl font-bold text-neutral-400 flex items-center gap-2">
              <span class="bg-neutral-800 text-neutral-400 px-2.5 py-0.5 rounded-full text-sm">
                {playedRequests.length}
              </span>
              Reproducidas
            </h2>
            
            <div class="space-y-3 opacity-60">
              {playedRequests.map((req) => (
                <div key={req.id} class="bg-neutral-900 border border-neutral-800/50 rounded-2xl p-4">
                  <div class="flex justify-between items-center gap-4">
                    <div>
                      <h3 class="font-medium text-neutral-300 line-through">{req.title}</h3>
                      <p class="text-neutral-500 text-sm">{req.artist}</p>
                    </div>
                    <span class="text-xs font-semibold uppercase tracking-wider text-neutral-500 bg-neutral-950 px-2 py-1 rounded">
                      Played
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
});
