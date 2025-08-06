# **App Name**: TikTok Arbitrage Automator

## Core Features:

- User Authentication: Authenticate user via TikTok account to access the 'For You' feed.
- Video Selection: Automatically selects a random video from the 'For You' feed that is not older than 18 months.
- Comment Selection: Under each selected video, find up to 10 new comments (or half if less than 20 total).  The app will avoid answering the same comments twice.
- Comment Posting: Post a pre-defined comment. Every 10 posts, randomly mix the first and last 27 characters of the message. Delay added to simulate human behavior.
- Continuous Operation: Run the bot until stopped manually, or an error condition occurs (API unavailability, rate limiting, etc.).
- Activity Logging: The tool monitors and logs actions (video selections, posted comments, errors) for debugging.
- Error Handling: Handle exceptions and errors gracefully and logs them, such as API unavailability, comment restrictions, network failures, or changes in TikTok's HTML structure. These conditions should not cause the application to exit.

## Style Guidelines:

- Primary color: Vibrant blue (#29ABE2) to reflect the dynamic nature of TikTok.
- Background color: Light gray (#F0F2F5) to provide a clean and modern look.
- Accent color: Bright green (#90EE90) to highlight key actions and notifications.
- Font: 'PT Sans', a humanist sans-serif that combines a modern look and a little warmth or personality; suitable for headlines or body text
- Use minimalistic icons for navigation and status indicators.
- Clean and intuitive layout mimicking TikTok's interface for easy user adaptation.