# My Implementation Log

This file documents the steps, decisions, and progress made during the implementation of the Tabi project. It includes both technical details and non-technical explanations for each milestone or feature as we move along the plan.

---

## How to Use This Log
- For each major task or milestone, add a dated entry.
- Include both technical details (code, architecture, libraries, challenges) and non-technical summaries (goals, outcomes, lessons learned).
- Use this as a running journal to track your journey and communicate progress to both technical and non-technical stakeholders.

---

## Example Entry

### [YYYY-MM-DD] UI Components & Navigation
**Technical:**
- Verified the implementation of all required reusable UI components: Button, Card, Modal, Toast, and ConfirmationDialog. Each supports variants, customization, and accessibility.
- Confirmed file-based routing using Expo Router, with layouts and nested routes in the app/ directory.
- ProtectedRoute is implemented and used for authentication-based navigation control.
- Route transitions and error boundaries are present and integrated in the main layout.
- Login and registration screens are implemented in both /auth and /(auth) directories.

**Non-Technical:**
- Goal: Ensure the app is modular, maintainable, and user-friendly from the start.
- Outcome: The UI is consistent, navigation is smooth, and error handling is robust. The groundwork is solid for further feature development.
- Lesson: Early investment in reusable components and navigation structure pays off in scalability and developer experience.

### [2024-06-09] API Connections & Profile Integration
**Technical:**
- Refactored the profile screen to fetch user data from the backend API using a new custom hook (`useProfile`) built on React Query and the profile service.
- Implemented error state UI for the profile screen, allowing users to retry loading on failure.
- Ensured loading and error states are handled in the UI, improving user experience and reliability.
- Confirmed that the API service layer, Axios instance, and error boundaries are robust and in use.

**Non-Technical:**
- Goal: Make profile data always up-to-date and resilient to network/API errors.
- Outcome: The profile screen now reliably displays live user data from the backend, and users see clear feedback if something goes wrong.
- Lesson: Using React Query and custom hooks simplifies data management and improves maintainability.

### [2024-06-09] Portfolio UI Interaction (Start)
**Technical:**
- Installed @hello-pangea/dnd, a drag-and-drop library compatible with React and React Native Web, to enable drag-and-drop functionality for portfolio items.
- Next steps: Design a portfolio item component, implement drag-and-drop logic, and add visual feedback during drag operations.

**Non-Technical:**
- Goal: Allow users to intuitively reorder their portfolio items for better customization and presentation.
- Outcome: The technical foundation for drag-and-drop is now in place; UI/UX improvements will follow as we implement the feature.
- Lesson: Choosing a library with good web and native support is key for cross-platform consistency.

### [2024-06-09] Portfolio UI Interaction (Drag-and-Drop Implemented)
**Technical:**
- Created a reusable `PortfolioItem` component for displaying portfolio entries.
- Implemented a drag-and-drop UI for portfolio items using `@hello-pangea/dnd` in a new `portfolio.jsx` screen.
- Integrated navigation from the profile menu to the new portfolio screen.
- The UI supports reordering items with visual feedback during drag operations.

**Non-Technical:**
- Goal: Empower users to easily reorder and manage their portfolio items for better presentation.
- Outcome: The drag-and-drop feature is now live and accessible from the profile section, making the app more interactive and user-friendly.
- Lesson: Modular components and clear navigation make it easy to add new features and improve UX.

### [2024-06-09] Portfolio UI Interaction (Responsive Improvements)
**Technical:**
- Updated the portfolio drag-and-drop screen and PortfolioItem component to use NativeWind (Tailwind) classes and responsive styles.
- The UI now adapts to different screen sizes (mobile, tablet, web) with improved spacing, text sizing, and layout.
- Ensured horizontal padding and max-width for better readability on large screens.

**Non-Technical:**
- Goal: Make the portfolio section visually appealing and usable on any device.
- Outcome: The drag-and-drop portfolio UI is now responsive, providing a consistent experience across devices.
- Lesson: Responsive design is essential for modern web and mobile apps, and utility-first CSS (NativeWind) makes it easier.

---

_Add your implementation notes below as you progress!_ 