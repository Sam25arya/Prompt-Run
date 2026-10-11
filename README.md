# PaisaPilot — Your Money, in Control

**PaisaPilot is a personal-finance simulator that helps people understand the impact of everyday spending before they commit to a purchase.** It is designed as a hackathon MVP with a 30-day sample budget of ₹10,000.

## The problem

It is easy to make small purchases without understanding how they affect the rest of the month. Many budgeting tools show past spending, but a person may also need a quick way to ask: *“If I buy this now, what happens to my budget later?”*

## Our solution

PaisaPilot combines a budget overview with a **Decision Lab**. Users can simulate a purchase, review its estimated impact, and then choose whether to add it to the demo plan.

## Current MVP features

- Overview of available balance, spending, savings, daily pace, and month-end forecast.
- Decision Lab to estimate the effect of a one-time, weekly, or monthly purchase.
- Add income and expense transactions.
- Savings-goal progress and editable goal amount.
- Spending-mix and recent-activity panels.
- Budget risk and financial-health indicators.
- Responsive layout for desktop, tablet, and mobile.
- Sample/demo data so judges can explore the interface without connecting a bank account.

## Tech stack

- React 18
- Vite 6
- Lucide React icons
- Custom CSS

## Run locally

**Prerequisite:** Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

Run `npm run build` before submitting. Fix any errors before publishing.

## Suggested judge demo (2–3 minutes)

1. **Introduce the problem:** people need to understand how a purchase affects their remaining budget, not just see a list of expenses.
2. **Show the overview:** point out available balance, savings, daily pace, and the month-end forecast.
3. **Open Decision Lab:** enter a purchase name, amount, category, and frequency.
4. **Simulate the decision:** explain the estimated balance, daily allowance, forecast, and risk level.
5. **Confirm only if desired:** confirm the purchase to add it to the demo transaction list and update the spending plan.
6. **Add a transaction:** demonstrate income/expense entry and the savings-goal editor.
7. **Close with the next step:** explain how persistent storage and a real backend could be added after validating the core idea.

## Important scope and limitations

- This is a **demo simulator**, not a bank, payment service, or financial-advice product.
- No bank accounts are connected and no backend/API is configured.
- App data is held in React state and resets when the page is refreshed.
- Some visualizations and commitments use illustrative sample data and are not all derived from the transaction list.
- The navigation currently changes the selected section label; the dashboard content is not yet split into fully independent pages.
- Figures are estimates based on the demo's simplified budgeting model. Do not present them as verified financial advice.

Be transparent about these limitations during judging. Do not claim bank integration, AI-powered analysis, authentication, cloud sync, or persistent storage unless those are actually implemented.

## Submission checklist

See [SUBMISSION_CHECKLIST.md](./SUBMISSION_CHECKLIST.md) for the final checks.

## License

Add the license required by your team or hackathon rules before making the repository public.
