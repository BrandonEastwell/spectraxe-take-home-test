# Live Quote Blotter

React + TypeScript implementation of the Live FX Options Quote Blotter take-home task.

## Setup

The runnable app is in `vite-project`.

```bash
cd vite-project
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173/`.

Useful scripts:

```bash
npm run build
npm run lint
npm run test
npm run e2e
```

`npm run build`, `npm run lint`, `npm run test`, and `npm run e2e` were run successfully during implementation. Lint currently reports one existing warning in `mock-api/mock-api.ts` for an unused eslint-disable directive.

## Assumptions

- A quote is tradeable only when it has status `Quoted`, has both `bid` and `offer`, and is not expired.
- Expiry follows the task definition: an RFQ is expired only when its `YYYY-MM-DD` expiry date is strictly before today's UTC calendar date.
- Stale quotes are still tradeable. The brief asks for stale prices to be visually distinct, not blocked from acceptance.
- Currency filtering uses base and quote together as a currency pair. If only one side is selected, the current implementation does not filter by partial pair.
- The mock API is treated like a push/event source. The UI subscribes after initial fetch and unsubscribes on unmount.

## State Management Rationale

I used local React state in `App.tsx` rather than Context, Redux, Zustand, or another store. The state is small and page-scoped:

- fetched RFQs
- loading state
- filter panel visibility
- filters and sort order
- selected RFQ for the accept modal
- accepting RFQ id
- accept success/error feedback

This keeps the data flow explicit without adding global state machinery. Shared business logic is extracted into pure helpers:

- `filterRfqs`
- `sortRfqs`
- `updateRfq`
- `getQuoteStatusMessage`
- `isTradeable`
- `isExpired`
- `isStale`

The UI is split into focused components for the toolbar, modal, feedback message, mobile card grid, desktop table, and RFQ cards.

## Behaviour And Edge Cases

Initial loading:

- The app calls `fetchRfqs` and shows a loading state while waiting.
- If fetch fails, loading stops and an error message is shown in the same status/feedback area.
- Empty filtered or fetched results show a visible empty state.

Live updates:

- Updates are applied by RFQ id.
- Updates with a sequence number less than or equal to the current RFQ sequence number are ignored.
- Terminal statuses (`Accepted`, `Rejected`, `Expired`) are protected from being overwritten by later status updates.
- This matters because the mock stream can send delayed or out-of-order updates, including updates that would otherwise move an accepted RFQ back to `Quoted`.

Accept workflow:

- Non-tradeable quotes have disabled accept buttons.
- Accepting a tradeable quote opens a confirmation modal.
- The modal is keyboard-friendly: focus moves into it, Tab is trapped inside it, and Escape closes it unless an accept request is in progress.
- Confirming calls `acceptQuote`.
- Success shows a success message and the accepted update is reflected through the mock API update.
- Failure shows the API error message. The mock API can fail randomly and always fails specific configured RFQ ids.

Accessibility:

- Form controls have labels.
- Icon buttons include readable text or aria labels.
- Loading and result count status are announced with live regions.
- Feedback uses `role="status"` for success and `role="alert"` for errors.
- Tables include a screen-reader caption and scoped headers.

Responsive layout:

- Mobile uses RFQ cards.
- Medium and larger screens use a table.

## Improvements With More Time

- Restore focus to the originating Accept button after the modal closes.
- Add a dismiss button for feedback messages.
- Improve partial currency filtering so selecting only base or only quote still narrows results.
- Broaden test coverage for fetch failures, empty-state rendering, deterministic accept failures, and stale-row highlighting.
- Add optimistic or pending row-level status after confirm, depending on product preference.
- Add better fetch retry handling.
- Consider using a reducer if RFQ update and accept state grows more complex.
