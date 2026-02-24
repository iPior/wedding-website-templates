export const weddingConfig = {
  couple: {
    person1: { firstName: "Emma", lastName: "Whitfield" },
    person2: { firstName: "James", lastName: "Harrington" },
  },
  date: "2026-09-12T15:00:00",
  tagline: "We're getting married!",
  venue: {
    ceremony: {
      name: "St. Andrew's Chapel",
      address: "142 Elm Street, Maplewood, NJ 07040",
    },
    reception: {
      name: "The Lakeview Estate",
      address: "88 Shoreline Drive, Maplewood, NJ 07040",
    },
  },
  rsvpDeadline: "2026-08-01T23:59:59",
  theme: {
    primaryColor: "#8B7355",
    accentColor: "#D4C5A9",
    fontFamily: "Playfair Display",
  },
  schedule: [
    { time: "3:00 PM", event: "Ceremony" },
    { time: "5:30 PM", event: "Cocktail Hour" },
    { time: "6:30 PM", event: "Reception" },
  ],
  faq: [
    {
      question: "What is the deadline to RSVP?",
      answer: "We kindly ask guests to respond no later than August 1, 2026.",
    },
    {
      question: "What is the dress code?",
      answer: "We invite our guests to dress in formal attire for the day.",
    },
    {
      question: "What time should I arrive?",
      answer:
        "The ceremony will begin promptly at 3:00pm. We suggest arriving 15 minutes early. Cocktail hour will begin at 5:30pm and guests are welcome to arrive anytime after.",
    },
    {
      question: "What happens between the ceremony and reception?",
      answer:
        "The wedding party will be taking photos during this time. Feel free to relax, refresh, and prepare for a full evening of celebrating.",
    },
    {
      question: "Can I bring a plus one?",
      answer:
        "Plus-ones have been pre-assigned. Your plus one will pop-up when you RSVP.",
    },
    {
      question: "Is there parking?",
      answer:
        "Yes. There is free parking at both the ceremony and reception venues.",
    },
    {
      question: "What if I have dietary restrictions?",
      answer:
        "You can note any dietary restrictions when you RSVP and we will make sure you are taken care of.",
    },
  ],
  ourStory: {
    title: "Our Story",
    milestones: [
      {
        year: "2018",
        title: "Where it all began",
        description:
          "We met at a friend's housewarming party and spent the entire evening talking on the back porch.",
        image: "",
      },
      {
        year: "2019",
        title: "Our first trip together",
        description:
          "A spontaneous weekend road trip to the coast turned into one of our favorite memories.",
        image: "",
      },
      {
        year: "2021",
        title: "Moving in together",
        description:
          "After two years of dating, we found a cozy apartment and made it our home.",
        image: "",
      },
      {
        year: "2023",
        title: "Adopting Luna",
        description:
          "Our family grew by four paws when we brought home the most lovable golden retriever.",
        image: "",
      },
      {
        year: "2025",
        title: "The Proposal",
        description:
          "A sunset hike to our favorite overlook ended with the most perfect question and an even more perfect yes.",
        image: "",
      },
    ],
  },
  bridalParty: [
    {
      name: "Daniel Moretti",
      role: "Best Man",
      image: "",
      bio: "",
    },
    {
      name: "Olivia Chen",
      role: "Maid of Honor",
      image: "",
      bio: "",
    },
    {
      name: "Marcus Webb",
      role: "Groomsman",
      image: "",
      bio: "",
    },
    {
      name: "Sophie Alvarez",
      role: "Bridesmaid",
      image: "",
      bio: "",
    },
    {
      name: "Ryan Kowalski",
      role: "Groomsman",
      image: "",
      bio: "",
    },
    {
      name: "Priya Nair",
      role: "Bridesmaid",
      image: "",
      bio: "",
    },
    {
      name: "Ethan Brooks",
      role: "Groomsman",
      image: "",
      bio: "",
    },
    {
      name: "Lily Tanaka",
      role: "Bridesmaid",
      image: "",
      bio: "",
    },
    {
      name: "Noah Whitfield",
      role: "Groomsman",
      image: "",
      bio: "",
    },
    {
      name: "Ava Harrington",
      role: "Bridesmaid",
      image: "",
      bio: "",
    },
  ],
} as const;
