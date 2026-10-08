# Update Specification 03 --- Immersive Episode Detail Experience

## IMPORTANT --- EXISTING WEBSITE CONSTRAINT

This is an **incremental update to an already-built website**.

The existing website is approximately 50% complete.

### Do NOT rebuild the website

-   Do not create a new project.
-   Do not replace the current routing architecture.
-   Do not remove existing episode/video functionality.
-   Do not create a second episode system.
-   Reuse the existing video API, episode cards, routing, components,
    data models, typography, buttons, and design system.
-   Only extend the existing episode detail experience with the
    requirements below.

------------------------------------------------------------------------

# 1. Feature Goal

Create an **immersive podcast episode detail page** for each video.

The page should turn a normal video listing into a complete episode
experience.

The visitor should be able to:

1.  Understand the episode immediately.
2.  Watch the episode.
3.  Read about it.
4.  Discover chapters/topics if data exists.
5.  Explore the guest.
6.  Navigate to related episodes.
7.  Return to the episode archive.
8.  Subscribe to the newsletter.

------------------------------------------------------------------------

# 2. Episode Hero

Use the existing selected episode data.

Structure:

``` text
← BACK TO EPISODES


EPISODE 042

THE FUTURE OF AI

with Guest Name

Published Date
Duration

Short episode description
```

Use a strong editorial layout.

Do not duplicate data manually if it already exists in the API.

------------------------------------------------------------------------

# 3. Video Player

Place the YouTube/video player prominently below or beside the episode
heading depending on the existing responsive layout.

Desktop:

``` text
┌───────────────────────────────────────┐
│                                       │
│             VIDEO PLAYER              │
│                                       │
└───────────────────────────────────────┘
```

Mobile:

``` text
┌─────────────────────┐
│                     │
│    VIDEO PLAYER     │
│                     │
└─────────────────────┘
```

Use the existing YouTube/video integration.

Do not create a second player implementation if one already exists.

------------------------------------------------------------------------

# 4. Episode Metadata

Display available metadata:

-   Episode/video title
-   Guest name
-   Published date
-   Duration
-   Episode number if available
-   Category/topic if available
-   View count if reliably available

Only display fields that actually exist.

Do not fabricate metadata.

------------------------------------------------------------------------

# 5. Episode Description

Create a clear section:

``` text
ABOUT THIS EPISODE

[Existing episode description]
```

Preserve meaningful formatting where possible.

Do not unnecessarily rewrite or invent the description.

------------------------------------------------------------------------

# 6. Chapters / Timeline

If chapter/timestamp information is available from the API or YouTube
metadata, expose it as a clickable list.

Example:

``` text
CHAPTERS

00:00   Introduction
04:21   The AI revolution
18:32   Building the future
42:10   What's next?
```

### Interaction

Clicking a chapter should seek the video to that timestamp when
technically supported by the existing player.

If chapter information is not available:

**Do not create fake chapters.**

Simply omit the section.

------------------------------------------------------------------------

# 7. Guest Section

If the episode has a guest, create a compact guest profile section.

Example:

``` text
MEET THE GUEST

[ Guest Image ]

Guest Name
Short available description

[ INSTAGRAM ]
[ LINKEDIN ]
[ WEBSITE ]
```

Only show social links that are actually available.

Do not invent social URLs.

If the existing API provides guest/channel information, reuse it.

------------------------------------------------------------------------

# 8. Share Episode

Add a compact sharing control.

Possible actions:

``` text
SHARE

[ Copy Link ]
[ X ]
[ WhatsApp ]
[ LinkedIn ]
```

Use the current page URL.

### Requirements

-   Copy Link should copy the episode URL.
-   Show a small success state after copying.
-   External share links should use the correct current episode URL.
-   Do not add social platforms that are irrelevant to the existing
    project.

------------------------------------------------------------------------

# 9. Related Episodes

Near the bottom:

``` text
MORE CONVERSATIONS

[ Episode Card ] [ Episode Card ] [ Episode Card ]
```

Use the existing episode dataset.

Prefer related episodes based on:

1.  Same topic/category
2.  Similar guest/topic
3.  Otherwise latest episodes

Do not introduce a complicated recommendation engine for this feature.

A simple deterministic selection is sufficient.

------------------------------------------------------------------------

# 10. Newsletter CTA

Add the newsletter CTA near the bottom of the episode page.

Example:

``` text
DON'T MISS THE NEXT CONVERSATION.

Get new episodes and exclusive updates.

[ EMAIL ADDRESS ] [ SUBSCRIBE ]
```

Connect this to the existing newsletter implementation.

Do not duplicate backend logic.

------------------------------------------------------------------------

# 11. Navigation

The episode page must remain connected to the existing site.

Required navigation:

``` text
Home
Episodes
Newsletter
```

The "Back to Episodes" action should return to the existing episode
archive.

If the website already has breadcrumbs, reuse them.

------------------------------------------------------------------------

# 12. URL / Routing

Each episode should have a stable route based on the existing
video/episode identifier.

Preferred conceptual structure:

``` text
/episodes/:episodeId
```

Do not change the application's routing architecture unnecessarily.

Use the existing route convention if one already exists.

------------------------------------------------------------------------

# 13. Loading State

When episode data is loading:

-   Show skeleton UI or the existing loading component.
-   Do not flash empty content.
-   Keep the page layout stable.

------------------------------------------------------------------------

# 14. Missing / Invalid Episode

If the requested episode does not exist:

Display a clean state:

``` text
EPISODE NOT FOUND

We couldn't find this conversation.

[ BACK TO EPISODES ]
```

Do not expose raw API errors.

------------------------------------------------------------------------

# 15. Error Handling

Handle:

-   API failure
-   Missing video
-   Invalid episode ID
-   YouTube embed failure where possible

Use the existing project's error handling pattern.

Do not introduce a completely separate error architecture.

------------------------------------------------------------------------

# 16. Motion / Cinematic Interaction

Keep motion subtle.

Recommended:

-   Hero text entrance
-   Thumbnail/player fade-in
-   Metadata reveal
-   Related-card hover
-   Smooth button transitions

Avoid:

-   Excessive parallax
-   Constant animations
-   Distracting particle effects
-   Long page-transition delays

Respect reduced-motion preferences.

------------------------------------------------------------------------

# 17. Performance

-   Reuse existing API requests.
-   Avoid fetching the same episode multiple times.
-   Lazy-load related content where appropriate.
-   Avoid loading unnecessary images.
-   Do not introduce a heavy dependency solely for visual effects.

------------------------------------------------------------------------

# 18. Acceptance Criteria

The episode detail update is complete when:

-   Existing episode routes continue working.
-   Clicking an episode opens its detailed page.
-   Correct video is displayed.
-   Existing episode metadata is reused.
-   Description is displayed.
-   Chapters are displayed only when available.
-   Guest information is displayed when available.
-   Social links are displayed only when available.
-   Episode can be shared.
-   Related episodes are shown.
-   Newsletter CTA connects to the existing newsletter functionality.
-   Loading and error states work.
-   Mobile layout works.
-   No unrelated website functionality is modified.
