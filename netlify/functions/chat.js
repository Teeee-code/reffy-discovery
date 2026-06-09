const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── Per-studio email destinations ───────────────────────────────────────────
const STUDIO_EMAILS = {
  missionvalley: "missionvalley@clubpilates.com",
  lamesa: "lamesa@clubpilates.com",
  northpark: "northpark@clubpilates.com",
  santee: "santee@clubpilates.com",
};

// ─── Per-studio knowledge blocks ─────────────────────────────────────────────
const STUDIOS = {
  missionvalley: {
    name: "Club Pilates Mission Valley",
    address: "10330 Friars Road, Suite 112, San Diego, CA 92120",
    phone: "(619) 786-2300",
    email: "missionvalley@clubpilates.com",
    parking:
      "We have convenient parking right outside the studio. Easy to find and plenty of spots.",
    introTimes: "Mondays at 7:15pm, Thursdays at 1pm, and Sundays at 12:15pm",
    bookingLink:
      "https://lp.clubpilates.com/offers?offer_id=intro-class-promo&booking=1&location=missionvalley",
    membershipLinks: {
      single: "https://app.clubready.com/JoinUs/3149/319010",
      fourPack: "https://app.clubready.com/JoinUs/3149/289684",
      eightPack: "https://app.clubready.com/JoinUs/3149/289686",
      unlimited: "https://app.clubready.com/JoinUs/3149/377181",
    },
    classes: {
      level1: ["Reformer Flow", "Center + Balance (includes foam roller work)"],
      level15: [
        "Reformer Flow",
        "Cardio Sculpt",
        "Suspend",
        "Control",
        "Circuit",
      ],
      level2: ["Reformer Flow (instructor approval required)"],
    },
    sisters: ["La Mesa", "North Park", "Santee"],
  },

  lamesa: {
    name: "Club Pilates La Mesa",
    address: "8011 University Ave Suite C3, La Mesa, CA 91942",
    phone: "(619) 701-6511",
    email: "lamesa@clubpilates.com",
    parking:
      "We're located in the La Mesa Springs Shopping Center with Vons — big parking lot, very easy. We're in between Pizza Hut and Play It Again Sports. Directions: https://tinyurl.com/49p3w5ez",
    introTimes: "Tuesdays at 6:30pm, Fridays at 12pm, and Sundays at 1pm",
    bookingLink:
      "https://lp.clubpilates.com/offers?offer_id=intro-class-promo&booking=1&location=lamesa",
    membershipLinks: {
      single: "https://app.clubready.com/JoinUs/3087/319010",
      fourPack: "https://app.clubready.com/JoinUs/3087/289684",
      eightPack: "https://app.clubready.com/JoinUs/3087/289686",
      unlimited: "https://app.clubready.com/JoinUs/3087/377181",
    },
    classes: {
      level1: ["Reformer Flow", "Center + Balance (includes foam roller work)"],
      level15: [
        "Reformer Flow",
        "Cardio Sculpt",
        "Suspend",
        "Control",
        "Circuit",
      ],
      level2: ["Reformer Flow (instructor approval required)"],
    },
    sisters: ["Mission Valley", "North Park", "Santee"],
  },

  northpark: {
    name: "Club Pilates North Park",
    address: "3959 30th St STE 101, San Diego, CA 92104",
    phone: "(619) 677-1500",
    email: "northpark@clubpilates.com",
    parking:
      "Parking in North Park — we want to set you up for success here! There's a free parking garage in the alley behind the building off Lincoln and 30th called 'La Boheme Retail' — it's the only garage without a gate, easy to spot. Street parking is also available nearby. Daytime visits are usually no problem, but for evening classes we recommend arriving a few minutes early to allow time to park. If the garage is full, there's also a pay parking garage a short walk away at 3829 29th St.",
    introTimes: "Wednesdays at 12pm and Sundays at 12pm",
    bookingLink:
      "https://lp.clubpilates.com/offers?offer_id=intro-class-promo&booking=1&location=northpark",
    membershipLinks: {
      single: "https://app.clubready.com/JoinUs/3150/319010",
      fourPack: "https://app.clubready.com/JoinUs/3150/289684",
      eightPack: "https://app.clubready.com/JoinUs/3150/289686",
      unlimited: "https://app.clubready.com/JoinUs/3150/377181",
    },
    classes: {
      level1: ["Reformer Flow", "Center + Balance (includes foam roller work)"],
      level15: ["Reformer Flow", "Cardio Sculpt", "Suspend", "Control"],
      level2: ["Reformer Flow (instructor approval required)"],
    },
    sisters: ["Mission Valley", "La Mesa", "Santee"],
  },

  santee: {
    name: "Club Pilates Santee",
    address: "9331 Mission Gorge Rd #109, Santee, CA 92071",
    phone: "(619) 485-1800",
    email: "santee@clubpilates.com",
    parking:
      "We're located in the Sprouts parking lot — plenty of parking, very easy. We're right next to Jersey Mike's.",
    introTimes: "Mondays at 7:30pm, Thursdays at 12pm, and Saturdays at 11am",
    bookingLink:
      "https://lp.clubpilates.com/offers?offer_id=intro-class-promo&booking=1&location=santee",
    membershipLinks: {
      single: "https://app.clubready.com/JoinUs/3153/319010",
      fourPack: "https://app.clubready.com/JoinUs/3153/289684",
      eightPack: "https://app.clubready.com/JoinUs/3153/289686",
      unlimited: "https://app.clubready.com/JoinUs/3153/377181",
    },
    classes: {
      level1: ["Reformer Flow", "Center + Balance (includes foam roller work)"],
      level15: [
        "Reformer Flow",
        "Cardio Sculpt",
        "Suspend",
        "Control",
        "Circuit",
      ],
      level2: ["Reformer Flow (instructor approval required)"],
    },
    sisters: ["Mission Valley", "La Mesa", "North Park"],
  },
};

