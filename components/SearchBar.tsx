'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchResult {
  FirstName?: string;
  LastName?: string;
  Headline?: string;
  [key: string]: string | number | boolean | undefined;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://chakra-python-backend.onrender.com/api/search?question=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResults(data.results || []);
      
      if (data.results?.length === 0) {
        setError('No results found');
      }
    } catch (error) {
      console.error('Search failed:', error);
      setError('Failed to perform search. Please try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: What profiles are from Stockhom, Sweden? ..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isLoading ? (
            <span>Searching...</span>
          ) : (
            <div className="flex items-center gap-2">
              <Search size={20} />
              <span>Search</span>
            </div>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 text-red-600 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      {results && results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Results ({results.length})</h2>
          <div className="space-y-4">
            {results.map((profile, index) => (
              <div key={index} className="p-4 border rounded-lg bg-card">
                <h4 className="font-bold">{profile.FirstName || 'No name provided'} {profile.LastName || 'No name provided'}</h4>
                <p className="text-sm text-muted-foreground">{profile.Headline || 'No headline available'}</p>
                {/* Display other profile fields as needed */}
                <div className="mt-2 text-sm">
                  {Object.entries(profile)
                    .filter(([key]) => !['FirstName', 'LastName', 'Headline'].includes(key))
                    .map(([key, value]) => (
                      <div key={key} className="text-muted-foreground">
                        <span className="font-medium">{key}: </span>
                        {String(value)}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 