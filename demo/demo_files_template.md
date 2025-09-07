# COPY-PASTE READY FILES

## 1. index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Uplift - Pay-to-Vote Compassion</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f4f4f4; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        h1 { color: #2c3e50; text-align: center; margin-bottom: 30px; }
        .submission { background: white; padding: 20px; border-radius: 8px; margin-bottom: 30px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .response { background: white; margin: 20px 0; padding: 20px; border-radius: 8px; border-left: 4px solid #3498db; }
        .scores { display: flex; gap: 15px; margin: 10px 0; }
        .score { background: #ecf0f1; padding: 5px 10px; border-radius: 4px; font-size: 14px; }
        .vote-btn { background: #27ae60; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin: 10px 5px; }
        .vote-btn:hover { background: #219a52; }
        .earnings { color: #e74c3c; font-weight: bold; }
        .voting-interface { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .vote-slider { margin: 10px 0; }
        .price-display { font-size: 18px; color: #2c3e50; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🤗 Uplift: Compassionate Wisdom Marketplace</h1>
        
        <div class="submission">
            <h2>Current Situation Needing Support:</h2>
            <p id="current-submission"></p>
        </div>
        
        <div id="responses-container"></div>
        
        <div class="voting-interface" id="voting-interface" style="display:none;">
            <h3>Vote on Response (Stake Required)</h3>
            <div class="price-display">Current Vote Price: <span id="vote-price">$2.50</span> ALGO</div>
            <div class="vote-slider">
                <label>Empathy (1-10): <span id="empathy-val">5</span></label>
                <input type="range" id="empathy" min="1" max="10" value="5" oninput="updateScore('empathy')">
            </div>
            <div class="vote-slider">
                <label>Wisdom (1-10): <span id="wisdom-val">5</span></label>
                <input type="range" id="wisdom" min="1" max="10" value="5" oninput="updateScore('wisdom')">
            </div>
            <div class="vote-slider">
                <label>Clarity (1-10): <span id="clarity-val">5</span></label>
                <input type="range" id="clarity" min="1" max="10" value="5" oninput="updateScore('clarity')">
            </div>
            <div class="vote-slider">
                <label>Impact (1-10): <span id="impact-val">5</span></label>
                <input type="range" id="impact" min="1" max="10" value="5" oninput="updateScore('impact')">
            </div>
            <button class="vote-btn" onclick="submitVote()">Submit Vote & Stake ALGO</button>
            <button class="vote-btn" style="background:#95a5a6" onclick="closeVoting()">Cancel</button>
        </div>
        
        <div id="results-container"></div>
    </div>
    
    <script src="demo-data.js"></script>
    <script src="voting.js"></script>
</body>
</html>
```

## 2. demo-data.js
```javascript
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
```

## 3. voting.js
```javascript
function updateScore(category) {
    const value = document.getElementById(category).value;
    document.getElementById(category + '-val').textContent = value;
    
    // Simulate dynamic pricing based on scores
    const scores = ['empathy', 'wisdom', 'clarity', 'impact'].map(cat => 
        parseInt(document.getElementById(cat).value)
    );
    const avgScore = scores.reduce((a, b) => a + b, 0) / 4;
    
    // Higher scores = higher price (people value quality)
    currentVotePrice = 2.00 + (avgScore - 5) * 0.15;
    if (currentVotePrice < 1.50) currentVotePrice = 1.50;
    if (currentVotePrice > 4.50) currentVotePrice = 4.50;
    
    document.getElementById('vote-price').textContent = currentVotePrice.toFixed(2);
}

function displaySubmission() {
    document.getElementById('current-submission').textContent = demoData.submission.text;
}

function displayResponses() {
    const container = document.getElementById('responses-container');
    let html = '<h2>Compassionate Responses (Ranked by Community Votes):</h2>';
    
    demoData.responses.sort((a, b) => b.avgScores.empathy + b.avgScores.wisdom + b.avgScores.clarity + b.avgScores.impact - 
                                    (a.avgScores.empathy + a.avgScores.wisdom + a.avgScores.clarity + a.avgScores.impact));
    
    demoData.responses.forEach((response, index) => {
        const total = response.avgScores.empathy + response.avgScores.wisdom + response.avgScores.clarity + response.avgScores.impact;
        html += `
            <div class="response">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <strong>Rank #${index + 1} - ${response.creator}</strong>
                    <div class="earnings">Earned: ${response.earnings} ALGO</div>
                </div>
                <p>${response.text}</p>
                <div class="scores">
                    <div class="score">❤️ Empathy: ${response.avgScores.empathy}/10</div>
                    <div class="score">🧠 Wisdom: ${response.avgScores.wisdom}/10</div>
                    <div class="score">💬 Clarity: ${response.avgScores.clarity}/10</div>
                    <div class="score">⚡ Impact: ${response.avgScores.impact}/10</div>
                    <div class="score"><strong>Total: ${total.toFixed(1)}/40</strong></div>
                </div>
                <div style="margin-top: 10px; font-size: 14px; color: #666;">
                    ${response.votes} votes • ${response.totalStaked} ALGO staked
                </div>
                <button class="vote-btn" onclick="startVoting(${response.id})">Vote on This Response</button>
            </div>
        `;
    });
    
    html += `
        <div class="voting-stats" style="background: #ecf0f1; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>Voting Statistics:</h3>
            <p><strong>${demoData.votingStats.totalVotes}</strong> total votes from <strong>${demoData.votingStats.participatingVoters}</strong> community members</p>
            <p><strong>${demoData.votingStats.totalStaked} ALGO</strong> total staked (${(demoData.votingStats.totalStaked * 0.6).toFixed(1)} ALGO distributed to creators)</p>
            <p>Average vote price: <strong>$${demoData.votingStats.averageVotePrice}</strong> ALGO</p>
            <p>Time remaining: <strong>${demoData.votingStats.timeRemaining}</strong></p>
        </div>
    `;
    
    container.innerHTML = html;
}

function startVoting(responseId) {
    selectedResponseId = responseId;
    document.getElementById('voting-interface').style.display = 'block';
    
    // Simulate dynamic pricing based on demand
    const response = demoData.responses.find(r => r.id === responseId);
    const demandMultiplier = 1 + (response.votes / 50); // Higher demand = higher price
    currentVotePrice = 2.50 * demandMultiplier;
    
    document.getElementById('vote-price').textContent = currentVotePrice.toFixed(2);
    
    // Scroll to voting interface
    document.getElementById('voting-interface').scrollIntoView({ behavior: 'smooth' });
}

function submitVote() {
    const scores = {
        empathy: parseInt(document.getElementById('empathy').value),
        wisdom: parseInt(document.getElementById('wisdom').value),
        clarity: parseInt(document.getElementById('clarity').value),
        impact: parseInt(document.getElementById('impact').value)
    };
    
    // Simulate vote submission
    const response = demoData.responses.find(r => r.id === selectedResponseId);
    if (response) {
        // Update stats
        response.votes += 1;
        response.totalStaked += currentVotePrice;
        
        // Simulate consensus alignment (80% chance of getting stake back + bonus)
        const consensusAlignment = Math.random() > 0.2;
        const stakeReturn = consensusAlignment ? currentVotePrice * 1.25 : currentVotePrice * 0.75;
        
        // Update earnings
        response.earnings += currentVotePrice * 0.6; // 60% to creator
        
        demoData.votingStats.totalVotes += 1;
        demoData.votingStats.totalStaked += currentVotePrice;
        
        alert(`Vote submitted! 🗳️\n\nStaked: ${currentVotePrice.toFixed(2)} ALGO\nExpected return: ${stakeReturn.toFixed(2)} ALGO (${consensusAlignment ? '+25% consensus bonus' : '-25% outlier penalty'})\n\nCreator will earn: ${(currentVotePrice * 0.6).toFixed(2)} ALGO from your vote!`);
        
        closeVoting();
        displayResponses(); // Refresh to show updated stats
    }
}

function closeVoting() {
    document.getElementById('voting-interface').style.display = 'none';
    selectedResponseId = null;
    
    // Reset sliders
    ['empathy', 'wisdom', 'clarity', 'impact'].forEach(category => {
        document.getElementById(category).value = 5;
        document.getElementById(category + '-val').textContent = '5';
    });
}

// Initialize demo
document.addEventListener('DOMContentLoaded', function() {
    displaySubmission();
    displayResponses();
});
```

**COPY THESE 3 FILES → SAVE AS SHOWN → OPEN index.html → WORKING DEMO!**