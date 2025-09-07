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
            creator: "Sarah M. (Career Coach)",
            text: "I can feel the weight of your fear and uncertainty, and I want you to know that what you're experiencing is completely valid. Losing a job, especially after 8 years, isn't just about losing income—it's about losing identity and security. First, breathe. You are not a failure; you're someone dealing with an incredibly difficult situation. Here's what I suggest: 1) Apply for unemployment benefits TODAY if you haven't already. 2) Make a list of your accomplishments from those 8 years—you have valuable skills. 3) Reach out to former colleagues; many jobs come through networks. 4) Consider this a chance to reassess what you actually want in your career. You've got this, one day at a time.",
            votes: 47,
            totalStaked: 127.3,
            avgScores: { empathy: 9.4, wisdom: 9.1, clarity: 8.9, impact: 9.2 },
            earnings: 76.4,
            rank: 1
        },
        {
            id: 102,
            creator: "Mike R. (Former Executive)",
            text: "Been exactly where you are. Lost my job at 36 with three kids. Felt like the world ended. Here's what worked: 1) Cut expenses immediately - call creditors, they often work with you. 2) Update LinkedIn and resume SAME DAY. 3) Apply to unemployment. 4) Network like your life depends on it because it does. 5) Consider contract/temp work to bridge income. The shame you feel? It's lying to you. You're a provider who hit a rough patch, not a failure. I'm now doing better than ever. This is temporary.",
            votes: 52,
            totalStaked: 118.6,
            avgScores: { empathy: 8.9, wisdom: 9.3, clarity: 9.1, impact: 8.8 },
            earnings: 71.2,
            rank: 2
        },
        {
            id: 103,
            creator: "Dr. Jennifer L. (Therapist)",
            text: "What you're experiencing - the fear, the sense of failure, the overwhelm - these are normal grief responses to a major life change. Your nervous system is in survival mode right now. While practical steps matter, your mental health comes first. Practice this: When panic hits, name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste. This grounds you in the present. Remember: You successfully held a job for 8 years during a time when many couldn't. That's not failure - that's resilience. You will find work again.",
            votes: 38,
            totalStaked: 89.2,
            avgScores: { empathy: 9.6, wisdom: 8.4, clarity: 8.6, impact: 8.9 },
            earnings: 53.5,
            rank: 3
        },
        {
            id: 104,
            creator: "Anonymous",
            text: "Everything happens for a reason. Maybe this is the universe telling you to pursue your dreams! Use this time to start that business you always wanted or learn new skills. Stay positive!",
            votes: 12,
            totalStaked: 31.5,
            avgScores: { empathy: 6.2, wisdom: 5.8, clarity: 7.1, impact: 6.4 },
            earnings: 18.9,
            rank: 4
        }
    ],
    votingStats: {
        totalVotes: 149,
        totalStaked: 366.6,
        averageVotePrice: 2.46,
        timeRemaining: "23 hours",
        participatingVoters: 89
    }
};

// Simulate dynamic pricing
let currentVotePrice = 2.50;
let selectedResponseId = null;