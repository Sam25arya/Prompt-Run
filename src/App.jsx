import React, { useMemo, useState } from "react";
import {
  Wallet, LayoutDashboard, ArrowLeftRight, Target, Repeat2, ShieldCheck,
  Settings, Bell, Search, Plus, ChevronDown, ArrowUpRight, ArrowDownRight,
  Sparkles, TrendingUp, TrendingDown, Clock3, ShoppingBag, Coffee, Bus,
  Utensils, Music2, HeartPulse, CircleAlert, Check, X, SlidersHorizontal,
  CalendarDays, Zap, PiggyBank, MoreHorizontal, ArrowRight, RotateCcw
} from "lucide-react";

const initialTransactions = [
  { id: 1, title: "Weekly groceries", category: "Food", date: "Today, 10:42 AM", amount: -680, icon: ShoppingBag, color: "peach" },
  { id: 2, title: "Metro recharge", category: "Transport", date: "Yesterday", amount: -350, icon: Bus, color: "blue" },
  { id: 3, title: "Coffee with friends", category: "Lifestyle", date: "Yesterday", amount: -180, icon: Coffee, color: "pink" },
  { id: 4, title: "Freelance payment", category: "Income", date: "Oct 08, 2026", amount: 2500, icon: ArrowDownRight, color: "green" },
];

const fmt = n => "₹" + Math.round(n).toLocaleString("en-IN");
const money = n => (n < 0 ? "−" : "+") + fmt(Math.abs(n));

