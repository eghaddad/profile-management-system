'use client';

import { useProfile } from '../hooks/useProfile';

export default function Home() {
  const { data: profile, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">
          Error loading profile. Please log in.
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Profile Management System</h1>
        
        {profile ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Display Name
                </label>
                <p className="mt-1 text-lg">{profile.displayName}</p>
              </div>
              
              {profile.bio && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <p className="mt-1">{profile.bio}</p>
                </div>
              )}
              
              {profile.avatarUrl && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Avatar
                  </label>
                  <img
                    src={profile.avatarUrl}
                    alt="Profile avatar"
                    className="mt-2 w-32 h-32 rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p>No profile found. Create one to get started!</p>
          </div>
        )}
      </div>
    </main>
  );
}
