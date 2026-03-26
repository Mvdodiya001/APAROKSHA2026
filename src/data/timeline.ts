export interface TimelineEvent {
  id: string;
  name: string;
  time: string;
  description?: string;
  link?: string;
}

export interface TimelineDay {
  day: string;
  events: TimelineEvent[];
}

