import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface SongRequest {
  id: string;
  event_id: string;
  title: string;
  artist: string;
  guest_name: string | null;
  status: 'pending' | 'played';
  created_at: string;
}

export const getRequestsByEvent = async (eventId: string): Promise<SongRequest[]> => {
  const { data, error } = await supabase
    .from('song_requests')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching requests:', error);
    return [];
  }
  return data as SongRequest[];
};

export const addSongRequest = async (requestData: {
  eventId: string;
  title: string;
  artist: string;
  guestName?: string;
}): Promise<SongRequest | null> => {
  const { data, error } = await supabase
    .from('song_requests')
    .insert([
      {
        event_id: requestData.eventId,
        title: requestData.title,
        artist: requestData.artist,
        guest_name: requestData.guestName || null,
        status: 'pending',
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error adding request:', error);
    return null;
  }
  return data as SongRequest;
};

export const markRequestAsPlayed = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('song_requests')
    .update({ status: 'played' })
    .eq('id', id);

  if (error) {
    console.error('Error updating request:', error);
  }
};
