/**
 * AYUSH'S BIRTHDAY EXPERIENCE CONFIGURATION
 * ══════════════════════════════════════════════════════════════════
 * All customizable content is isolated here. You can update text,
 * media paths, video URLs, and stats in seconds without touching HTML.
 * ══════════════════════════════════════════════════════════════════
 */

const CONFIG = {
  recipient: {
    name: "Ayush",
    nickname: "GOAT Bro",
    birthYear: 2026,
    jerseyNumber: "10",
  },

  hero: {
    eyebrow: "FOR THE GOAT'S DAY-ONE BRO",
    headline: "HAPPY BIRTHDAY, AYUSH.",
    tagline: "One more year older. Still the same legend.",
    friendshipQuote: "Some people become friends. Some become family.",
    primaryCta: "ENTER YOUR BIRTHDAY UNIVERSE",
    secondaryCta: "RELIVE OUR MEMORIES",
  },

  timeline: {
    title: "OUR STORY, YEAR BY YEAR.",
    subtitle: "Different birthdays. Different memories. One legendary friendship.",
    entries: [
      {
        year: "2024",
        badge: "The First Chapter",
        type: "pdf",
        title: "The 2024 Birthday Archive",
        description:
          "The inaugural birthday edition. Handcrafted notes, shared laughs, and the opening chapter of an unforgettable friendship.",
        ctaText: "OPEN 2024 MEMORY",
        icon: "pdf",
        /* Set to your PDF file path (e.g. 'assets/2024-memory.pdf') or null for graceful preview modal */
        pdfUrl: "birthday_ayush.pdf",
        previewDetails: {
          pages: "Birthday Scrapbook Edition",
          format: "Digital Scrapbook & Letter Edition",
          note: "Archived with pure brotherhood. Document contains our earliest college & friendship milestones.",
        },
      },
      {
        year: "2025",
        badge: "The Birthday Film",
        type: "video",
        title: "Cinematic Birthday Cut 2025",
        description:
          "A self-made tribute film capturing the high-octane banter, late-night talks, and chaotic brotherhood from our year.",
        ctaText: "WATCH 2025 VIDEO",
        icon: "video",
        /* Set to your video file path (e.g. 'assets/birthday-video.mp4') or external video URL, or null for graceful preview modal */
        videoUrl: "subho_jonmodin.mp4",
        duration: "03:42",
        resolution: "4K Cinema",
      },
      {
        year: "2026",
        badge: "Present Celebration",
        type: "current",
        title: "This Year's Chapter",
        description:
          "The biggest milestone yet. Another year of chasing dreams, winning battles, and celebrating the legend himself.",
        ctaText: "YOU ARE HERE ★",
        icon: "star",
        currentStatus: "ACTIVE MILESTONE",
        highlightTag: "THE NEXT CHAPTER",
      },
    ],
  },

  messiCorner: {
    title: "THE MESSI CORNER",
    subtitle: "Built for a true football connoisseur & lifelong Leo Messi disciple.",
    badge: "10 ★ THE GOAT DISCIPLINE",
    quote: "“You have to fight to reach your dream. You have to sacrifice and work hard for it.”",
    author: "— Lionel Andrés Messi",
    stats: [
      {
        label: "WORLD CHAMPION",
        value: "3 STARS",
        detail: "1978 · 1986 · 2022",
        club: "argentina",
      },
      {
        label: "BALLON D'OR",
        value: "8 TITLES",
        detail: "Unmatched Greatness",
        club: "barcelona",
      },
      {
        label: "CAREER TROPHIES",
        value: "46 WINS",
        detail: "Most Decorated in History",
        club: "inter-miami",
      },
      {
        label: "JERSEY NUMBER",
        value: "#10",
        detail: "Eternal Icon",
        club: "argentina",
      },
    ],
    brotherhoodStats: [
      { label: "Banter Chemistry", value: "99.9%", meter: 100 },
      { label: "Loyalty Rating", value: "Undefeated", meter: 100 },
      { label: "Football Arguments Won", value: "50 / 50", meter: 85 },
      { label: "Late Night Debates", value: "∞ Countless", meter: 98 },
    ],
  },

  birthdayMessage: {
    title: "A LETTER TO MY BROTHER",
    subtitle: "Tap below to reveal what words usually fail to say.",
    triggerButton: "UNLOCK BIRTHDAY MESSAGE",
    sealedText: "SEALED WITH BROTHERHOOD · TAP TO UNSEAL",
    letterGreeting: "Yo Ayush,",
    letterParagraphs: [
      "Happy Birthday, my brother! Looking back across all the madness, the late-night talks, the spontaneous plans, and the endless football debates, one thing has remained steady: you've been a day-one brother through thick and thin.",
      "In a world where people come and go, having a friend whose loyalty never wavers is rare. You bring energy to every room, you back your people without hesitation, and you face every challenge with the spirit of a true champion.",
      "As Messi showed the entire world in Qatar—it doesn't matter how long the journey takes or how tough the road gets, greatness always finds those who stay true to themselves. This year is yours for the taking.",
      "Keep aiming high, stay relentless, and never lose the hunger that makes you who you are. No matter what comes next, you know you've got a brother in your corner for life.",
    ],
    letterSignOff: "Day One & Always,",
    letterAuthor: "Your Best Friend & Brother ✦",
  },

  footer: {
    tagline: "MADE WITH BROTHERHOOD. BUILT FOR AYUSH.",
    subText: "Crafted with Argentina sky blue, Blaugrana pride & South Beach soul.",
    copyrightYear: 2026,
  },
};

// Export to window for global access
window.AYUSH_CONFIG = CONFIG;
