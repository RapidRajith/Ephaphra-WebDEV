# 🎧 Explore with Epaphra (@Epaphraa)

**Explore with Epaphra** is a premium, cinematic web platform built for YouTuber and podcast host **Epaphra (@Epaphraa)**. Built using **Next.js 14**, **Tailwind CSS**, **Framer Motion**, and an Express/MongoDB backend hosted on Render.

---

## 🌐 Live Deployments

- **🚀 Live Website (Vercel)**: [https://ephaphra-web-dev.vercel.app](https://ephaphra-web-dev.vercel.app)
- **⚡ Backend API (Render)**: [https://epaphraa-backend.onrender.com](https://epaphraa-backend.onrender.com)
- **📺 Official YouTube Channel**: [https://www.youtube.com/@epaphraa](https://www.youtube.com/@epaphraa)
- **🎵 Official Spotify Show**: [https://open.spotify.com/show/4q3YzOx6wq0qc8WtfqgGyp](https://open.spotify.com/show/4q3YzOx6wq0qc8WtfqgGyp)

---

## ✨ Key Features

- **🏠 Cinematic Home Page**: Features YouTube Channel Banner Header, liquid glass hero window, "About Epaphra & The ThirdLane Philosophy" editorial biography, #1 Most Viewed Episode player, and community posts.
- **📱 YouTube Community Posts Page (`/posts`)**: Displays official YouTube channel posts, episode release announcements, community polls, behind-the-scenes snapshots, and image preview lightboxes.
- **🎧 Complete Video Episode Archive (`/episodes`)**: Real-time integration with Epaphra's official YouTube channel playlist. Includes keyword search, category filters, month selectors, and pagination.
- **📄 Clean Episode Detail Pages (`/episodes/[id]`)**: Deep-dive episode page with video embed player, clean episode summaries, and topic tags.
- **✨ Custom Interactive Cursor**: Sleek spring-physics core cursor dot and expanding liquid glass outer ring for enhanced micro-interactions.
- **✉️ Render Express + MongoDB Backend**: Fan submissions (name, email, phone, favorite episode, key learnings, guest suggestions) stored in database with admin endpoint for subscriber management.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router, React 18, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Glassmorphism Design Tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend API**: Node.js, Express.js, MongoDB Mongoose (Hosted on Render)
- **Hosting**: [Vercel](https://vercel.com/) (Frontend) & [Render](https://render.com/) (Backend)

---

## 🚀 Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── backend/                  # Render Express API & Database Server
│   ├── server.js
│   └── package.json
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── episodes/ (page.tsx & [id]/page.tsx)
│   │   ├── posts/ (page.tsx)
│   │   └── api/ (feedback & posts routes)
│   ├── components/
│   │   ├── common/ (Header, Footer, Navigation, CustomCursor)
│   │   ├── home/ (HeroSection, FeaturedEpisode, WhyListen, RecentPosts, NewsletterForm)
│   │   ├── episodes/ (EpisodeCard, EpisodeGrid, SearchBar, FilterPanel)
│   │   ├── posts/ (PostCard)
│   │   └── forms/ (FanFeedbackForm, FormInput)
│   ├── data/ (episodes.ts, posts.ts)
│   ├── lib/ (youtube, api, utils, validation)
│   └── types/ (index.ts)
└── package.json
```

---

© 2026 Explore with Epaphra (@Epaphraa). All rights reserved.
