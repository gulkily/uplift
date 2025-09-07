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
            <h3>🗳️ Voting Statistics:</h3>
            <p><strong>${demoData.votingStats.totalVotes}</strong> total votes from <strong>${demoData.votingStats.participatingVoters}</strong> community members</p>
            <p><strong>${demoData.votingStats.totalStaked} ALGO</strong> total staked (${(demoData.votingStats.totalStaked * 0.6).toFixed(1)} ALGO distributed to creators)</p>
            <p>Average vote price: <strong>$${demoData.votingStats.averageVotePrice}</strong> ALGO</p>
            <p>Time remaining: <strong>${demoData.votingStats.timeRemaining}</strong></p>
            <div style="margin-top: 15px; padding: 10px; background: #3498db; color: white; border-radius: 4px;">
                <strong>💡 How It Works:</strong> Community members pay $2-5 ALGO to vote on responses. Voters who align with consensus earn bonuses, outliers lose stake. 60% of all vote revenue goes directly to response creators!
            </div>
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
        demoData.votingStats.participatingVoters += 1;
        
        // Show transaction simulation
        alert(`✅ Vote Submitted Successfully!\n\n📊 Your Vote:\nEmpathy: ${scores.empathy}/10\nWisdom: ${scores.wisdom}/10\nClarity: ${scores.clarity}/10\nImpact: ${scores.impact}/10\n\n💰 Financial Details:\nStaked: ${currentVotePrice.toFixed(2)} ALGO\nExpected return: ${stakeReturn.toFixed(2)} ALGO\n${consensusAlignment ? '🎉 +25% consensus bonus!' : '⚠️ -25% outlier penalty'}\n\n🎁 Creator Impact:\n${response.creator} will earn ${(currentVotePrice * 0.6).toFixed(2)} ALGO from your vote!\n\n🔗 Transaction: View on Algorand Explorer\n(Simulated - would show real tx hash in production)`);
        
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
    currentVotePrice = 2.50;
    document.getElementById('vote-price').textContent = '2.50';
}

function simulateGiftCredits() {
    alert(`🎁 Gifted Credits Demo\n\nScenario: Your friend Sarah is going through a divorce\n\nYou send: "Hey Sarah, I found this platform where people compete to give the most compassionate advice. Here's $15 of voting credits to help you get some wisdom during this tough time. ❤️"\n\n💸 Credits Gifted: 15 ALGO worth of voting credits\n🔄 Referral Bonus: You'll earn 20% back (3 ALGO) when Sarah votes\n📈 Viral Growth: Sarah discovers quality support and invites her sister\n\n🌟 This is how Uplift spreads compassion through personal networks!`);
}

// Initialize demo
document.addEventListener('DOMContentLoaded', function() {
    displaySubmission();
    displayResponses();
    
    // Add gift credits demo button
    const container = document.querySelector('.container');
    const giftButton = document.createElement('div');
    giftButton.innerHTML = `
        <div style="text-align: center; margin: 30px 0;">
            <button class="vote-btn" onclick="simulateGiftCredits()" style="background: #e74c3c; font-size: 16px; padding: 15px 30px;">
                🎁 Try Gifted Credits Demo
            </button>
            <p style="margin-top: 10px; color: #666;">See how compassion spreads through personal networks</p>
        </div>
    `;
    container.appendChild(giftButton);
    
    // Add demo instructions
    const instructions = document.createElement('div');
    instructions.innerHTML = `
        <div style="background: #2c3e50; color: white; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h3>🎮 Demo Instructions</h3>
            <ol style="margin-left: 20px; margin-top: 10px;">
                <li><strong>Read the Crisis:</strong> Someone lost their job and needs support</li>
                <li><strong>Review Responses:</strong> See 4 different compassionate responses ranked by community</li>
                <li><strong>Vote:</strong> Click "Vote on This Response" to experience the pay-to-vote system</li>
                <li><strong>Adjust Scores:</strong> Use sliders to rate Empathy, Wisdom, Clarity, Impact</li>
                <li><strong>Watch Pricing:</strong> Notice how vote price changes based on your scores</li>
                <li><strong>Submit Vote:</strong> See stake/reward simulation and creator earnings</li>
                <li><strong>Try Gifting:</strong> Click the gift button to see viral growth mechanics</li>
            </ol>
            <p style="margin-top: 15px; font-style: italic;">💡 This demo simulates the full Uplift experience using realistic data and economic mechanics.</p>
        </div>
    `;
    container.appendChild(instructions);
});