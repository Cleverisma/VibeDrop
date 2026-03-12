export interface SongRequest {
  id: string;
  eventId: string;
  title: string;
  artist: string;
  guestName?: string;
  status: 'pending' | 'played';
  createdAt: Date;
}

// In-memory mock database
const requests: SongRequest[] = [];

export const getRequestsByEvent = async (eventId: string): Promise<SongRequest[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return requests
    .filter((req) => req.eventId === eventId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const addSongRequest = async (
  requestData: Omit<SongRequest, 'id' | 'status' | 'createdAt'>
): Promise<SongRequest> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newRequest: SongRequest = {
    ...requestData,
    id: crypto.randomUUID(),
    status: 'pending',
    createdAt: new Date(),
  };
  requests.push(newRequest);
  return newRequest;
};

export const markRequestAsPlayed = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const req = requests.find((r) => r.id === id);
  if (req) {
    req.status = 'played';
  }
};
