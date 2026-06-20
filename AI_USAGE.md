# AI Usage

AI assistance was used during this take-home submission.

## What I Used AI For

- Understanding the domain terminology and requirements in the task brief, including RFQ tradeability, quote freshness, expiry handling, and expected trading UI behaviour.
- Discussing UI and UX decisions:
  - desktop table versus mobile card layouts
  - responsive behaviour for smaller screens
  - status badges and stale quote highlighting
  - filter design and organisation
- Adding accessibility improvements:
  - labelled controls
  - clearer button text
  - keyboard-friendly filter and accept modals
  - aria-live status and feedback messaging
- Refactoring `App.tsx`:
  - extracting logic into helpers for filtering, sorting, live update merging, and status messaging
  - extracting UI components for toolbar, feedback, mobile cards, and desktop table
- Improving code quality:
  - simplifying conditional rendering
  - reducing JSX complexity
  - improving readability and maintainability
- Drafting project documentation, including the README and this AI_USAGE.md file.
- Generating initial testing boilerplate and discussing suitable test coverage for unit and end-to-end tests.

## What I Changed Or Rejected

- Reviewed all generated suggestions before use and adapted them to fit the application architecture.
- Avoided introducing unnecessary abstractions or complex state-management patterns because the application is a small single-page workflow where props can be drilled easily.
- Made independent decisions around tradeability rules, filtering behaviour, component structure, and responsive design rather than accepting suggestions verbatim.


## What I Verified Manually

- Read and understood all generated code before incorporating it into the project.
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
- Manually reviewed the application in the browser across desktop and smaller screen sizes.