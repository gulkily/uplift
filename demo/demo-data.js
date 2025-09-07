const demoData = {
    submission: {
        id: 1,
        text: "I just lost my job after 8 years at my company. I'm 34 with two kids and feel completely lost. The bills are piling up and I don't even know where to start looking for work. I'm scared and feel like such a failure. What should I do?",
        category: "Career Crisis",
        timestamp: Date.now() - 3600000 // 1 hour ago
    },
    responses: [
        {
            id: 101,
            creator: "Maria Santos (HR Director & Mom)",
            text: "My heart goes out to you - I see the courage it took to reach out when you're feeling so vulnerable. After 8 years of dedication, losing your job doesn't define your worth; it reveals your strength in seeking help. As someone who's hired hundreds of people, let me share what I know: Your 8-year tenure shows loyalty and reliability - qualities employers treasure. Tonight, hold your children close and remember you're modeling resilience. Tomorrow, file for unemployment (no shame in using what you've paid into), then write down every project you're proud of from those 8 years. Your skills haven't disappeared; they're ready for their next chapter. You're not starting over - you're building forward.",
            votes: 52,
            totalStaked: 142.8,
            avgScores: { empathy: 9.8, wisdom: 9.4, clarity: 9.2, impact: 9.6 },
            earnings: 85.7,
            rank: 1
        },
        {
            id: 102,
            creator: "David Kim (Father of 3, Tech Leader)",
            text: "Brother, I've stood exactly where you're standing. Five years ago, I was laid off from my dream job with a newborn and two toddlers. The fear was suffocating. But here's what I learned: this moment, as terrifying as it feels, can become the foundation of something beautiful. Start with breath work - 4 counts in, hold for 4, out for 4. It saved my sanity. Then, practical magic: reach out to EVERYONE you know. I found my current role (which I love more than my old one) through a college friend I hadn't spoken to in years. Your children are watching you navigate this storm - show them that setbacks don't sink ships; they teach us to sail stronger.",
            votes: 48,
            totalStaked: 135.4,
            avgScores: { empathy: 9.6, wisdom: 9.2, clarity: 9.1, impact: 9.3 },
            earnings: 81.2,
            rank: 2
        },
        {
            id: 103,
            creator: "Dr. Rachel Chen (Career Counselor & Therapist)",
            text: "What you're feeling isn't weakness - it's your human heart responding to profound change. Job loss ranks among life's most stressful events, right alongside divorce and moving. Your grief is valid, your fear is understandable, and your love for your children shines through every word. Here's gentle wisdom from 15 years of helping people through transitions: This ending is also a beginning. While you search, create micro-moments of hope - read to your kids, take a walk, call someone who believes in you. Your worth isn't your paycheck. Your children need their parent whole more than they need everything perfect. You have gifts this world needs; we just need to help you remember what they are.",
            votes: 44,
            totalStaked: 118.9,
            avgScores: { empathy: 9.9, wisdom: 8.8, clarity: 8.9, impact: 9.1 },
            earnings: 71.3,
            rank: 3
        },
        {
            id: 104,
            creator: "James Rivera (Single Dad, Entrepreneur)",
            text: "My friend, I want to wrap you in the biggest hug right now. When I lost my job as a single dad, a wise woman told me: 'You're not broken, you're between stories.' Your next chapter is being written, and while it feels scary, it might just be your best one yet. Here's what helped me survive and eventually thrive: Join parent groups on Facebook - other parents share job leads constantly. Visit your local library - free WiFi, quiet job search space, and librarians who know about resources you've never heard of. Most importantly, tell your kids age-appropriate truth: 'Daddy's looking for a new job where he can help people even better.' Kids handle honesty better than they handle sensing your hidden stress. You've got this, warrior.",
            votes: 41,
            totalStaked: 108.7,
            avgScores: { empathy: 9.5, wisdom: 8.9, clarity: 9.0, impact: 8.8 },
            earnings: 65.2,
            rank: 4
        }
    ],
    votingStats: {
        totalVotes: 185,
        totalStaked: 505.8,
        averageVotePrice: 2.73,
        timeRemaining: "22 hours",
        participatingVoters: 127
    }
};

// Simulate dynamic pricing
let currentVotePrice = 2.50;
let selectedResponseId = null;