function App() {
  const [active, setActive] = useState("Overview");
  const [budget, setBudget] = useState(10000);
  const [days, setDays] = useState(30);
  const [day, setDay] = useState(8);
  const [spent, setSpent] = useState(2860);
  const [saved, setSaved] = useState(1200);
  const [goal, setGoal] = useState(3000);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [simOpen, setSimOpen] = useState(false);
  const [simAmount, setSimAmount] = useState(799);
  const [simName, setSimName] = useState("New sneakers");
  const [simCategory, setSimCategory] = useState("Lifestyle");
  const [simFrequency, setSimFrequency] = useState("One-time");
  const [simulated, setSimulated] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [addAmount, setAddAmount] = useState("250");
  const [addTitle, setAddTitle] = useState("");
  const [addType, setAddType] = useState("expense");
  const [showAll, setShowAll] = useState(false);
  const [toast, setToast] = useState("");
  const [goalEdit, setGoalEdit] = useState(false);
  const [goalDraft, setGoalDraft] = useState("3000");
  const [tab, setTab] = useState("Overview");

  const balance = budget - spent - saved;
  const daily = Math.max(0, balance / Math.max(1, days - day));
  const baseDaily = budget / days;
  const spendRate = spent / Math.max(1, day);
  const projectedSpend = spendRate * days;
  const forecast = budget - projectedSpend - saved;
  const remainingDays = Math.max(0, days - day);
  const goalProgress = Math.min(100, (saved / Math.max(1, goal)) * 100);
  const risk = balance < 1500 || forecast < 0 ? "High" : balance < 3500 || forecast < 1000 ? "Medium" : "Low";
  const healthScore = Math.max(12, Math.min(98, Math.round(100 - (spent / budget) * 35 - (risk === "High" ? 28 : risk === "Medium" ? 12 : 0) + (goalProgress > 50 ? 8 : 0))));
  const currentDay = Math.min(day, days);

  const categories = [
    { name: "Food & groceries", value: 1120, color: "#a99cff", icon: Utensils },
    { name: "Transport", value: 640, color: "#83c9ff", icon: Bus },
    { name: "Lifestyle", value: 720, color: "#ffadbd", icon: ShoppingBag },
    { name: "Subscriptions", value: 380, color: "#ffc779", icon: Music2 },
  ];
  const navItems = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Transactions", icon: ArrowLeftRight },
    { label: "Savings goals", icon: Target },
    { label: "Subscriptions", icon: Repeat2 },
    { label: "Financial health", icon: ShieldCheck },
  ];

  function notify(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2600);
  }

  function applyDecision() {
    const amount = Math.max(0, Number(simAmount) || 0);
    if (!simName.trim() || amount <= 0) return notify("Add a name and an amount greater than ₹0.");
    if (amount > balance) return notify("This decision is larger than your available balance.");
    const tx = { id: Date.now(), title: simName, category: simCategory, date: "Just now", amount: -amount, icon: ShoppingBag, color: "pink" };
    setTransactions(prev => [tx, ...prev]);
    setSpent(prev => prev + amount);
    setSimOpen(false);
    setSimulated(false);
    notify(`${fmt(amount)} added to your spending. Your plan has been updated.`);
  }

  function addTransaction(e) {
    e.preventDefault();
    const amount = Number(addAmount);
    if (!addTitle.trim() || !amount || amount <= 0) return notify("Enter a description and valid amount.");
    if (addType === "expense" && amount > balance) return notify("That expense exceeds your available balance.");
    const tx = { id: Date.now(), title: addTitle, category: addType === "income" ? "Income" : "Other", date: "Just now", amount: addType === "income" ? amount : -amount, icon: addType === "income" ? ArrowDownRight : ShoppingBag, color: addType === "income" ? "green" : "peach" };
    setTransactions(prev => [tx, ...prev]);
    if (addType === "income") setBudget(prev => prev + amount);
    else setSpent(prev => prev + amount);
    setShowAdd(false);
    setAddTitle("");
    notify("Transaction added successfully.");
  }

  function resetDemo() {
    setBudget(10000); setDays(30); setDay(8); setSpent(2860); setSaved(1200);
    setGoal(3000); setTransactions(initialTransactions); setSimAmount(799); setSimName("New sneakers");
    notify("Demo reset to the original ₹10,000 plan.");
  }

  const visibleTransactions = showAll ? transactions : transactions.slice(0, 4);
  const chartPoints = useMemo(() => {
    const vals = [10000, 9380, 8870, 8430, 7920, 7440, 6980, 7140, Math.max(500, balance), Math.max(300, forecast)];
    const max = Math.max(...vals, budget);
    return vals.map((v, i) => `${i * 100 / (vals.length - 1)},${82 - (v / max) * 64}`).join(" ");
  }, [balance, forecast, budget]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><Wallet size={21} strokeWidth={2.5} /></div>
          <div><strong>paisa<span>pilot</span></strong><small>YOUR MONEY, IN CONTROL</small></div>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav>
          {navItems.map(({label, icon: Icon}) => (
            <button key={label} className={`nav-item ${active === label ? "active" : ""}`} onClick={() => {setActive(label); setTab(label);}}>
              <Icon size={18} /><span>{label}</span>{label === "Financial health" && <span className="nav-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon"><Sparkles size={17}/></div>
            <strong>Money moves, made smarter.</strong>
            <p>Small choices today. More freedom tomorrow.</p>
            <button onClick={() => {setSimOpen(true); setSimulated(false);}}>Try decision lab <ArrowRight size={14}/></button>
          </div>
          <button className="nav-item muted" onClick={() => notify("Settings are ready for your next iteration.")}><Settings size={18}/><span>Settings</span></button>
          <div className="profile">
            <div className="avatar">AS</div>
            <div className="profile-copy"><strong>Arya Sawant</strong><small>Budget explorer</small></div>
            <MoreHorizontal size={18} className="profile-more"/>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb"><span>My money</span><span className="crumb-slash">/</span><strong>{active}</strong></div>
          <div className="top-actions">
            <div className="period-chip"><CalendarDays size={15}/><span>Oct 1 – 30, 2026</span><ChevronDown size={14}/></div>
            <button className="icon-button" aria-label="Search" onClick={() => notify("Search is coming soon. Use the transaction list for now.")}><Search size={18}/></button>
            <button className="icon-button notification" aria-label="Notifications" onClick={() => notify(risk === "High" ? "Heads up: your projected balance needs attention." : "You're on track. Keep making mindful money moves.")}><Bell size={18}/><i/></button>
            <button className="avatar small-avatar" onClick={() => notify("Signed in as Arya Sawant.")}>AS</button>
          </div>
        </header>

        <div className="content">
          {active !== "Overview" && <div className="section-switch"><span>{active}</span><button className="text-button" onClick={() => setActive("Overview")}>Back to overview <ArrowRight size={14}/></button></div>}
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><span className="live-dot"/>{currentDay} DAYS INTO YOUR PLAN</div>
              <h1>Hey Arya, let's make<br className="desktop-break"/> your money <span>go further.</span></h1>
              <p className="welcome-sub">A little clarity today can mean a lot more freedom tomorrow.</p>
            </div>
            <button className="primary-button" onClick={() => setShowAdd(true)}><Plus size={18}/> Add transaction</button>
          </section>

          <section className="hero-grid">
            <div className="balance-card">
              <div className="balance-card-top">
                <div className="balance-label"><span className="wallet-mini"><Wallet size={16}/></span> AVAILABLE BALANCE <span className="info-dot" title="Budget minus spending and planned savings">i</span></div>
                <button className="more-button" aria-label="More options" onClick={resetDemo}><RotateCcw size={16}/></button>
              </div>
              <div className="balance-amount">{fmt(balance)}</div>
              <div className="balance-meta"><span className="positive-pill"><TrendingUp size={13}/> Your money is still working</span><span className="meta-muted">of {fmt(budget)} total budget</span></div>
              <div className="balance-track"><div style={{width:`${Math.max(0, Math.min(100, balance / budget * 100))}%`}}/></div>
              <div className="balance-legend"><span><i className="legend-dot purple"/>Spent <strong>{fmt(spent)}</strong></span><span><i className="legend-dot mint"/>Saved <strong>{fmt(saved)}</strong></span><span><i className="legend-dot white"/>Available <strong>{fmt(balance)}</strong></span></div>
              <div className="card-orbit orbit-one"/><div className="card-orbit orbit-two"/>
            </div>

            <div className="daily-card">
              <div className="card-heading"><div><span className="small-kicker">YOUR DAILY PACE</span><h3>Spend with a plan</h3></div><div className="daily-icon"><Zap size={18}/></div></div>
              <div className="daily-number">{fmt(daily)}<span>/ day</span></div>
              <p className="muted-copy">Safe-to-spend average for the next {remainingDays} days.</p>
              <div className="pace-comparison"><span className="pace-label">Original daily budget</span><strong>{fmt(baseDaily)}<span>/ day</span></strong></div>
              <div className="pace-bar"><div style={{width:`${Math.min(100, daily / Math.max(1, baseDaily) * 100)}%`}}/></div>
              <div className="pace-foot"><span>{daily < baseDaily ? "A tighter pace from here" : "Room to breathe"}</span><span>{Math.round(daily / Math.max(1, baseDaily) * 100)}% of original</span></div>
            </div>
          </section>

          <section className="metric-grid">
            <div className="metric-card"><div className="metric-top"><span className="metric-icon lavender"><ArrowUpRight size={17}/></span><span className="metric-label">TOTAL SPENT</span><span className="metric-trend down"><TrendingUp size={13}/> {Math.round(spent/budget*100)}%</span></div><strong>{fmt(spent)}</strong><div className="metric-foot"><span>of {fmt(budget)} budget</span><div className="mini-progress"><i style={{width:`${Math.min(100, spent/budget*100)}%`}}/></div></div></div>
            <div className="metric-card"><div className="metric-top"><span className="metric-icon mint"><PiggyBank size={17}/></span><span className="metric-label">SAVINGS GOAL</span><span className="metric-trend up">{Math.round(goalProgress)}%</span></div><strong>{fmt(saved)}<small> / {fmt(goal)}</small></strong><div className="metric-foot"><span>{fmt(Math.max(0,goal-saved))} left to your goal</span><div className="mini-progress mint-progress"><i style={{width:`${goalProgress}%`}}/></div></div></div>
            <div className="metric-card"><div className="metric-top"><span className="metric-icon peach"><TrendingUp size={17}/></span><span className="metric-label">MONTH-END FORECAST</span><span className={`metric-trend ${forecast >= 0 ? "up" : "down"}`}>{forecast >= 0 ? "On track" : "At risk"}</span></div><strong className={forecast < 0 ? "danger-text" : ""}>{fmt(forecast)}</strong><div className="metric-foot"><span>{forecast >= 0 ? "Projected unallocated money" : "Projected shortfall"}</span><div className="forecast-spark"><i/><i/><i/><i/><i/><i/><i/></div></div></div>
            <div className="metric-card health-metric"><div className="metric-top"><span className="metric-icon blue"><HeartPulse size={17}/></span><span className="metric-label">MONEY HEALTH</span><span className={`health-status ${risk.toLowerCase()}`}>{risk} risk</span></div><div className="health-score-row"><strong>{healthScore}<small>/100</small></strong><div className="health-ring" style={{"--score":`${healthScore*3.6}deg`}}><span>{healthScore >= 70 ? "✦" : "!"}</span></div></div><div className="metric-foot"><span>{healthScore >= 70 ? "You're building good habits" : "Let's strengthen your buffer"}</span></div></div>
          </section>

          <section className="middle-grid">
            <div className="panel forecast-panel">
              <div className="panel-header"><div><div className="panel-title-row"><h2>Balance forecast</h2><span className="soft-badge"><span className="tiny-dot"/> LIVE MODEL</span></div><p>Where your money could take you this month</p></div><button className="select-chip" onClick={() => notify("Forecast uses your current average daily spend.")}>30 days <ChevronDown size={14}/></button></div>
              <div className="chart-summary"><strong>{fmt(forecast)}</strong><span className={forecast >= 0 ? "good-text" : "danger-text"}>{forecast >= 0 ? "left at month end" : "projected shortfall"}</span></div>
              <div className="chart-wrap">
                <div className="chart-y-labels"><span>₹10k</span><span>₹7.5k</span><span>₹5k</span><span>₹2.5k</span><span>₹0</span></div>
                <svg className="chart" viewBox="0 0 900 180" preserveAspectRatio="none" role="img" aria-label="Illustrative balance forecast line chart">
                  <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#8e7dff" stopOpacity=".25"/><stop offset="100%" stopColor="#8e7dff" stopOpacity="0"/></linearGradient></defs>
                  {[20,55,90,125,160].map(y => <line key={y} x1="0" x2="900" y1={y} y2={y} stroke="#eeeef5" strokeDasharray="4 6"/>)}
                  <polygon points={`0,180 ${chartPoints.split(" ").map(p=>{const [x,y]=p.split(","); return `${x*9},${y*2}`}).join(" ")} 900,180`} fill="url(#chartFill)"/>
                  <polyline points={chartPoints.split(" ").map(p=>{const [x,y]=p.split(","); return `${x*9},${y*2}`}).join(" ")} fill="none" stroke="#8473f8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="700" cy={Number(chartPoints.split(" ")[7].split(",")[1])*2} r="5" fill="#fff" stroke="#8473f8" strokeWidth="3"/>
                </svg>
              </div>
              <div className="chart-x-labels"><span>Day 1</span><span>Day 7</span><span>Day 14</span><span>Day 21</span><span>Day 30</span></div>
              <div className="chart-note"><Sparkles size={15}/><span><strong>Money insight:</strong> {forecast >= 1000 ? `At your current pace, you could finish with ${fmt(forecast)} unallocated.` : "Your current pace may leave little room for surprises. Try the Decision Lab to compare options."}</span></div>
            </div>

            <div className="panel spending-panel">
              <div className="panel-header"><div><h2>Spending mix</h2><p>Where your money is going</p></div><button className="round-menu" onClick={() => setActive("Transactions")} aria-label="View transactions"><MoreHorizontal size={18}/></button></div>
              <div className="donut-area">
                <div className="donut" style={{"--food":"39%","--transport":"22%","--lifestyle":"25%","--subs":"14%"}}><div className="donut-hole"><strong>{fmt(spent)}</strong><span>total spent</span></div></div>
                <div className="donut-side"><span>Budget used</span><strong>{Math.round(spent/budget*100)}%</strong><div className="thin-progress"><i style={{width:`${Math.min(100,spent/budget*100)}%`}}/></div><small>{fmt(Math.max(0,budget-spent))} unspent before savings</small></div>
              </div>
              <div className="category-list">
                {categories.map(c => <div className="category-row" key={c.name}><span className="category-dot" style={{background:c.color}}/><span className="category-name">{c.name}</span><strong>{fmt(c.value)}</strong><span className="category-percent">{Math.round(c.value/2860*100)}%</span></div>)}
              </div>
            </div>
          </section>

          <section className="bottom-grid">
            <div className="panel transactions-panel">
              <div className="panel-header"><div><h2>Recent activity</h2><p>Your latest money moves</p></div><button className="text-button" onClick={() => {setShowAll(!showAll); setActive("Transactions");}}>{showAll ? "Show less" : "View all"} <ArrowRight size={14}/></button></div>
              <div className="transaction-table">
                {visibleTransactions.map(tx => {
                  const Icon = tx.icon || ShoppingBag;
                  return <div className="transaction-row" key={tx.id}><div className={`transaction-icon ${tx.color || "peach"}`}><Icon size={17}/></div><div className="transaction-copy"><strong>{tx.title}</strong><span>{tx.category} · {tx.date}</span></div><strong className={`transaction-amount ${tx.amount > 0 ? "income" : ""}`}>{money(tx.amount)}</strong></div>;
                })}
              </div>
            </div>

            <div className="panel commitments-panel">
              <div className="panel-header"><div><h2>Upcoming commitments</h2><p>Don't let a surprise catch you off guard</p></div><span className="count-badge">3</span></div>
              <div className="commitment-row"><div className="commitment-icon purple-bg"><Music2 size={17}/></div><div className="commitment-copy"><strong>Music subscription</strong><span>Oct 12 · Auto-renewal</span></div><strong>₹119</strong></div>
              <div className="commitment-row"><div className="commitment-icon blue-bg"><WifiIcon/></div><div className="commitment-copy"><strong>Mobile data plan</strong><span>Oct 15 · Essential</span></div><strong>₹299</strong></div>
              <div className="commitment-row"><div className="commitment-icon peach-bg"><HeartPulse size={17}/></div><div className="commitment-copy"><strong>Unexpected buffer</strong><span>Keep this money aside</span></div><strong>₹500</strong></div>
              <button className="commitment-link" onClick={() => setActive("Subscriptions")}>Manage commitments <ArrowRight size={14}/></button>
            </div>
          </section>

          <section className="decision-banner">
            <div className="banner-art"><div className="banner-orb"><SlidersHorizontal size={27}/></div><span className="sparkle s1">✦</span><span className="sparkle s2">✧</span></div>
            <div className="banner-copy"><span className="banner-kicker">YOUR MONEY, YOUR CALL</span><h2>Big purchase? Run the numbers first.</h2><p>Try a decision before you commit. See what changes — balance, daily allowance, savings, and your month-end outlook.</p></div>
            <button className="banner-button" onClick={() => {setSimOpen(true); setSimulated(false);}}>Open Decision Lab <ArrowUpRight size={17}/></button>
          </section>

          <footer className="footer"><span>© 2026 PaisaPilot · Built for your next money move.</span><span><ShieldCheck size={13}/> Your data stays in this demo</span></footer>
        </div>
      </main>

      {simOpen && <div className="modal-backdrop" onMouseDown={e => {if(e.target === e.currentTarget) setSimOpen(false);}}>
        <div className="modal decision-modal">
          <div className="modal-header"><div><span className="modal-eyebrow"><Sparkles size={14}/> DECISION LAB</span><h2>Think it through first.</h2><p>Try the decision on for size before it touches your budget.</p></div><button className="modal-close" onClick={() => setSimOpen(false)} aria-label="Close"><X size={19}/></button></div>
          <div className="decision-form">
            <label>What are you thinking about?</label><input value={simName} onChange={e=>{setSimName(e.target.value);setSimulated(false);}} placeholder="e.g. Concert tickets"/>
            <div className="form-two"><div><label>Estimated cost (₹)</label><input type="number" min="1" value={simAmount} onChange={e=>{setSimAmount(e.target.value);setSimulated(false);}}/></div><div><label>Category</label><select value={simCategory} onChange={e=>{setSimCategory(e.target.value);setSimulated(false);}}><option>Lifestyle</option><option>Food</option><option>Transport</option><option>Subscriptions</option><option>Health</option><option>Other</option></select></div></div>
            <label>How often?</label><div className="segmented">{["One-time","Weekly","Monthly"].map(v=><button key={v} className={simFrequency===v?"selected":""} onClick={()=>{setSimFrequency(v);setSimulated(false);}}>{v}</button>)}</div>
            <button className="primary-button full-button" onClick={()=>setSimulated(true)}><SlidersHorizontal size={17}/> Simulate this decision</button>
          </div>
          {simulated && (() => {
            const amount = Math.max(0, Number(simAmount)||0);
            const multiplier = simFrequency === "Weekly" ? 4 : simFrequency === "Monthly" ? 1 : 1;
            const totalCost = amount * multiplier;
            const afterBalance = balance - totalCost;
            const afterDaily = Math.max(0, afterBalance / Math.max(1,remainingDays));
            const afterForecast = forecast - totalCost;
            const afterGoal = Math.max(0, goal - saved + totalCost);
            const afterRisk = afterBalance < 1500 || afterForecast < 0 ? "High" : afterBalance < 3500 || afterForecast < 1000 ? "Medium" : "Low";
            return <div className="simulation-results">
              <div className={`simulation-verdict ${afterBalance < 1000 || afterForecast < 0 ? "warning" : "okay"}`}><div className="verdict-icon">{afterBalance < 1000 || afterForecast < 0 ? <CircleAlert size={19}/> : <Check size={19}/>}</div><div><strong>{afterBalance < 1000 || afterForecast < 0 ? "This could stretch your budget." : afterRisk === "Medium" ? "Possible, with a little caution." : "Looks manageable — with trade-offs."}</strong><span>{simFrequency === "Weekly" ? "Estimated as 4 payments over the month." : "Here's the estimated impact on your plan."}</span></div></div>
              <div className="impact-grid"><div><span>Balance after</span><strong className={afterBalance < 0 ? "danger-text" : ""}>{fmt(afterBalance)}</strong><small>{fmt(balance-afterBalance)} less available</small></div><div><span>Daily allowance</span><strong>{fmt(afterDaily)}</strong><small>{fmt(daily-afterDaily)} change / day</small></div><div><span>Month-end forecast</span><strong className={afterForecast < 0 ? "danger-text" : ""}>{fmt(afterForecast)}</strong><small>{afterForecast < 0 ? "Projected shortfall" : "Estimated remaining"}</small></div><div><span>Financial risk</span><strong className={afterRisk==="High"?"danger-text":""}>{afterRisk}</strong><small>Based on projected buffer</small></div></div>
              <div className="goal-impact"><div className="goal-impact-head"><span><Target size={15}/> Savings goal impact</span><strong>{fmt(saved)} / {fmt(goal)}</strong></div><div className="goal-progress"><i style={{width:`${goalProgress}%`}}/></div><p>{afterBalance < 0 ? "You may need to reduce spending or adjust the goal to keep your plan realistic." : totalCost > Math.max(0, balance - 1000) ? "This decision leaves a smaller emergency buffer. Consider waiting or choosing a lower-cost option." : "Your savings stay intact if you fund this from available balance — but you will have less flexibility."}</p></div>
              <button className="primary-button full-button" onClick={applyDecision} disabled={amount <= 0 || amount > balance || !simName.trim()}><Check size={17}/> Confirm and update my plan</button>
              <button className="quiet-button full-button" onClick={()=>setSimulated(false)}>Change my decision</button>
            </div>;
          })()}
          <div className="modal-footnote"><ShieldCheck size={13}/> Simulations are estimates, not financial advice.</div>
        </div>
      </div>}

      {showAdd && <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setShowAdd(false);}}><div className="modal add-modal"><div className="modal-header"><div><span className="modal-eyebrow">MONEY MOVEMENT</span><h2>Add a transaction</h2><p>Keep your budget up to date.</p></div><button className="modal-close" onClick={()=>setShowAdd(false)} aria-label="Close"><X size={19}/></button></div><form className="decision-form" onSubmit={addTransaction}><label>Description</label><input autoFocus value={addTitle} onChange={e=>setAddTitle(e.target.value)} placeholder="e.g. Lunch with friends" required/><label>Type</label><div className="segmented"><button type="button" className={addType==="expense"?"selected":""} onClick={()=>setAddType("expense")}>Expense</button><button type="button" className={addType==="income"?"selected":""} onClick={()=>setAddType("income")}>Income</button></div><label>Amount (₹)</label><input type="number" min="1" value={addAmount} onChange={e=>setAddAmount(e.target.value)} required/><button className="primary-button full-button" type="submit"><Plus size={17}/> Save transaction</button></form></div></div>}

      {goalEdit && <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setGoalEdit(false);}}><div className="modal"><div className="modal-header"><div><h2>Edit savings goal</h2><p>Set a goal that works with your budget.</p></div><button className="modal-close" onClick={()=>setGoalEdit(false)}><X size={19}/></button></div><label>Goal amount (₹)</label><input type="number" value={goalDraft} onChange={e=>setGoalDraft(e.target.value)}/><button className="primary-button full-button" onClick={()=>{setGoal(Math.max(saved,Number(goalDraft)||saved));setGoalEdit(false);notify("Savings goal updated.");}}>Save goal</button></div></div>}
      {toast && <div className="toast"><Check size={16}/>{toast}</div>}
    </div>
  );
}

function WifiIcon() {
  return <span className="wifi-symbol">⌁</span>;
}

export default App;