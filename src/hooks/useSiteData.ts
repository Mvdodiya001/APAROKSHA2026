import { useState, useEffect } from 'react';
import { TimelineDay } from '../data/timeline';
import { SiteContent } from '../data/content';

export function useTimeline() {
  const [data, setData] = useState<TimelineDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/timeline.json')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(json => {
        if (json && Array.isArray(json)) {
          setData(json);
        }
      })
      .catch(err => {
        console.error('CRITICAL: Could not fetch timeline.json.', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { timelineData: data, loading };
}

export function useContent() {
  const [data, setData] = useState<SiteContent>({} as SiteContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/content.json')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(json => {
        if (json && typeof json === 'object') {
          setData(json);
        }
      })
      .catch(err => {
        console.error('CRITICAL: Could not fetch content.json.', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { contentData: data, loading };
}
