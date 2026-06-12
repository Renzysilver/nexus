-- Run this against your production (Postgres) database to seed the 10 starter cards.
-- psql $DATABASE_URL -f prisma/seed-cards.sql

INSERT INTO "Idea" (id, title, description, category, score, insight, "userId", "createdAt") VALUES ('cba7hqiukgt66fwmqglybwq7t', 'AI Prompt Engineering for Non-Technical Founders', 'Stop treating AI like a magic 8-ball. This card teaches you how to systematically extract production-grade outputs from GPT-4, Claude, and Gemini without writing a single line of code. You''ll learn th', 'AI & Automation', NULL, NULL, NULL, NOW());
INSERT INTO "KnowledgeCard" (id, title, summary, "keyInsights", frameworks, "actionSteps", price, category, likes, purchases, published, "authorName", "ideaId", "creatorId", "createdAt") VALUES ('clmjs1kyqm0ewbnncixjr8j4l', 'AI Prompt Engineering for Non-Technical Founders', 'Stop treating AI like a magic 8-ball. This card teaches you how to systematically extract production-grade outputs from GPT-4, Claude, and Gemini without writing a single line of code. You''ll learn the prompting frameworks that senior engineers use to build AI products—translated into plain English with copy-paste templates you can use in your next investor pitch, marketing campaign, or product spec.', '1. **The ''Role-Context-Constraint'' Triad Is the Only Prompt Structure That Matters.** Most founders write vague prompts like ''write me a landing page'' and get generic garbage. The fix is a three-part structure: assign a specific role, provide deep context, and enforce hard constraints. This single structure will 10x your output quality immediately.

2. **Chain-of-Thought Prompting Beats Every ''Prompt Library'' on the Internet.** Instead of asking for the final answer, force the AI to reason step-by-step first. This technique reduces hallucination significantly and produces outputs that actually sound like they came from a human who understands your business.

3. **Temperature and Token Settings Are Your Secret Weapons.** Temperature (0.0 to 2.0) controls creativity vs. determinism: use 0.1 for legal contracts and financial projections, 0.7 for marketing copy, 1.2 for brainstorming.

4. **The ''Few-Shot'' Technique Eliminates the ''Warm-Up'' Problem.** Provide 2-3 examples in the exact format you need rather than just describing the output.

5. **System Prompts Are the Unfair Advantage Nobody Talks About.** Set context once instead of repeating it in every prompt.

6. **Prompt Injection Is a Real Business Risk You Need to Defend Against.** Use delimiter-based input separation and explicit boundary instructions to keep production AI systems secure.', '1. **The RICE Prompt Framework** — Role, Input, Constraint, Execute, Evaluate. Define who the AI should be, provide all relevant data and constraints, ask using action verbs, then have the AI self-critique and iterate.

2. **The Prompt Iteration Loop (PIL)** — Baseline, Diagnose, Prescribe, Test, Compound, Template. A systematic process for turning mediocre AI outputs into exceptional ones in under 5 minutes.', '1. Audit your current prompts — score each 1-10 on specificity and rewrite anything under a 7 using the RICE framework.
2. Build a personal system prompt defining your industry, decision style, and preferences.
3. Create a few-shot library of your best outputs for repeated tasks.
4. Run a temperature experiment across 0.1, 0.5, 0.9, 1.5 and document the best setting per task type.
5. Implement chain-of-thought (''think step by step'') on your next critical task.
6. If customer-facing, add delimiter tags and injection-defense instructions.', 4.99, 'AI & Automation', 0, 0, true, 'vali', 'cba7hqiukgt66fwmqglybwq7t', NULL, NOW());
INSERT INTO "Idea" (id, title, description, category, score, insight, "userId", "createdAt") VALUES ('c4p6j2fxl1nskbv2kdi3veh9e', 'How to Validate Any SaaS Idea in 48 Hours', 'Most founders spend months building products nobody wants. This card gives you a battle-tested system to prove demand, identify your real buyers, and secure your first paying customers before you writ', 'Startup & SaaS', NULL, NULL, NULL, NOW());
INSERT INTO "KnowledgeCard" (id, title, summary, "keyInsights", frameworks, "actionSteps", price, category, likes, purchases, published, "authorName", "ideaId", "creatorId", "createdAt") VALUES ('c483qemgte7k35gu9lropt734', 'How to Validate Any SaaS Idea in 48 Hours', 'Most founders spend months building products nobody wants. This card gives you a battle-tested system to prove demand, identify your real buyers, and secure your first paying customers before you write a single line of code. You''ll learn the exact validation sequence that YC alumni use to de-risk ideas in a weekend—not a quarter.', '1. **The ''Fake Door'' Test Is the Fastest Way to Measure Real Demand.** Build a landing page with a ''Buy Now'' button leading to a ''Coming Soon'' page, run targeted ads, and watch click behavior — it never lies.

2. **Payment Validation Beats Every Other Signal Combined.** A waitlist of 1,000 emails is worth less than 10 people who actually pre-pay.

3. **Your First 10 Customer Interviews Should Focus on ''Jobs-to-be-Done,'' Not Your Idea.** Ask about their current workflow and pain, not your solution.

4. **The ''Competitor Complaint Mining'' Technique Reveals Hidden Opportunities.** Mine 1- and 2-star reviews on G2/Capterra for recurring pain points — that''s your roadmap and your marketing copy.

5. **B2B Validation Requires a Different Playbook Than B2C.** Depth over volume — a handful of decision-maker conversations with real budget intent beats hundreds of survey responses.

6. **The ''Concierge MVP'' Eliminates Technical Risk Entirely.** Manually deliver the outcome before building any software.', '1. **The 48-Hour Validation Sprint** — Problem definition, landing page build, traffic generation, interview blitz, data synthesis, go/no-go decision, all within 48 hours.

2. **The Problem Severity Matrix** — Score frequency, pain intensity, current spend, and willingness to switch to decide whether a problem is worth solving before building anything.', '1. Build a fake-door landing page tonight using a free site builder.
2. Spend a small ad budget this weekend targeting your ICP and track CTR.
3. Book 5 customer discovery calls focused on their current workflow.
4. Mine 50 competitor reviews for recurring complaints.
5. Run a concierge MVP test — manually deliver the outcome for one real customer.
6. Set your kill criteria before you start, and honor it.', 7.99, 'Startup & SaaS', 0, 0, true, 'vali', 'c4p6j2fxl1nskbv2kdi3veh9e', NULL, NOW());
INSERT INTO "Idea" (id, title, description, category, score, insight, "userId", "createdAt") VALUES ('cwtg29nc5b6l79p755yu0umja', 'The Solo Founder''s Guide to First 100 Users', 'Going from zero to one hundred users is the hardest growth phase in a startup''s life—and solo founders don''t have a marketing team to brute-force it. This card gives you the asymmetric tactics, commun', 'Growth & Marketing', NULL, NULL, NULL, NOW());
INSERT INTO "KnowledgeCard" (id, title, summary, "keyInsights", frameworks, "actionSteps", price, category, likes, purchases, published, "authorName", "ideaId", "creatorId", "createdAt") VALUES ('cicicmyqd8q22ufej8jdfk4xy', 'The Solo Founder''s Guide to First 100 Users', 'Going from zero to one hundred users is the hardest growth phase in a startup''s life—and solo founders don''t have a marketing team to brute-force it. This card gives you the asymmetric tactics, community hacks, and distribution strategies that single-person founders have used to bootstrap their first 100 users without a dollar of paid advertising or a single employee.', '1. **Your First 100 Users Will Come from ''Distribution Arbitrage,'' Not Product Excellence.** Find channels where your target users already congregate but bigger players ignore.

2. **The ''Build in Public'' Strategy Only Works If You Follow the Engagement Formula.** 70% educational, 20% behind-the-scenes, 10% direct asks — with specific numbers, not vague excitement.

3. **Cold Outreach Is Not Dead—Your Approach Is.** Hyper-personalized, value-first messages referencing something specific, under 50 words, with a short demo video.

4. **Niche Communities Are 100x More Valuable Than General Ones.** Trust density in small communities beats reach in huge ones.

5. **The ''Powered By'' Footer Strategy Is the Most Underutilized Growth Hack.** Any shareable output should carry your brand.

6. **Referral Loops Must Be Built Into the Product, Not Bolted On Later.** Ask for a referral right after a moment of delight.

7. **The ''Fake It Till You Make It'' Social Proof Play.** Collect detailed testimonials from early users before public launch.', '1. **The Channel-First Product Development Framework** — Audit channels, validate engagement, design product-channel fit, launch in the strongest channel first, then defend it.

2. **The 10-10-10 Outreach System** — 10 minutes morning outreach, 10 minutes midday engagement, 10 minutes evening follow-up, every day.', '1. List 10 distribution channels where your ICP spends time and rank them.
2. Join 5 niche communities and add value silently for two weeks.
3. Record short demo videos and send personalized outreach daily.
4. Add a ''Powered by'' footer or build a free shareable tool.
5. Set up a build-in-public content calendar with specific numbers.
6. Design one referral prompt at the exact moment of user delight.', 9.99, 'Growth & Marketing', 0, 0, true, 'vali', 'cwtg29nc5b6l79p755yu0umja', NULL, NOW());
INSERT INTO "Idea" (id, title, description, category, score, insight, "userId", "createdAt") VALUES ('c2rf6fduxmohxmhix156az8jy', 'Building AI Agents: A Practical Framework', 'AI agents are the next platform shift—but most builders are stuck in ''chatbot thinking.'' This card teaches you how to architect autonomous agents that actually do work: make decisions, use tools, iter', 'AI & Engineering', NULL, NULL, NULL, NOW());
INSERT INTO "KnowledgeCard" (id, title, summary, "keyInsights", frameworks, "actionSteps", price, category, likes, purchases, published, "authorName", "ideaId", "creatorId", "createdAt") VALUES ('czkh6in9q7ib5uigm1fmaws8w', 'Building AI Agents: A Practical Framework', 'AI agents are the next platform shift—but most builders are stuck in ''chatbot thinking.'' This card teaches you how to architect autonomous agents that actually do work: make decisions, use tools, iterate on failures, and operate with minimal human oversight. You''ll get the system design patterns, tool selection criteria, and failure-handling strategies that separate toy demos from production-grade agents.', '1. **The ''ReAct'' Pattern Is the Foundation of Every Production Agent.** Observe, reason explicitly, act, observe, repeat — and log every step for debugging.

2. **Tool Selection Is More Important Than Model Selection.** A strong model with weak tools underperforms a weaker model with excellent, well-described tools.

3. **Memory Architecture Determines Agent Intelligence.** Short-term, working (vector DB), and long-term (SQL) memory each play a distinct role.

4. **The ''Human-in-the-Loop'' Threshold Is a Design Decision, Not an Afterthought.** Define escalation rules for money, scale, and confidence before writing code.

5. **Failure Modes Are Predictable and Must Be Designed For.** Tool hallucination, infinite loops, context overflow, and goal drift each need a specific defense.

6. **Multi-Agent Systems Beat Single Agents for Complex Tasks.** Planner, worker, and validator agents mirror human org structure and cut error rates dramatically.

7. **Cost Management Is an Architectural Concern from Day One.** Route cheap tasks to cheap models, cache aggressively, and track cost-per-task.', '1. **The Agent Architecture Canvas (AAC)** — Goal definition, tool inventory, memory design, reasoning pattern, failure handling, and cost budget, all defined before coding.

2. **The Agent Testing Pyramid** — Unit tests for tools, integration tests for the reasoning loop, and adversarial chaos tests, plus continuous production monitoring.', '1. Fill out the Agent Architecture Canvas for your target agent before writing code.
2. Build a basic ReAct loop with one tool and log every reasoning step.
3. Set up a vector database for working memory and test recall.
4. Define your human escalation matrix and turn it into code checks.
5. Implement token/cost tracking with a daily budget cap.
6. Run an adversarial test suite of 20 deliberately broken inputs.', 12.99, 'AI & Engineering', 0, 0, true, 'vali', 'c2rf6fduxmohxmhix156az8jy', NULL, NOW());
INSERT INTO "Idea" (id, title, description, category, score, insight, "userId", "createdAt") VALUES ('c5btw2b1jn3oxe52vr161yto9', 'Remote Work Productivity System', 'Working from home isn''t the problem—your system is. This card gives you the exact productivity architecture used by top remote operators to produce 2x the output in half the time, without burning out.', 'Productivity', NULL, NULL, NULL, NOW());
INSERT INTO "KnowledgeCard" (id, title, summary, "keyInsights", frameworks, "actionSteps", price, category, likes, purchases, published, "authorName", "ideaId", "creatorId", "createdAt") VALUES ('cdqbwty6vly99cf0tnp6j3az6', 'Remote Work Productivity System', 'Working from home isn''t the problem—your system is. This card gives you the exact productivity architecture used by top remote operators to produce 2x the output in half the time, without burning out. You''ll learn how to design your environment, schedule, and workflows for deep work, not just ''being online.''', '1. **The ''Context Switch Tax'' Is Your Biggest Invisible Productivity Killer.** Batch communication into windows and protect deep work blocks from notifications.

2. **Your Physical Environment Matters More Than Your To-Do App.** A dedicated desk, proper lighting, and a closed door dramatically change focus and stress.

3. **The ''Energy Management'' Approach Beats Time Management.** Track your energy hourly for a week and protect your peak hours for your hardest work.

4. **Async Communication Is a Competitive Advantage, Not a Compromise.** If it can be a document, it shouldn''t be a meeting.

5. **The ''Shutdown Ritual'' Prevents the ''Always On'' Trap.** A short end-of-day ritual signals to your brain that work is complete.

6. **The ''Two-Minute Rule'' Destroys Procrastination at the Source.** Do it now if under two minutes, otherwise capture and schedule it.', '1. **The Deep Work Block System** — Audit your week, define peak-energy blocks, eliminate distractions, set one clear goal per block, work in 90-minute sprints, and review weekly.

2. **The Weekly Review Protocol** — Clear inboxes, review the week, plan the next week''s big rocks, update systems, and close out mentally before the weekend.', '1. Run a 3-day time audit in 30-minute blocks.
2. Block your peak hours in your calendar as non-negotiable deep work.
3. Install a website/app blocker for those blocks.
4. Apply the two-minute rule for a week.
5. Build and practice a shutdown ritual for 14 days.
6. Propose one async replacement for a recurring meeting.', 5.99, 'Productivity', 0, 0, true, 'vali', 'c5btw2b1jn3oxe52vr161yto9', NULL, NOW());
INSERT INTO "Idea" (id, title, description, category, score, insight, "userId", "createdAt") VALUES ('c1tsndyi39zelgsdfu348xcyb', 'Crypto DeFi for Beginners', 'DeFi isn''t just for degens and developers. This card demystifies decentralized finance and gives you a practical, safety-first approach to earning yield, understanding protocols, and protecting your a', 'Crypto & DeFi', NULL, NULL, NULL, NOW());
INSERT INTO "KnowledgeCard" (id, title, summary, "keyInsights", frameworks, "actionSteps", price, category, likes, purchases, published, "authorName", "ideaId", "creatorId", "createdAt") VALUES ('c0jjb6l0haelqa45nv1e4bl8x', 'Crypto DeFi for Beginners', 'DeFi isn''t just for degens and developers. This card demystifies decentralized finance and gives you a practical, safety-first approach to earning yield, understanding protocols, and protecting your assets. You''ll learn how to evaluate risks, avoid scams, and build a DeFi strategy that actually makes money without gambling your savings.', '1. **Not Your Keys, Not Your Crypto Is a Lifestyle, Not a Slogan.** Self-custody via hardware wallets is the core DeFi value proposition — and most hacks are user error, not protocol failure.

2. **APY Numbers Are Often Misleading or Manipulated.** Check whether yield is APR vs APY, where it comes from, and what ''real yield'' looks like after token inflation.

3. **Impermanent Loss Is the Silent Wealth Destroyer in Liquidity Pools.** Only LP correlated pairs unless you''re actively managing concentrated ranges.

4. **Smart Contract Risk Is Real and Often Underestimated.** Audits, bug bounties, TVL, and team transparency all matter — and none guarantee safety.

5. **Gas Fees Can Eat Your Profits on Ethereum—Layer 2s Are the Solution.** Start on a Layer 2 for dramatically lower transaction costs.

6. **DeFi Composability Is a Double-Edged Sword.** Every additional protocol you stack increases risk exponentially — keep strategies simple.', '1. **The DeFi Safety Checklist** — Verify the contract, review audits, check TVL, confirm team transparency, check bug bounties, and scan social channels for red flags before depositing.

2. **The Yield Stacking Framework** — Allocate the majority to blue-chip lending/stable pools, a portion to moderate-risk LP/farming, and only a small speculative slice after months of experience, rebalancing quarterly.', '1. Set up a hardware wallet and store your seed phrase offline.
2. Bridge a small amount to a Layer 2 and try a low-cost swap.
3. Supply a stablecoin to a blue-chip lending protocol as a starting position.
4. Run the DeFi safety checklist on any protocol before depositing.
5. Set up price/liquidation alerts for any leveraged positions.
6. Track your real yield after gas for 30 days.', 6.99, 'Crypto & DeFi', 0, 0, true, 'vali', 'c1tsndyi39zelgsdfu348xcyb', NULL, NOW());
INSERT INTO "Idea" (id, title, description, category, score, insight, "userId", "createdAt") VALUES ('c4pwic3hn74u23yre74jfo416', 'How to Write Emails That Actually Sell', 'Your emails aren''t being ignored because people are busy—they''re being ignored because they''re boring. This card gives you the copywriting frameworks, psychological triggers, and tactical sequences th', 'Sales & Marketing', NULL, NULL, NULL, NOW());
INSERT INTO "KnowledgeCard" (id, title, summary, "keyInsights", frameworks, "actionSteps", price, category, likes, purchases, published, "authorName", "ideaId", "creatorId", "createdAt") VALUES ('cbt33rxn9gbal3jb8ep64uauo', 'How to Write Emails That Actually Sell', 'Your emails aren''t being ignored because people are busy—they''re being ignored because they''re boring. This card gives you the copywriting frameworks, psychological triggers, and tactical sequences that turn cold inboxes into warm leads and warm leads into paying customers. No fluff, no ''best practices'' that don''t work anymore.', '1. **The Subject Line Is 80% of the Battle—And Most People Write It Last.** Specificity beats cleverness; reference real results and personalize where possible.

2. **The First Sentence Has One Job: Make Them Read the Second Sentence.** Reference something specific, state a result they care about, or create cognitive dissonance — in 8-15 words.

3. **The ''One Idea, One Ask'' Rule Prevents Email Overwhelm.** One idea, one low-friction ask per email; a sequence beats one giant pitch.

4. **Social Proof Must Be Specific, Not Vague.** Named company + specific metric + timeframe + problem solved beats ''trusted by thousands.''

5. **The P.S. Line Is the Most Read Part of Your Email.** Use it for your strongest point, not an afterthought.

6. **Follow-Up Sequences Beat Single Emails by an Order of Magnitude.** Most replies come after multiple touches — including the ''breakup'' email.', '1. **The AIDA Email Framework** — Attention, Interest, Desire, Action, structured to move a reader from curiosity to a low-friction next step in under 150 words.

2. **The 5-Email Follow-Up Sequence** — Hook, proof, question, offer, breakup — escalating value over roughly two weeks.', '1. Audit your last 10 sent emails against the AIDA structure and rewrite weak ones.
2. Build a swipe file of subject lines that made you open emails.
3. Write one full 5-email follow-up sequence for a target segment.
4. Add a value-packed P.S. to every email for 30 days.
5. Replace one vague social-proof claim with a specific named result.
6. Set up open-rate tracking on your outreach.', 4.99, 'Sales & Marketing', 0, 0, true, 'vali', 'c4pwic3hn74u23yre74jfo416', NULL, NOW());
INSERT INTO "Idea" (id, title, description, category, score, insight, "userId", "createdAt") VALUES ('cnxdut3dfrl60lwll5ozpvc88', 'The 5AM Founder Morning Routine', 'The most successful founders don''t wake up early because they''re disciplined—they wake up early because they''ve engineered a morning system that makes the rest of their day inevitable. This card gives', 'Productivity', NULL, NULL, NULL, NOW());
INSERT INTO "KnowledgeCard" (id, title, summary, "keyInsights", frameworks, "actionSteps", price, category, likes, purchases, published, "authorName", "ideaId", "creatorId", "createdAt") VALUES ('c7xbr3qugfgvdu71qw9yv37x6', 'The 5AM Founder Morning Routine', 'The most successful founders don''t wake up early because they''re disciplined—they wake up early because they''ve engineered a morning system that makes the rest of their day inevitable. This card gives you the exact routine, habits, and environmental triggers that transform 5am from a punishment into a competitive advantage. No motivational fluff—just the mechanics of a high-performance morning.', '1. **The First 60 Minutes Determines Your Entire Day''s Trajectory.** Your cortisol awakening response gives you a natural window of alertness — protect it from email and news.

2. **Light Is the Primary Zeitgeber—Control It Ruthlessly.** Blackout curtains at night and bright light in the morning reset your circadian rhythm faster than willpower ever could.

3. **The ''Non-Negotiable Three'' Is More Effective Than a 20-Step Routine.** Move, Create, Plan — everything else is optional.

4. **Evening Preparation Is the Secret to Morning Execution.** Decisions made the night before are free; decisions made at 5am cost willpower.

5. **The ''Activation Energy'' Principle Explains Why Most Morning Routines Fail.** Design your environment so the right choice is the easy choice.

6. **The First Two Weeks Are Physical, Not Mental.** Consistency, even on weekends, is what lets your body adjust.', '1. **The 5AM Protocol** — Trigger, hydrate, move, create (deep work), plan, then execute the rest of the day from a position of strength.

2. **The Evening Preparation Ritual** — Hard stop, wind down, prep tomorrow, optimize the sleep environment, place the alarm across the room, lights out.', '1. Get blackout curtains and a sunrise alarm clock.
2. Set a hard-stop alarm three hours before bed and honor it.
3. Charge your phone outside the bedroom.
4. Prep tomorrow''s priorities and workspace every night for a week.
5. Cut caffeine after 2pm for 14 days.
6. Shift your wake time gradually in 30-minute steps rather than jumping straight to 5am.', 3.99, 'Productivity', 0, 0, true, 'vali', 'cnxdut3dfrl60lwll5ozpvc88', NULL, NOW());
INSERT INTO "Idea" (id, title, description, category, score, insight, "userId", "createdAt") VALUES ('ckw2uvarngn6sa2h405agr2oc', 'No-Code MVP in a Weekend', 'You don''t need a CTO to validate your idea. This card gives you the exact no-code stack, build sequence, and launch playbook to ship a working MVP in 48 hours using tools like Webflow, Airtable, Zapie', 'No-Code & Development', NULL, NULL, NULL, NOW());
INSERT INTO "KnowledgeCard" (id, title, summary, "keyInsights", frameworks, "actionSteps", price, category, likes, purchases, published, "authorName", "ideaId", "creatorId", "createdAt") VALUES ('cp9iarl2k7n09d8xkxjgst4jd', 'No-Code MVP in a Weekend', 'You don''t need a CTO to validate your idea. This card gives you the exact no-code stack, build sequence, and launch playbook to ship a working MVP in 48 hours using tools like Webflow, Airtable, Zapier, and Make. You''ll learn how to fake the backend, automate the workflows, and create a product that looks and feels like custom software—without writing a single line of code.', '1. **The ''Faked Backend'' Is the Secret Weapon of No-Code MVPs.** Users care about the experience, not whether your database is a spreadsheet.

2. **Scope Creep Kills Weekend MVPs—Use the ''One-Flow Rule.''** Build exactly one user flow end-to-end, nothing else.

3. **Zapier and Make Can Handle 90% of Your ''Backend Logic'' Without Code.** Triggers, multi-step workflows, and integrations are all achievable without writing code.

4. **Webflow Is the Frontend Gold Standard for No-Code MVPs.** A template plus a connected database can look like real custom development.

5. **Payment Processing Is Simpler Than You Think.** A simple Stripe Payment Link is enough to validate willingness-to-pay.

6. **The ''Wizard of Oz'' Technique Lets You Fake AI and Complex Features.** Manually deliver results behind an automated-feeling interface until you''ve proven demand.', '1. **The Weekend MVP Build Sequence** — Flow definition, data model, frontend build, automation layer, payment setup, polish, content prep, and ship — all within 48 hours.

2. **The No-Code Stack Selector** — A decision tree matching MVP type (marketing site, complex logic, mobile, automation-heavy, e-commerce) to the right no-code stack.', '1. Define your one user flow in detail tonight.
2. Build your database (Airtable/Sheets) with sample data.
3. Build the minimal frontend for that one flow using a template.
4. Connect everything with Zapier or Make and test each automation.
5. Set up a Stripe Payment Link and test a transaction.
6. Launch to 10 people and fix the top 3 issues you observe.', 8.99, 'No-Code & Development', 0, 0, true, 'vali', 'ckw2uvarngn6sa2h405agr2oc', NULL, NOW());
INSERT INTO "Idea" (id, title, description, category, score, insight, "userId", "createdAt") VALUES ('cxm21ha9nfs6u77u4q8wjt2xi', 'Twitter/X Growth Playbook for Creators', 'Twitter isn''t a social network—it''s a distribution engine. This card gives you the content systems, engagement tactics, and growth mechanics that top creators use to build audiences of 10K, 50K, and 1', 'Social Media & Growth', NULL, NULL, NULL, NOW());
INSERT INTO "KnowledgeCard" (id, title, summary, "keyInsights", frameworks, "actionSteps", price, category, likes, purchases, published, "authorName", "ideaId", "creatorId", "createdAt") VALUES ('cg4qjgakczto45b9v9ok6w2s7', 'Twitter/X Growth Playbook for Creators', 'Twitter isn''t a social network—it''s a distribution engine. This card gives you the content systems, engagement tactics, and growth mechanics that top creators use to build audiences of 10K, 50K, and 100K+ followers. You''ll learn how to write threads that get shared, engage without being annoying, and turn followers into customers, not just fans.', '1. **The ''Hook-Story-Payoff'' Structure Is the Only Thread Format That Works.** A curiosity-driven hook, a detailed story with real stakes, and an actionable payoff outperform listicles.

2. **Replying to Big Accounts Is the Fastest Way to Grow—If You Do It Right.** Fast, genuinely valuable replies to large accounts in your niche get you in front of new audiences.

3. **Consistency Beats Virality—The 100-Tweet Rule.** The algorithm needs volume before it understands who to show your content to.

4. **Engagement Pods and ''Like for Like'' Groups Destroy Your Reach.** Artificial engagement gets flagged and suppresses organic reach.

5. **Your Bio and Pinned Tweet Are Your Conversion Funnels.** Both should clearly state who you help and why someone should follow.

6. **The ''Content Pyramid'' Ensures You Never Run Out of Ideas.** Pillar content feeds threads, which feed single tweets and replies.', '1. **The Daily Creator Routine** — Consume, create, engage, analyze daily, and batch pillar content weekly.

2. **The Viral Thread Formula** — Hook, setup, story, lessons, payoff, plus a supporting visual.', '1. Rewrite your bio to clearly state who you help and how.
2. Write and pin your best thread using the Viral Thread Formula.
3. Turn on notifications for 5 niche accounts and reply with value daily.
4. Build a running content-ideas document.
5. Schedule a week of content using the Content Pyramid.
6. Track impressions, engagement rate, and follower growth in a simple sheet.', 6.99, 'Social Media & Growth', 0, 0, true, 'vali', 'cxm21ha9nfs6u77u4q8wjt2xi', NULL, NOW());
