# Update Specification 01 --- Cinematic Home / Landing Page

## IMPORTANT --- EXISTING WEBSITE CONSTRAINT

This is an **incremental update to an already-built website**. The base
website is approximately 50% complete.

### Do NOT rebuild the website

-   Do not create a new project.
-   Do not replace the existing architecture.
-   Do not remove existing pages, components, routes, APIs, data models,
    or functionality.
-   Do not replace the existing design system unless specifically
    required below.
-   Reuse existing navbar, footer, buttons, typography, cards, spacing
    system, API utilities, and responsive behavior wherever possible.
-   Inspect the existing implementation first and **extend/refine it
    instead of recreating it**.
-   Only modify files/components that are necessary for the requirements
    in this document.
-   Existing functionality must continue working after the update.

The goal is to make the **existing Home page feel cinematic, premium,
editorial, and creator-focused** without changing the overall identity
of the existing website.

------------------------------------------------------------------------

# 1. Home Page Goal

Transform the existing Home page into a **cinematic landing experience
for a podcast creator**.

The page should communicate:

> Who the creator is → what the podcast is about → the latest
> conversation → why visitors should explore → where they can follow the
> creator.

The experience should feel closer to a premium media/editorial platform
than a generic YouTube fan page.

------------------------------------------------------------------------

# 2. Cinematic Hero Section

Enhance the existing hero section rather than replacing the page
structure unnecessarily.

### Hero hierarchy

Include:

1.  Creator/podcast identity
2.  Strong editorial headline
3.  Short supporting description
4.  Primary CTA
5.  Secondary CTA
6.  Cinematic creator/episode visual

Example structure:

``` text
THE CONVERSATIONS
THAT MATTER.

Ideas. People. Stories.
One conversation at a time.

[ WATCH LATEST EPISODE ]   [ EXPLORE EPISODES ]
```

### Visual direction

Use the existing project's colors and typography where possible.

Enhance the hero with:

-   Large editorial typography
-   Cinematic imagery/video thumbnail
-   Subtle dark gradient overlay
-   Soft ambient lighting
-   Very subtle grain/noise texture
-   Depth through layered elements
-   Large whitespace
-   Strong contrast
-   Smooth entrance animation

Do NOT introduce excessive gradients, excessive glassmorphism, or random
decorative elements.

------------------------------------------------------------------------

# 3. Hero Motion

Add motion only where it improves the experience.

Recommended:

-   Text reveal on page load
-   Image/visual fade + scale entrance
-   Very subtle parallax movement
-   CTA hover animation
-   Ambient cursor-following glow if the existing project already
    supports custom cursor interactions

Animations must:

-   Be smooth
-   Be short
-   Not block interaction
-   Respect reduced-motion preferences
-   Avoid excessive bouncing or distracting effects

------------------------------------------------------------------------

# 4. Latest Episode Section

Add/refine a prominent **Latest Episode** section directly below the
hero.

It should use the existing episode/video data source.

Display:

-   Episode thumbnail
-   Episode number if available
-   Episode title
-   Guest name if available
-   Published date
-   Duration if available
-   Short description
-   YouTube/play CTA

Example:

``` text
LATEST CONVERSATION

[ LARGE EPISODE VISUAL ]

EP. 042
THE FUTURE OF AI

with Guest Name

01:24:36

Short episode description...

[ WATCH EPISODE ]
```

Do not hardcode episode information if the project already obtains video
data through an API.

------------------------------------------------------------------------

# 5. Featured Episodes

Add a compact featured section using the existing episode/video dataset.

Show approximately 3--4 strong episodes.

Each card should contain:

-   Thumbnail
-   Episode/video title
-   Guest/title metadata when available
-   Date
-   Duration when available
-   Play/watch interaction

### Hover behavior

On hover:

-   Slight image scale
-   Subtle overlay
-   Play indicator appears
-   Metadata becomes slightly more prominent
-   Card should feel interactive

Do not redesign the existing episode-card component if one already
exists. Extend the existing component.

------------------------------------------------------------------------

# 6. Creator Introduction

Add a short editorial "About the Creator" section.

