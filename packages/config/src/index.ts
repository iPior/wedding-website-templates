export type WeddingConfig = {
  couple: {
    person1: { firstName: string; lastName: string };
    person2: { firstName: string; lastName: string };
  };
  date: string;
  tagline: string;
  venue: {
    ceremony: { name: string; address: string };
    reception: { name: string; address: string };
  };
  rsvpDeadline: string;
  theme: {
    primaryColor: string;
    accentColor: string;
    fontFamily: string;
  };
  schedule: ReadonlyArray<{ time: string; event: string }>;
  faq: ReadonlyArray<{ question: string; answer: string }>;
  ourStory: {
    title: string;
    milestones: ReadonlyArray<{
      year: string;
      title: string;
      description: string;
      image: string;
    }>;
  };
  bridalParty: ReadonlyArray<{
    name: string;
    role: string;
    image: string;
    bio: string;
  }>;
};
