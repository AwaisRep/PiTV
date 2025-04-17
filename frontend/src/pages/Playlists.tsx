import { GetProfiles } from "@wailsjs/go/client/Client";
import { models } from "@wailsjs/go/models";
import { useState, useEffect } from "react";

export default function Home() {
  // Use the Wails-generated Profile type instead of creating your own
  const [profiles, setProfiles] = useState<models.Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Define async function inside useEffect
    const loadProfiles = async (): Promise<void> => {
      try {
        setLoading(true);
        // GetProfiles already returns the correct type from Wails
        const profileData = await GetProfiles();
        
        // Set state with the correctly typed data
        setProfiles(profileData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load profiles:", err);
        // Properly handle Wails RuntimeError types
        setError(err instanceof Error ? err.message : "Unable to load profiles");
        setLoading(false);
      }
    };

    // Call the async function
    loadProfiles();
  }, []);

  // The rest of your component logic with proper conditional rendering...
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-base-content">Loading profiles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-error bg-opacity-10 rounded-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-error">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-primary text-primary-content rounded-lg"
          onClick={(): void => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome to PiTV</h1>
      
      {profiles.length === 0 ? (
        <div className="bg-base-200 p-6 rounded-lg text-center">
          <p className="mb-4">No profiles found. Add your first IPTV profile to get started.</p>
          <button className="px-4 py-2 bg-primary text-primary-content rounded-lg">
            Add Profile
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-4">Select a profile to start streaming</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <div 
                key={profile.ID} 
                className="bg-base-200 rounded-lg p-6 hover:bg-base-300 transition-colors cursor-pointer"
              >
                <h2 className="text-xl font-semibold">{profile.name}</h2>
                <p className="text-sm opacity-70 mb-2">Host: {profile.host}</p>
                <p className="text-sm opacity-70 mb-4">
                  Type: {profile.login_type === 1 ? "Xtream API" : 
                         profile.login_type === 2 ? "M3U Playlist" : 
                         profile.login_type === 3 ? "Local File" : "Unknown"}
                </p>
                <div className="flex justify-end">
                  <button className="px-3 py-1 bg-primary text-primary-content text-sm rounded-md">
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
