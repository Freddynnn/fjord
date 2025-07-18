import { useEffect, useState } from 'react';

export default function MediaManager() {
  const [creators, setCreators] = useState([]);
  const [mediaItems, setMediaItems] = useState([]);
  const [form, setForm] = useState({ title: '', media_type: '', release_date: '', cover_image_url: '', creator: '' });
  const [creatorName, setCreatorName] = useState('');

  const API_BASE = 'http://localhost:8000/api'; // Adjust for prod

  useEffect(() => {
    fetch(`${API_BASE}/creators/`).then(res => res.json()).then(setCreators);
    fetch(`${API_BASE}/mediaitems/`).then(res => res.json()).then(setMediaItems);
  }, []);

  const addCreator = () => {
    fetch(`${API_BASE}/creators/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: creatorName }),
    })
      .then(res => res.json())
      .then(c => {
        setCreators([...creators, c]);
        setCreatorName('');
      });
  };

  const addMediaItem = () => {
    fetch(`${API_BASE}/mediaitems/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(m => {
        setMediaItems([...mediaItems, m]);
        setForm({ title: '', media_type: '', release_date: '', cover_image_url: '', creator: '' });
      });
  };

  const deleteMediaItem = id => {
    fetch(`${API_BASE}/mediaitems/${id}/`, { method: 'DELETE' })
      .then(() => setMediaItems(mediaItems.filter(m => m.id !== id)));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Add Creator</h2>
      <input
        placeholder="Creator Name"
        value={creatorName}
        onChange={e => setCreatorName(e.target.value)}
        className="border p-1 mr-2"
      />
      <button onClick={addCreator} className="bg-blue-500 text-white px-2 py-1">Add Creator</button>

      <h2 className="text-xl font-bold mt-4 mb-2">Add MediaItem</h2>
      <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="border p-1 block mb-1" />
      <input placeholder="Type (movie/show)" value={form.media_type} onChange={e => setForm({ ...form, media_type: e.target.value })} className="border p-1 block mb-1" />
      <input placeholder="Release Date (YYYY-MM-DD)" value={form.release_date} onChange={e => setForm({ ...form, release_date: e.target.value })} className="border p-1 block mb-1" />
      <input placeholder="Cover Image URL" value={form.cover_image_url} onChange={e => setForm({ ...form, cover_image_url: e.target.value })} className="border p-1 block mb-1" />
      <select value={form.creator} onChange={e => setForm({ ...form, creator: e.target.value })} className="border p-1 block mb-2">
        <option value="">Select Creator</option>
        {creators.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <button onClick={addMediaItem} className="bg-green-500 text-white px-2 py-1">Add MediaItem</button>

      <h2 className="text-xl font-bold mt-4 mb-2">Media Items</h2>
      <ul>
        {mediaItems.map(m => (
          <li key={m.id} className="flex justify-between items-center border p-2 mb-1">
            <div>
              <strong>{m.title}</strong> ({m.media_type}) - {m.release_date}
            </div>
            <button onClick={() => deleteMediaItem(m.id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
