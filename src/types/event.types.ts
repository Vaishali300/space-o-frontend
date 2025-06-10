import type { STATUS } from "../lib/constants";

export interface IEvent {
  isCreateEvent: boolean;
  eventState: STATUS;
}

export interface EventFormData {
  name: string;
  description: string;
  images: File[];
  startDate: string;
  endDate: string;
  location: string;
  totalGuests?: number;
  category?: string;
}
