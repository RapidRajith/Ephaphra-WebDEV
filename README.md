# 🎧 Third Lane Podcast

**Third Lane Podcast** by **Epaphraa** is a premium cinematic web application built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

---

## ✨ Features

- **🏠 Cinematic Home Page**: High-impact hero section, featured episode showcase, interactive thumbnail carousel slider, value propositions, and newsletter subscription.
- **🎧 Episodes Catalog**: Full archive search, category filter pills (Engineering, AI, Product Design, Culture), multiple sorting modes, and paginated episode grid.
- **📄 Episode Detail Pages**: Deep dive page with media player integration, show notes, topic tags, and related episode recommendations.
- **💎 Glassmorphism Design System**: Tailored dark atmospheric palette, ambient glow effects, responsive drawer navigation, and smooth micro-animations.
- **✉️ API Route**: Integrated `/api/subscribe` route with email validation for newsletter subscriptions.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons & UI**: Lucide React / Inline SVG
- **Language**: TypeScript

---

## 🚀 Getting Started

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
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── episodes/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── api/subscribe/route.ts
│   ├── components/
│   │   ├── common/ (Header, Footer, Navigation, Pagination)
│   │   ├── home/ (HeroSection, FeaturedEpisode, ThumbnailSlider, WhyListen, NewsletterForm)
│   │   ├── episodes/ (EpisodeCard, EpisodeGrid, SearchBar, FilterPanel)
│   │   ├── forms/ (SubscribeForm, FormInput, FormCheckbox)
│   │   └── ui/ (Button, Badge, LoadingSpinner)
│   ├── data/ (episodes.ts)
│   ├── lib/ (colors, typography, breakpoints, utils, validation, api)
│   ├── styles/ (animations, glassmorphism, utilities, components)
│   └── types/ (index.ts)
└── package.json
```

---

© 2026 Third Lane Podcast by Epaphraa. All rights reserved.
