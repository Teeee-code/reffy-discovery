# Reffy Discovery

Standalone AI prospect discovery chat for Club Pilates Mission Valley.
Powered by Claude (Anthropic API) + Netlify serverless functions.

---

## What this does

A prospect clicks a link, lands on this page, and has a real conversation
with Reffy — a warm, friendly AI guide who:
- Asks discovery questions (experience, goals, injuries, location)
- Answers common questions about Club Pilates
- Shares the free Intro class booking link at the right moment
- Captures lead info if they want a human to follow up

Every conversation stays in the browser session. Lead capture sends
name + phone to the studio team.

---

## File structure

```
reffy-discovery/
├── public/
│   └── index.html          ← the full chat page
├── netlify/
│   └── functions/
│       └── chat.js         ← serverless function (keeps API key secret)
├── netlify.toml            ← tells Netlify where everything lives
└── README.md
```

---

## Deploy steps

### 1. Create the GitHub repo

1. Go to github.com → New repository
2. Name it: `reffy-discovery`
3. Set to Public (or Private — either works with Netlify)
4. Do NOT initialize with README (you already have these files)
5. Click Create repository

### 2. Push these files to GitHub

Open Terminal and run:

```bash
cd ~/Desktop/reffy-discovery
git init
git add .
git commit -m "Initial build — Reffy Discovery v1"
git branch -M main
git remote add origin https://github.com/Teeee-code/reffy-discovery.git
git push -u origin main
```

### 3. Connect to Netlify

1. Go to netlify.com → Add new site → Import from Git
2. Choose GitHub → select `reffy-discovery`
3. Build settings are auto-detected from netlify.toml:
   - Publish directory: `public`
   - Functions directory: `netlify/functions`
4. Click Deploy site

### 4. Add your Anthropic API key (IMPORTANT)

Your API key must NEVER go in the code files — it lives in Netlify only.

1. In Netlify → Site settings → Environment variables
2. Click Add a variable
3. Key: `ANTHROPIC_API_KEY`
4. Value: your Anthropic API key (starts with `sk-ant-...`)
5. Save
6. Trigger a redeploy: Deploys → Trigger deploy → Deploy site

### 5. Test it

Visit your Netlify URL (e.g. `reffy-discovery.netlify.app`) and have a
full conversation with Reffy to make sure everything works.

### 6. Custom domain (optional)

In Netlify → Domain settings → Add custom domain
You could use something like `meet.yoursite.com` or buy `meetreffy.com`

---

## How to update Reffy's personality or knowledge

All of Reffy's instructions live in one place:
`netlify/functions/chat.js` → the `SYSTEM_PROMPT` constant

To update:
1. Edit the SYSTEM_PROMPT text in chat.js
2. Commit and push to GitHub
3. Netlify auto-deploys

---

## Sending the link

Once deployed, you can drop the URL into:
- A text message ("Hey! Meet Reffy, she can answer all your questions 👉 [link]")
- An automated email sequence
- Your Instagram bio
- A QR code on studio materials

---

## Future upgrades (when ready)

- [ ] Save transcripts to Supabase
- [ ] Email transcript summary to studio on conversation end
- [ ] Voice + animated avatar
- [ ] Booking directly into ClubReady
- [ ] Multi-studio version with location selector
