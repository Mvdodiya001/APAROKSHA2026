import { useState, useEffect } from 'react';
import { timelineData as builtinTimelineData, TimelineDay } from '../data/timeline';
import { contentData as builtinContentData, SiteContent } from '../data/content';

export function useTimeline() {
  const [data, setData] = useState<TimelineDay[]>(builtinTimelineData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('./timeline.json')
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
        console.warn('Could not fetch timeline.json, falling back to bundled data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { timelineData: data, loading };
}

export function useContent() {
  const [data, setData] = useState<SiteContent>(builtinContentData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('./content.json')
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
        console.warn('Could not fetch content.json, falling back to bundled data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { contentData: data, loading };
}
