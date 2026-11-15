import { useCallback, useState } from 'react';

const FAVORITES_KEY = 'clinpharm_topic_favorites_v1';
const RECENTS_KEY = 'clinpharm_topic_recents_v1';
const MAX_RECENT_TOPICS = 12;

function readIds(key: string): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, value: string[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Topic navigation remains available when storage is unavailable.
  }
}

export function useTopicHistory() {
  const [favorites, setFavorites] = useState<string[]>(readIds(FAVORITES_KEY));
  const [recentTopics, setRecentTopics] = useState<string[]>(readIds(RECENTS_KEY));

  const toggleFavorite = useCallback((topicId: string) => {
    setFavorites(current => {
      const next = current.includes(topicId)
        ? current.filter(id => id !== topicId)
        : [topicId, ...current];
      writeIds(FAVORITES_KEY, next);
      return next;
    });
  }, []);

  const recordVisit = useCallback((topicId: string) => {
    setRecentTopics(current => {
      const next = [topicId, ...current.filter(id => id !== topicId)].slice(0, MAX_RECENT_TOPICS);
      writeIds(RECENTS_KEY, next);
      return next;
    });
  }, []);

  return { favorites, recentTopics, toggleFavorite, recordVisit };
}
