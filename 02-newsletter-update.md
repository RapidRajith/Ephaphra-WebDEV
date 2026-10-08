# Update Specification 02 --- Newsletter + Community Interaction

## IMPORTANT --- EXISTING WEBSITE CONSTRAINT

This is an **incremental update to an already-built website**.

The existing website is approximately 50% complete.

### Do NOT rebuild the website

-   Do not create a new project.
-   Do not replace the current architecture.
-   Do not remove existing routes or components.
-   Do not redesign unrelated pages.
-   Do not replace existing APIs or backend services if they already
    work.
-   Reuse the current form components, validation utilities, API
    utilities, database/client setup, typography, buttons, and design
    system.
-   Only extend the existing newsletter functionality with the
    requirements below.

------------------------------------------------------------------------

# 1. Newsletter Goal

Upgrade the existing newsletter section/page from a basic email signup
into a **premium podcast community / insider signup experience**.

The form should feel like part of the creator's brand rather than a
generic subscription form.

Primary goal:

> Capture useful visitor information and transmit it to the existing
> backend/database.

------------------------------------------------------------------------

# 2. Newsletter Form

Keep the existing email field if it already exists.

Add the following fields only if they do not already exist.

### Required / recommended fields

``` text
Name
[________________________]

Email
[________________________]

What are you interested in?
[ Select an option ▼ ]

Favorite / Relevant Episode
[ Select a video ▼ ]

Message / Comment
[________________________
 _________________________]

[ JOIN THE CONVERSATION ]
```

Do not force unnecessary fields to be mandatory.

------------------------------------------------------------------------

# 3. Interest Dropdown

Add an interest selector.

Suggested options:

``` text
What are you interested in?

[ Select an interest ]

• New podcast episodes
• Behind the scenes
• Creator updates
• Guest announcements
• Exclusive content
• Short clips / highlights
• All updates
```

Use the creator's actual content categories if they are already
available from the existing project.

------------------------------------------------------------------------

# 4. Episode / Video Selection

The form should contain a dropdown allowing the visitor to select a
relevant podcast/video.

Example:

``` text
Which episode do you like?

[ Select an episode ▼ ]
```

### Data source

Populate the dropdown from the **existing video/episode API data**.

Do not hardcode a long list if the website already retrieves videos
dynamically.

Display useful information such as:

``` text
Episode title
Guest name if available
```

The submitted record should retain the selected video's stable ID if
available.

Do not rely only on the displayed title as the database identifier.

------------------------------------------------------------------------

# 5. Comment / Message Box

Add an optional comment/message field.

Purpose:

Allow visitors to:

-   Share feedback
-   Suggest future guests
-   Suggest topics
-   Tell the creator what they enjoyed
-   Submit a general message

Example placeholder:

``` text
What would you like to see or hear next?
```

Keep this field optional.

------------------------------------------------------------------------

# 6. Optional Guest / Topic Suggestion

If the existing form structure allows it without becoming cluttered,
add:

``` text
Suggest a guest or topic

[____________________________]
```

This should remain optional.

Do not add this field if it makes the form unnecessarily long on mobile.

------------------------------------------------------------------------

# 7. Backend Data

The backend/database record should contain, where applicable:

``` text
id
name
email
interest
selected_episode_id
selected_episode_title
comment
guest_or_topic_suggestion
created_at
```

Use the existing backend/database architecture.

### IMPORTANT

Do not create a second backend system if one already exists.

Extend the current API/database integration.

------------------------------------------------------------------------

# 8. Validation

Implement client-side validation for:

### Email

-   Required
-   Valid email format

### Name

-   Required only if the existing UX intends it to be required

### Other fields

-   Optional unless specifically necessary

Show clear inline validation.

Example:

``` text
Please enter a valid email address.
```

Do not use browser-default validation alone if the existing design
supports custom validation.

------------------------------------------------------------------------

# 9. Submission States

The form must clearly communicate state.

### Default

``` text
[ JOIN THE CONVERSATION ]
```

### Submitting

``` text
[ SUBSCRIBING... ]
```

Prevent duplicate submissions while the request is processing.

### Success

Display a polished confirmation:

``` text
✓ YOU'RE IN.

Welcome to the conversation.

You'll hear from us when something
interesting is happening.

[ BACK TO EXPLORING ]
```

### Error

``` text
Something went wrong.

Please try again.
```

Do not silently fail.

------------------------------------------------------------------------

# 10. Duplicate Email Handling

If the backend/database detects an existing subscriber:

Do not create duplicate records.

Show a friendly message such as:

``` text
You're already part of the conversation.
```

Do not expose database errors directly to the user.

------------------------------------------------------------------------

# 11. Privacy / Consent

Add a small privacy note near the submit button.

Example:

``` text
By subscribing, you agree to receive updates from the creator.
```

If the existing project has a privacy policy route, link to it.

Do not create unnecessary legal text.

------------------------------------------------------------------------

# 12. Premium Visual Treatment

Keep the existing design system.

Enhance the newsletter area with:

-   Strong editorial typography
-   Subtle ambient background
-   Large whitespace
-   Clean form fields
-   Clear focus states
-   Smooth hover/focus transitions
-   Strong CTA

Avoid excessive glassmorphism.

The form should remain highly readable.

------------------------------------------------------------------------

# 13. Accessibility

Ensure:

-   Every field has an accessible label.
-   Keyboard navigation works.
-   Focus states are visible.
-   Dropdowns are keyboard accessible.
-   Error messages are understandable.
-   Buttons have meaningful labels.
-   Color is not the only way to communicate validation.

------------------------------------------------------------------------

# 14. Mobile UX

On mobile:

-   Stack all fields vertically.
-   Make dropdowns easy to tap.
-   Keep the textarea comfortable to use.
-   Make the submit button full-width where appropriate.
-   Avoid fields becoming too small.

------------------------------------------------------------------------

# 15. Security / Data Handling

Do not expose private backend credentials in frontend code.

Use the existing secure backend/client approach.

Sanitize and validate submitted values server-side as well if the
backend supports it.

Do not collect unnecessary personal information.

------------------------------------------------------------------------

# 16. Acceptance Criteria

The newsletter update is complete when:

-   Existing newsletter functionality remains intact.
-   Email is successfully transmitted to the backend/database.
-   Interest can be selected.
-   Existing podcast/video data populates the episode selector.
-   Selected episode ID is retained where available.
-   User can submit an optional comment.
-   Validation works.
-   Loading state works.
-   Success state works.
-   Error state works.
-   Duplicate emails are handled gracefully.
-   The form is responsive and accessible.
-   No unrelated pages or architecture are changed.
