## [Date] ComponentDemoScreen.tsx Fixes
- Added a default export for ComponentDemoScreen to resolve 'type is invalid' error.
- Changed CardHeader, CardBody, CardFooter usage to Card.Header, Card.Body, Card.Footer (not named exports).
- Fixed all style prop array usages to be compatible with React Native's StyleSheet.
- Aligned dialogType and showConfirmationDialog to use only allowed types for ConfirmationDialog ('default', 'danger', 'warning', 'success').
- Mapped dialogType to valid ToastType values for showToast (e.g., 'danger' → 'error', 'default' → 'info').
- These changes resolve all previous type and runtime errors in the web build.

## [Date] Web App Load & Navigation Fixes
- Fixed all import paths for SearchBar and other components in tab screens.
- Removed stray syntax error ('c is not defined') in salaries page.
- Updated Expo app.json config to set web colorScheme to 'class' for dark mode support.
- Changed favicon path to use an existing image (adaptive-icon.png) to resolve ENOENT errors.
- Cleared Expo and Next.js caches and restarted the dev server.
- Verified that the web app now loads and all main navigation tabs are accessible. 