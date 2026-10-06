JOURY PWA STARTER

This is the first PWA layer for the existing Joury Google Apps Script application.

1. Open index.html.
2. The Google Apps Script Web App URL is already configured in index.html.
3. Host this folder on an HTTPS static host such as GitHub Pages or Firebase Hosting.
4. Open the HTTPS address on the phone and install/add it to the Home Screen.

IMPORTANT
- Do not replace the existing Apps Script calculator code.
- The iframe loads the existing Joury app.
- The service worker caches only the PWA shell, not the calculator data/history.
- Your Google Sheet remains the backend.
- iPhone Safari normally uses "Add to Home Screen" rather than an in-browser install prompt.

NEXT STEP
After the wrapper is hosted and tested, we can improve the app shell (loading screen, offline/error screen, icon, branding, safe-area spacing) without touching the calculator logic.
