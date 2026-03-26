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

export const contentData: SiteContent = {
  aboutUsText: "Aparoksha isn't just another tech fest — it's a real test of your skills. Whether you're cracking challenges in the CTF, building smart predictive models in Ex-Machina, or battling it out in the Coding Premier League, this is where the best minds come to push their limits. So, are you ready to play?",
  flyerLink: "/main/APK_timeline.pdf",
  eventsBrochureLink: "/events/APK_events.pdf",
  contactEmail: "team.aparoksha@iiita.ac.in",
  studentCoordinators: [
    { name: "Ashutosh", phone: "+91 85275 79527" },
    { name: "Parth", phone: "+91 90673 02534" },
    { name: "Manik Chadgal", phone: "+91 70064 62311" }
  ],
  facultyIncharge: [
    { name: "Bibhas Ghoshal", phone: "+91 84003 37989" }
  ]
};