Keep it concise.

Possible structure:

``` text
THE PERSON
BEHIND THE
CONVERSATIONS.

[ CREATOR IMAGE ]

Short creator description pulled from existing
creator/channel information where available.

[ ABOUT / YOUTUBE ]
```

If creator information is already available through the existing API,
reuse it.

Do not invent biography facts.

------------------------------------------------------------------------

# 7. Social Links --- IMPORTANT

Add the creator's social links to the Home page.

### Source of links

Where possible, retrieve the creator's public links from the creator's
**YouTube channel/about data or the existing API response**.

Potential links:

-   Instagram
-   LinkedIn
-   X/Twitter
-   Spotify
-   Website
-   Other publicly listed creator/social links

### Rules

-   Do not invent URLs.
-   Do not hardcode fake social accounts.
-   If the YouTube/API response does not expose a specific link, do not
    manufacture one.
-   Reuse existing API/client utilities if already present.
-   Add a safe fallback for unavailable links.
-   Open external social profiles in a new tab.
-   Use accessible labels/tooltips.

Example:

``` text
FOLLOW THE CONVERSATION

[ Instagram ] [ LinkedIn ] [ X ] [ Spotify ] [ YouTube ]
```

The links should feel integrated into the design rather than appearing
as a random icon row.

------------------------------------------------------------------------

# 8. Social / Creator Statistics

If the existing API provides reliable public statistics, optionally
display a compact stats row:

``` text
1.2M+
SUBSCRIBERS

180+
EPISODES

50M+
VIEWS
```

Only display values that actually exist in the API/source.

Do not fabricate statistics.

------------------------------------------------------------------------

# 9. Podcast Clips / Highlights

If short-form video data is already available, add a compact "From the
Conversation" section.

Use existing video data where possible.

Cards can show:

-   Short thumbnail
-   Video title
-   Duration
-   Play button

This section should remain visually secondary to the main podcast
episodes.

If suitable clip data is not available, **do not create fake content
just to fill the section**.

------------------------------------------------------------------------

# 10. Newsletter CTA on Home

Add a visually strong but compact newsletter call-to-action near the
bottom of the Home page.

Example:

``` text
THE CONVERSATION CONTINUES.

Get new episodes, interesting ideas,
and exclusive updates directly in your inbox.

[ YOUR EMAIL ] [ JOIN THE CONVERSATION ]
```

The actual newsletter functionality will be implemented according to the
separate Newsletter specification.

Do not duplicate newsletter backend logic if it already exists.

------------------------------------------------------------------------

# 11. Footer Enhancement

Keep the existing footer structure.

Only extend it where necessary to include:

-   Social links
-   YouTube
-   Instagram
-   LinkedIn
-   X/Twitter
-   Spotify
-   Newsletter
-   Existing pages

Do not replace the entire footer.

------------------------------------------------------------------------

# 12. Responsive Design

The enhanced Home page must work across:

-   Desktop
-   Laptop
-   Tablet
-   Mobile

Hero typography must scale responsively.

Episode cards should transition naturally:

``` text
Desktop → multi-column
Tablet  → 2-column
Mobile  → single-column
```

Do not introduce horizontal overflow.

------------------------------------------------------------------------

# 13. Performance

Because this is a cinematic page:

-   Lazy-load below-the-fold images.
-   Use optimized image dimensions.
-   Avoid unnecessary animation libraries if the project already has
    suitable utilities.
-   Do not autoplay large videos unless the existing project already
    intentionally does so.
-   Respect `prefers-reduced-motion`.
-   Avoid excessive JavaScript for purely visual effects.

------------------------------------------------------------------------

# 14. Acceptance Criteria

The Home page update is complete when:

-   Existing website functionality remains intact.
-   Existing components are reused wherever possible.
-   Hero feels cinematic and premium.
-   Latest episode is clearly prioritized.
-   Featured episodes are visually strong.
-   Creator identity is clear.
-   Public social links are displayed when available through the
    API/source.
-   Newsletter CTA exists.
-   Page works responsively.
-   Animations are subtle and purposeful.
-   No fake creator/social/statistical information is introduced.