// ─── Shared knowledge (same across all studios) ──────────────────────────────
const SHARED_KNOWLEDGE = `
INTRO CLASS:
- Free, 30-minute full-body Reformer session
- Small group, personalized attention
- Arrive 10 minutes early to complete waiver
- Grippy socks required (sold at studio if needed)

MEMBERSHIP PRICING (same at all locations):
- Single class: $35
- 4 Pack: $109/month
- 8 Pack: $199/month
- Unlimited: $259/month
- Passport: $299/month (book at any Club Pilates in the US)
- Enrollment fee: $149 one-time

CLASS LEVELS:
- Level 1 (Foundations): Beginners and all fitness levels — build solid Pilates foundation
- Level 1.5 (Progression): More complex movements, moderate tempo — Level 1 experience required
- Level 2 (Evolution): Advanced, fast-paced, instructor approval required
- No Level 2.5 at any of our locations

ABOUT OUR CLASSES:
- Reformer Flow: Signature full-body Reformer class, available at all levels
- Center + Balance (L1): Deep stretching, flexibility, recovery — foam roller incorporated
- Cardio Sculpt (L1.5): Jumpboard cardio, low-impact but high energy
- Suspend (L1.5): TRX + Reformer fusion, great for athletes
- Control (L1.5): Standing work, toning, uses springboard and free weights
- Circuit (L1.5): Athletic Pilates, strength + cardio (not available at North Park)
- No Restore class, no Teen class, no standalone recovery class at our locations
- Recovery and myofascial release work is woven into Center + Balance

POLICIES:
- Cancel class: 12 hours notice required; no-show = $25 fee (unlimited) or lost session (packs)
- Membership freeze: $25/month, up to 3 months per year
- Membership cancel: Written notice required — contact studio for details
- Upgrade/downgrade: 7 days notice
- Referral reward: $25 credit when a referred friend buys a membership
- Late policy: Not admitted if more than 5 minutes late (safety policy)
- Waitlist: Confirmed up to 2 hours before class; you'll be notified by email

WHAT TO BRING:
- Grippy socks (required; sold at studio)
- Form-fitting athletic apparel with full coverage
- Water bottle (refill station available)
- Arrive 10 minutes early for your first visit

STUDENT/HERO DISCOUNTS:
- Special pricing available — tell them our team has options and to ask at the studio

PRIVATE TRAINING:
- 1-on-1 and semi-private sessions available
- Intro to PT Pack: 3 sessions for $225
- 8, 12, and 16 session packs available
`;

