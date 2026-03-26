export interface Coordinator {
  name: string;
  phone: string;
}

export interface SiteContent {
  aboutUsText: string;
  flyerLink: string;
  eventsBrochureLink: string;
  contactEmail: string;
  studentCoordinators: Coordinator[];
  facultyIncharge: Coordinator[];
}

