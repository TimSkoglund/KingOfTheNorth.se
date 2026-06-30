import type { SiteContent } from "./types";

export const defaultContent: SiteContent = {
  nav: {
    home: {
      sv: "Hem",
      en: "Home"
    },
    tournament: {
      sv: "Turnering",
      en: "Tournament"
    },
    schedule: {
      sv: "Schema",
      en: "Schedule"
    },
    rules: {
      sv: "Regler",
      en: "Rules"
    },
    venue: {
      sv: "Plats",
      en: "Venue"
    },
    contact: {
      sv: "Kontakt",
      en: "Contact"
    }
  },
  hero: {
    eyebrow: {
      sv: "EuroBowl Poland 2026 Rules Warm-up",
      en: "EuroBowl Poland 2026 Rules Warm-up"
    },
    title: {
      sv: "KING OF THE NORTH",
      en: "KING OF THE NORTH"
    },
    subtitle: {
      sv: "EuroBowl Poland 2026 Rules, 5 rundor. 1-2 augusti, Björneborgsgatan 20, Sundsvall.",
      en: "EuroBowl Poland 2026 Rules, 5 rounds. August 1-2, Björneborgsgatan 20, Sundsvall."
    },
    primaryCta: {
      sv: "Registrera dig",
      en: "Register now"
    },
    secondaryCta: {
      sv: "Se schema",
      en: "View schedule"
    }
  },
  facts: [
    {
      sv: "NAF-sanktionerad",
      en: "NAF sanctioned"
    },
    {
      sv: "Blood Bowl 2025",
      en: "Blood Bowl 2025"
    },
    {
      sv: "5 rundor",
      en: "5 rounds"
    },
    {
      sv: "Resurrection",
      en: "Resurrection"
    }
  ],
  tournament: {
    title: {
      sv: "Turneringsinformation",
      en: "Tournament Information"
    },
    body: {
      sv: "King of the North är en Sundsvallsturnering som spelas över fem matcher den 1-2 augusti. Turneringen har plats för max 12 deltagare och kostar 150 kr. NAF-medlemskapsavgift kan tillkomma.",
      en: "King of the North is a Sundsvall tournament played over five games on August 1-2. The tournament has room for up to 12 coaches and costs 150 SEK. A NAF membership fee may be added."
    },
    format: [

    ],
    details: [
      {
        label: {
          sv: "Datum",
          en: "Date"
        },
        value: {
          sv: "1-2 Augusti",
          en: "August 1-2"
        }
      },
      {
        label: {
          sv: "Arrangör",
          en: "Organiser"
        },
        value: {
          sv: "Tim \"Zedd\" Skoglund",
          en: "Tim \"Zedd\" Skoglund"
        }
      },
      {
        label: {
          sv: "Adress",
          en: "Address"
        },
        value: {
          sv: "Björneborgsgatan 20, Sundsvall",
          en: "Björneborgsgatan 20, Sundsvall"
        }
      },
      {
        label: {
          sv: "Kostnad",
          en: "Entry fee"
        },
        value: {
          sv: "150 kr. NAF-medlemskapsavgift kan tillkomma.",
          en: "150 SEK. NAF membership fee may be added."
        }
      },
      {
        label: {
          sv: "Betalning",
          en: "Payment"
        },
        value: {
          sv: "0702613853 - ange nick och NAF-nr.",
          en: "0702613853 - include nickname and NAF number."
        }
      },
      {
        label: {
          sv: "Antal matcher",
          en: "Games"
        },
        value: {
          sv: "5",
          en: "5"
        }
      },
      {
        label: {
          sv: "Sista anmälningsdag",
          en: "Registration deadline"
        },
        value: {
          sv: "26 juli",
          en: "July 26"
        }
      },
      {
        label: {
          sv: "Max deltagare",
          en: "Max coaches"
        },
        value: {
          sv: "12",
          en: "12"
        }
      }
    ],
    maxCoaches: 12,
    oddmanSlots: 2,
    importantLinks: [
      {
        label: {
          sv: "Anmälan via TourPlay",
          en: "Register via TourPlay"
        },
        href: "https://tourplay.net/en/blood-bowl/king-of-the-north",
        icon: "/assets/images/logos/tourplay_logo_512.png"
      },
      {
        label: {
          sv: "Rosterregler",
          en: "Roster rules"
        },
        href: "https://www.eurobowl.eu/entrance-options/",
        icon: "/assets/images/logos/EB2026_logo_white.png"
      }
    ],
    eventRulesTitle: {
      sv: "Arrangemangsregler",
      en: "Event Rules"
    },
    eventRules: [
      {
        sv: "Matcherna är 2h 15min. Om en coach önskar spela med klocka så måste man gå med på det.",
        en: "Games are 2h 15min. If a coach asks to use a clock, the request must be accepted."
      },
      {
        sv: "Tidbank: 1h 7m 30s per coach. Om tiden tar slut får coachen bara ställa upp sina figurer på sin tur och sedan passa tillbaka turen.",
        en: "Time bank: 1h 7m 30s per coach. If time runs out, the coach may only stand up players during their turn and then pass the turn back."
      },
      {
        sv: "Dina figurer behöver vara målade med minst 3 färger.",
        en: "Your miniatures must be painted with at least 3 colours."
      },
      {
        sv: "Vi kör med what you see is what you get. Det ska vara enkelt att utskilja vilken position din figur utgör.",
        en: "We use what you see is what you get. It should be easy to identify each miniature position."
      },
      {
        sv: "Om motståndaren önskar måste man använda tärningstorn eller kopp, dela tärningar och begränsa tärningarna till max två set.",
        en: "If the opponent asks for it, players must use a dice tower or cup, share dice, and limit dice to a maximum of two sets."
      },
      {
        sv: "Det viktigaste är att vara glad och trevlig och göra att folk har roligt.",
        en: "The most important rule is to be friendly, positive and make sure people have a good time."
      }
    ],
    closing: {
      sv: "",
      en: ""
    }
  },
  schedule: {
    title: {
      sv: "Schema",
      en: "Schedule"
    },
    saturday: [
      {
        time: "09:00-09:30",
        title: {
          sv: "Registrering",
          en: "Registration"
        }
      },
      {
        time: "09:30-12:00",
        title: {
          sv: "Runda 1",
          en: "Round 1"
        }
      },
      {
        time: "12:00-13:00",
        title: {
          sv: "Lunch",
          en: "Lunch"
        }
      },
      {
        time: "13:00-15:30",
        title: {
          sv: "Runda 2",
          en: "Round 2"
        }
      },
      {
        time: "15:30-15:45",
        title: {
          sv: "Paus",
          en: "Break"
        }
      },
      {
        time: "15:45-18:15",
        title: {
          sv: "Runda 3",
          en: "Round 3"
        }
      }
    ],
    sunday: [
      {
        time: "09:00",
        title: {
          sv: "Dörrarna öppnar",
          en: "Doors open"
        }
      },
      {
        time: "09:30-12:00",
        title: {
          sv: "Runda 4",
          en: "Round 4"
        }
      },
      {
        time: "12:00-13:00",
        title: {
          sv: "Lunch",
          en: "Lunch"
        }
      },
      {
        time: "13:00-15:30",
        title: {
          sv: "Runda 5",
          en: "Round 5"
        }
      },
      {
        time: "15:45",
        title: {
          sv: "Prisutdelning",
          en: "Awards ceremony"
        }
      }
    ]
  },
  rules: {
    title: {
      sv: "Regler",
      en: "Rules"
    },
    body: {
      sv: "Se turneringssektionen för regler och rosterinformation.",
      en: "See the tournament section for rules and roster information."
    },
    items: [
      {
        sv: "Samlat under Turnering",
        en: "Included under Tournament"
      }
    ]
  },
  registration: {
    title: {
      sv: "Registrering",
      en: "Registration"
    },
    intro: {
      sv: "Anmäl dig utan konto. Betalstatus hanteras manuellt av arrangören.",
      en: "Register without an account. Payment status is handled manually by the organiser."
    },
    successTitle: {
      sv: "Anmälan mottagen",
      en: "Registration received"
    },
    successBody: {
      sv: "Tack! Din registrering är sparad. Arrangören återkommer vid behov.",
      en: "Thank you! Your registration has been saved. The organiser will follow up if needed."
    }
  },
  venue: {
    title: {
      sv: "Plats",
      en: "Venue"
    },
    name: {
      sv: "Sundsvall",
      en: "Sundsvall"
    },
    address: {
      sv: "Björneborgsgatan 20, Sundsvall",
      en: "Björneborgsgatan 20, Sundsvall"
    },
    body: {
      sv: "Platsinformation finns samlad under Turnering.",
      en: "Venue information is included under Tournament."
    }
  },
  contact: {
    title: {
      sv: "Kontakt",
      en: "Contact"
    },
    name: "Tournament Organiser",
    email: "info@kingofthenorth.se",
    body: {
      sv: "Har du frågor om regler, boende eller registrering? Kontakta arrangören.",
      en: "Questions about rules, accommodation or registration? Contact the organiser."
    }
  },
  links: {
    title: {
      sv: "Viktiga länkar",
      en: "Important Links"
    },
    items: [
      {
        label: {
          sv: "Anmälan via TourPlay",
          en: "Register via TourPlay"
        },
        href: "https://tourplay.net/en/blood-bowl/king-of-the-north",
        icon: "/assets/images/logos/tourplay_logo_512.png"
      },
      {
        label: {
          sv: "Rosterregler",
          en: "Roster rules"
        },
        href: "https://www.eurobowl.eu/entrance-options/",
        icon: "/assets/images/logos/EB2026_logo_white.png"
      }
    ]
  },
  awards: {
    title: {
      sv: "Priser",
      en: "Awards"
    },
    items: [
      {
        title: {
          sv: "1st Place",
          en: "1st Place"
        },
        image: "/assets/images/awards/champion.png"
      },
      {
        title: {
          sv: "2nd Place",
          en: "2nd Place"
        },
        image: "/assets/images/awards/runner-up.png"
      },
      {
        title: {
          sv: "Best Stunty",
          en: "Best Stunty"
        },
        image: "/assets/images/awards/third-place.png"
      },
      {
        title: {
          sv: "Coolest Team",
          en: "Coolest Team"
        },
        image: "/assets/images/awards/fair-play.png"
      },
      {
        title: {
          sv: "Most Touchdowns",
          en: "Most Touchdowns"
        },
        image: "/assets/images/awards/most-touchdowns.png"
      },
      {
        title: {
          sv: "Most Casualties",
          en: "Most Casualties"
        },
        image: "/assets/images/awards/most-casualties.png"
      },
      {
        title: {
          sv: "The Gentle Giant Award",
          en: "The Gentle Giant Award"
        },
        description: {
          sv: "Till coachen med lägst kombinerat TD- och CAS-nettoresultat.",
          en: "Awarded to the coach with the lowest combined TD and CAS net result."
        },
        image: "/assets/images/awards/gentle-giant.png"
      },
      {
        title: {
          sv: "Best Sundsvall Coach",
          en: "Best Sundsvall Coach"
        },
        image: "/assets/images/awards/best-coach.png"
      }
    ]
  },  tiebreakers: {
    title: {
      sv: "Tiebreakers",
      en: "Tiebreakers"
    },
    body: {
      sv: "Slutställning avgörs av turneringspoäng och publicerade tiebreakers.",
      en: "Final standings are determined by tournament points and the published tiebreakers."
    }
  },
  sportsmanship: {
    title: {
      sv: "Sportsmanship",
      en: "Sportsmanship"
    },
    body: {
      sv: "Spelare förväntas spela vänligt och rättvist.",
      en: "Players are expected to play in a friendly and fair manner."
    }
  }
};