// ─── Build system prompt for a given studio ──────────────────────────────────
function buildSystemPrompt(studio, prospectName) {
  const s = STUDIOS[studio];
  const greeting = prospectName
    ? `The prospect's name is ${prospectName}. Greet them warmly by name in your first message.`
    : "No name was provided. Use a warm general greeting.";

  return `You are Reffy, a friendly and knowledgeable guide for ${s.name}. You help prospects discover if Club Pilates is right for them, answer their questions, handle objections with warmth and honesty, and guide them toward booking a free Intro Class or purchasing a membership.

${greeting}

YOUR STUDIO:
- Name: ${s.name}
- Address: ${s.address}
- Phone: ${s.phone}
- Email: ${s.email}
- Parking: ${s.parking}

INTRO CLASS TIMES AT YOUR STUDIO:
${s.introTimes}

INTRO CLASS BOOKING LINK:
${s.bookingLink}

MEMBERSHIP PURCHASE LINKS FOR YOUR STUDIO:
- Single class ($35): ${s.membershipLinks.single}
- 4 Pack ($109/month): ${s.membershipLinks.fourPack}
- 8 Pack ($199/month): ${s.membershipLinks.eightPack}
- Unlimited ($259/month): ${s.membershipLinks.unlimited}

CLASSES AT YOUR STUDIO:
- Level 1: ${s.classes.level1.join(", ")}
- Level 1.5: ${s.classes.level15.join(", ")}
- Level 2: ${s.classes.level2.join(", ")}

SISTER LOCATIONS (same owner):
${s.sisters.join(", ")}

SHARED KNOWLEDGE:
${SHARED_KNOWLEDGE}

YOUR APPROACH:
- Be warm, conversational, and genuinely curious about the prospect
- Work through their goals, any injuries or limitations, and location naturally in conversation
- Never be pushy — read the conversation and meet them where they are
- Create urgency around the Intro Class by offering 1-2 specific upcoming times
- If they seem ready to join, offer membership links directly
- Always mirror the prospect's own words when closing
- If they ask about a class or feature your studio doesn't have (like Circuit at North Park, or Level 2.5), be honest and pivot to what you do offer
- Mention sister locations if proximity or scheduling is a concern
- For recovery questions, highlight that foam roller work is woven into Center + Balance
- For parking questions at North Park specifically, always recommend arriving a few minutes early for evening classes

RESPONSE FORMAT:
- Keep responses concise and conversational — 2-4 sentences max per turn
- After each response, suggest 2-3 quick reply options as a JSON array at the very end of your message, like this:
QUICK_REPLIES: ["Option 1", "Option 2", "Option 3"]
- Quick replies should feel natural, not robotic
- When sharing a booking or membership link, trigger the transcript email

IMPORTANT:
- You represent ${s.name} only — never give information about other studios unless asked about sister locations
- Never invent class times, prices, or policies not listed above
- If you don't know something, say you'll have the team follow up
- Reffy is gender-neutral — never use she/her pronouns to refer to yourself`;
}

// ─── Rate limiting (simple in-memory, resets on function cold start) ──────────
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxMessages = 40; // per IP per hour across all studios

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return false;
  }

  const record = rateLimitMap.get(ip);

  if (now - record.start > windowMs) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return false;
  }

  if (record.count >= maxMessages) return true;

  record.count++;
  return false;
}

// ─── Main handler ─────────────────────────────────────────────────────────────
exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const ip =
      event.headers["x-forwarded-for"] ||
      event.headers["client-ip"] ||
      "unknown";

    if (isRateLimited(ip)) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({
          error: "Too many messages. Please try again later.",
        }),
      };
    }

    const { messages, studio, prospectName } = JSON.parse(event.body);

    // Validate studio — fall back to Mission Valley if missing or unrecognized
    const studioKey =
      studio && STUDIOS[studio] ? studio : "missionvalley";

    const systemPrompt = buildSystemPrompt(studioKey, prospectName);

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: messages,
    });

    const replyText =
      response.content[0]?.type === "text" ? response.content[0].text : "";

    // Parse quick replies if present
    let quickReplies = [];
    let cleanReply = replyText;

    const qrMatch = replyText.match(/QUICK_REPLIES:\s*(\[[\s\S]*?\])/);
    if (qrMatch) {
      try {
        quickReplies = JSON.parse(qrMatch[1]);
        cleanReply = replyText.replace(/QUICK_REPLIES:\s*\[[\s\S]*?\]/, "").trim();
      } catch (e) {
        // If JSON parse fails just use full reply
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        reply: cleanReply,
        quickReplies,
        studioEmail: STUDIO_EMAILS[studioKey],
        studioName: STUDIOS[studioKey].name,
      }),
    };
  } catch (error) {
    console.error("Chat function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Something went wrong. Please try again." }),
    };
  }
};
