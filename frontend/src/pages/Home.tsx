export default function Home() {
  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold mb-4">Welcome to PiTV</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-base-200 p-4 rounded-lg">
          <h2 className="text-xl mb-2">Recent Content</h2>
          <p>Your recently watched content will appear here.</p>
        </div>
        <div className="bg-base-200 p-4 rounded-lg">
          <h2 className="text-xl mb-2">Featured Content</h2>
          <p>Recommended videos and playlists.</p>
        </div>
      </div>
    </div>
  );
}
