# AI Usage

AI assistance was used during this take-home submission.

## What I Used AI For

- Adding accessibility improvements:
  - labelled controls
  - clearer button text
  - keyboard-friendly filter and accept modals
  - aria-live status and feedback messaging
- Refactoring `App.tsx`:
  - extracting pure helpers for filtering, sorting, live update merging, and status messaging
  - extracting UI components for toolbar, feedback, mobile cards, and desktop table
- Drafting this documentation.

## What I Changed Or Rejected

- Kept state management local to React state instead of adding Redux, Zustand, or Context. The app state is page-scoped and small enough that a global store would add unnecessary complexity.
- Changed the live update handling to use functional state updates so updates are applied to the latest RFQ state rather than a stale initial fetch snapshot.
- Added sequence-number checks so out-of-order updates do not overwrite newer data.
- Preserved terminal RFQ statuses so delayed stream updates do not move accepted/rejected/expired quotes back to quoted.
- Kept stale quotes tradeable because the brief asks for stale prices to be visually highlighted, not blocked.
- Avoided adding broad abstractions beyond small helpers/components because the app is still a single-page workflow.

## What I Verified Manually

- Ran `npm run build`; it passed.
- Ran `npm run lint`; it passed with one existing warning in `mock-api/mock-api.ts` about an unused eslint-disable directive.
- Ran `npm run test -- --runInBand`; it passed.
- Ran `npm run e2e`; it passed after installing the local Playwright Chromium browser.
- Checked the accept flow in code:
  - accept button opens the confirmation modal
  - confirm calls `acceptQuote`
  - success and error messages are surfaced
  - accept controls are disabled while the request is pending
- Checked keyboard behaviour in code:
  - modal focuses an internal control on mount
  - Tab focus is trapped inside the modal
  - Escape closes the modal when not accepting
- Reviewed the mock API behaviour and handled out-of-order updates, deterministic accept failures, random accept failures, and delayed post-accept quote updates.

## Known Gaps

- Focus is moved into modals, but focus is not yet restored to the original trigger after closing.
- Tests cover the required minimum behaviours, but additional cases such as fetch failure, empty API response, stale highlighting, and deterministic accept failure would be useful.
