# PaisaPilot — Hackathon Submission Checklist

Use this before uploading the repository or submitting the project link.

## A. Run and build
- [ ] Install dependencies with `npm install`.
- [ ] Start locally with `npm run dev`.
- [ ] Run `npm run build` and confirm it completes without errors.
- [ ] Test the production build using `npm run preview`.
- [ ] Open the app in Chrome and check the browser console for errors.

## B. Test the core demo
- [ ] Confirm the overview loads with the sample ₹10,000 plan.
- [ ] Open Decision Lab and simulate a valid purchase.
- [ ] Try a purchase greater than the available balance; it should not be confirmable.
- [ ] Confirm a valid purchase and verify the balance/spending updates.
- [ ] Add an expense and verify spending updates.
- [ ] Add income and verify the available balance updates.
- [ ] Edit the savings goal and verify the goal progress updates.
- [ ] Reset the demo and verify the original sample values return.
- [ ] Refresh the page and be prepared for the current demo state to reset.

## C. Responsive and accessibility checks
- [ ] Check desktop width.
- [ ] Check a tablet-sized viewport.
- [ ] Check a narrow mobile viewport (320–390 px).
- [ ] Ensure dialogs can be closed using their close buttons and by clicking the backdrop.
- [ ] Navigate using the keyboard and verify focus outlines are visible.
- [ ] Ensure text, buttons, and amounts are not clipped.

## D. Submission materials
- [ ] Replace or confirm the team name and member details in the submission form.
- [ ] Add the official problem statement and judging criteria to the pitch notes.
- [ ] Prepare a short demo video or screenshots if required.
- [ ] Include the repository URL and a working deployed URL if the event asks for them.
- [ ] Verify repository visibility and deadline rules.
- [ ] Check whether the event requires a license, attribution, or declaration of AI/tool use.
- [ ] Do not commit API keys, passwords, `.env` files, or private user data.
- [ ] Confirm the README describes only features that actually work.

## E. Honest product claims
- [ ] Explain that this is a simulator using sample data.
- [ ] Do not claim bank connectivity, authentication, cloud storage, or AI insights.
- [ ] Mention that app state resets on refresh and some charts/commitments are illustrative.
- [ ] Present persistence, transaction-derived analytics, and real user profiles as future work unless implemented.

## Suggested short pitch

“PaisaPilot helps people make more mindful spending decisions. Instead of only showing what has already been spent, its Decision Lab lets users simulate a planned purchase and see the estimated effect on their available balance, daily allowance, and month-end outlook. This MVP uses sample data to demonstrate the core experience; future iterations can add persistent profiles and analytics derived directly from transactions.”
