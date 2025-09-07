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
    let html = '<div class="card" style="text-align: center; margin-bottom: 40px;"><h2 style="margin-bottom: 16px;">🏆 Compassionate Responses</h2><p style="color: #666; font-size: 1.1rem;">Ranked by community votes</p></div>';
    
    demoData.responses.sort((a, b) => b.avgScores.empathy + b.avgScores.wisdom + b.avgScores.clarity + b.avgScores.impact - 
                                    (a.avgScores.empathy + a.avgScores.wisdom + a.avgScores.clarity + a.avgScores.impact));
    
    demoData.responses.forEach((response, index) => {
        const total = response.avgScores.empathy + response.avgScores.wisdom + response.avgScores.clarity + response.avgScores.impact;
        html += `
            <div class="card response">
                <div class="response-header">
                    <div class="creator">${response.creator}</div>
                    <div class="rank-badge">Rank #${index + 1}</div>
                </div>
                <div class="response-text">${response.text}</div>
                <div class="response-stats">
                    <div class="scores">
                        <div class="score">
                            <div class="score-label">Empathy</div>
                            <div class="score-value">${response.avgScores.empathy}</div>
                        </div>
                        <div class="score">
                            <div class="score-label">Wisdom</div>
                            <div class="score-value">${response.avgScores.wisdom}</div>
                        </div>
                        <div class="score">
                            <div class="score-label">Clarity</div>
                            <div class="score-value">${response.avgScores.clarity}</div>
                        </div>
                        <div class="score">
                            <div class="score-label">Impact</div>
                            <div class="score-value">${response.avgScores.impact}</div>
                        </div>
                    </div>
                    <div class="earnings-section">
                        <div class="earnings-label">Creator Earnings</div>
                        <div class="earnings">${response.earnings} ALGO</div>
                        <div style="margin-top: 12px; font-size: 0.9rem; color: #666;">
                            ${response.votes} votes • ${response.totalStaked} ALGO staked
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 24px;">
                    <button class="vote-btn" onclick="startVoting(${response.id})">🗳️ Vote on This Response</button>
                </div>
            </div>
        `;
    });
    
    html += `
        <div class="card" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; text-align: center;">
            <h3 style="margin-bottom: 24px; color: white;">📊 Live Voting Statistics</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin-bottom: 24px;">
                <div>
                    <div style="font-size: 2rem; font-weight: bold; margin-bottom: 8px;">${demoData.votingStats.totalVotes}</div>
                    <div style="opacity: 0.9;">Total Votes</div>
                </div>
                <div>
                    <div style="font-size: 2rem; font-weight: bold; margin-bottom: 8px;">${demoData.votingStats.totalStaked}</div>
                    <div style="opacity: 0.9;">ALGO Staked</div>
                </div>
                <div>
                    <div style="font-size: 2rem; font-weight: bold; margin-bottom: 8px;">${demoData.votingStats.participatingVoters}</div>
                    <div style="opacity: 0.9;">Participants</div>
                </div>
                <div>
                    <div style="font-size: 2rem; font-weight: bold; margin-bottom: 8px;">${demoData.votingStats.timeRemaining}</div>
                    <div style="opacity: 0.9;">Time Left</div>
                </div>
            </div>
            <div style="background: rgba(255,255,255,0.2); padding: 20px; border-radius: 12px; backdrop-filter: blur(10px);">
                <p style="font-size: 1.1rem; margin-bottom: 16px;"><strong>💡 How the Economics Work</strong></p>
                <p style="line-height: 1.6; opacity: 0.95;">Community members stake $2-5 ALGO to vote. Voters who align with consensus earn bonuses, outliers lose stake. <strong>60% of all revenue goes directly to response creators!</strong></p>
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
        
        // Show transaction simulation with custom modal
        showVoteResultModal(scores, currentVotePrice, stakeReturn, consensusAlignment, response.creator);
        
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
    showGiftCreditsModal();
}

// Initialize demo
document.addEventListener('DOMContentLoaded', function() {
    displaySubmission();
    displayResponses();
    
    // Add TestNet links section
    const container = document.querySelector('.container');
    const testnetSection = document.createElement('div');
    testnetSection.innerHTML = `
        <div class="card" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; text-align: center;">
            <h3 style="margin-bottom: 16px; color: white;">🚀 Try Real TestNet Integration</h3>
            <p style="margin-bottom: 20px; opacity: 0.9; line-height: 1.6;">Experience actual blockchain transactions with test ALGO</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                <a href="testnet.html" style="background: rgba(255,255,255,0.2); color: white; padding: 16px 24px; border-radius: 12px; text-decoration: none; font-weight: 600; border: 2px solid rgba(255,255,255,0.3); display: block;">
                    🔗 TestNet Demo
                </a>
                <a href="https://lora.algokit.io/testnet/account/ESIYMXVC34CGPXQUQBLHXZVJBPRYYN6DOHR42EVFT6Q2HKK4C3KYZQK4N4" target="_blank" style="background: rgba(255,255,255,0.2); color: white; padding: 16px 24px; border-radius: 12px; text-decoration: none; font-weight: 600; border: 2px solid rgba(255,255,255,0.3); display: block;">
                    🔍 View Explorer
                </a>
                <a href="https://lora.algokit.io/testnet/account/ESIYMXVC34CGPXQUQBLHXZVJBPRYYN6DOHR42EVFT6Q2HKK4C3KYZQK4N4/transactions" target="_blank" style="background: rgba(255,255,255,0.2); color: white; padding: 16px 24px; border-radius: 12px; text-decoration: none; font-weight: 600; border: 2px solid rgba(255,255,255,0.3); display: block;">
                    📋 Transactions
                </a>
            </div>
        </div>
    `;
    container.appendChild(testnetSection);
    
    // Add gift credits demo button
    const giftButton = document.createElement('div');
    giftButton.innerHTML = `
        <div class="card" style="text-align: center; background: linear-gradient(135deg, #e74c3c, #c0392b); color: white;">
            <h3 style="margin-bottom: 16px; color: white;">🎁 Experience Viral Growth</h3>
            <p style="margin-bottom: 20px; opacity: 0.9; line-height: 1.6;">See how compassion spreads through personal networks</p>
            <button class="vote-btn" onclick="simulateGiftCredits()" style="background: rgba(255,255,255,0.2); color: white; border: 2px solid white;">
                Try Gifted Credits Demo
            </button>
        </div>
    `;
    container.appendChild(giftButton);
    
    // Add demo instructions
    const instructions = document.createElement('div');
    instructions.innerHTML = `
        <div class="card" style="background: linear-gradient(135deg, #2c3e50, #34495e); color: white;">
            <h3 style="margin-bottom: 20px; color: white;">🎮 How to Use This Demo</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                <div style="background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px;">
                    <div style="font-weight: 600; margin-bottom: 8px;">1. 📖 Read the Crisis</div>
                    <div style="opacity: 0.9; font-size: 0.95rem;">Someone lost their job and needs compassionate support</div>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px;">
                    <div style="font-weight: 600; margin-bottom: 8px;">2. 🏆 Review Responses</div>
                    <div style="opacity: 0.9; font-size: 0.95rem;">See 4 different responses ranked by community votes</div>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px;">
                    <div style="font-weight: 600; margin-bottom: 8px;">3. 🗳️ Cast Your Vote</div>
                    <div style="opacity: 0.9; font-size: 0.95rem;">Experience the pay-to-vote system with real dynamics</div>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px;">
                    <div style="font-weight: 600; margin-bottom: 8px;">4. 📊 Rate Quality</div>
                    <div style="opacity: 0.9; font-size: 0.95rem;">Use sliders to score Empathy, Wisdom, Clarity, Impact</div>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px;">
                    <div style="font-weight: 600; margin-bottom: 8px;">5. 💰 Watch Economics</div>
                    <div style="opacity: 0.9; font-size: 0.95rem;">See how vote pricing changes with your scores</div>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px;">
                    <div style="font-weight: 600; margin-bottom: 8px;">6. 🎁 Try Gifting</div>
                    <div style="opacity: 0.9; font-size: 0.95rem;">Explore viral growth through gifted credits</div>
                </div>
            </div>
            <div style="margin-top: 24px; padding: 16px; background: rgba(255,255,255,0.1); border-radius: 8px; text-align: center;">
                <p style="font-style: italic; opacity: 0.95;">💡 This demo simulates the complete Uplift experience with realistic economics</p>
            </div>
        </div>
    `;
    container.appendChild(instructions);
});

// Modal Functions
function showModal(title, subtitle, content, actions) {
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalContent = document.getElementById('modal-content');
    const modalActions = document.getElementById('modal-actions');
    
    modalTitle.textContent = title;
    modalSubtitle.textContent = subtitle || '';
    modalContent.innerHTML = content;
    modalActions.innerHTML = actions || '<button class="modal-button" onclick="closeModal()">OK</button>';
    
    overlay.classList.add('show');
    
    // Close modal when clicking overlay
    overlay.onclick = function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    };
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('show');
}

function showVoteResultModal(scores, stakeAmount, returnAmount, consensusAlignment, creatorName) {
    const title = '✅ Vote Submitted Successfully!';
    const subtitle = 'Your vote has been recorded on the blockchain';
    
    const content = `
        <div class="modal-section">
            <div class="modal-section-title">📊 Your Vote Scores</div>
            <div class="modal-stats">
                <div class="modal-stat">
                    <div class="modal-stat-label">Empathy</div>
                    <div class="modal-stat-value">${scores.empathy}/10</div>
                </div>
                <div class="modal-stat">
                    <div class="modal-stat-label">Wisdom</div>
                    <div class="modal-stat-value">${scores.wisdom}/10</div>
                </div>
                <div class="modal-stat">
                    <div class="modal-stat-label">Clarity</div>
                    <div class="modal-stat-value">${scores.clarity}/10</div>
                </div>
                <div class="modal-stat">
                    <div class="modal-stat-label">Impact</div>
                    <div class="modal-stat-value">${scores.impact}/10</div>
                </div>
            </div>
        </div>
        
        <div class="modal-section">
            <div class="modal-section-title">💰 Financial Summary</div>
            <div class="modal-section-content">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>Amount Staked:</span>
                    <span style="font-weight: 600;">${stakeAmount.toFixed(2)} ALGO</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>Expected Return:</span>
                    <span style="font-weight: 600;">${returnAmount.toFixed(2)} ALGO</span>
                </div>
                ${consensusAlignment ? 
                    '<div class="modal-highlight"><div class="modal-highlight-text">🎉 +25% consensus bonus earned!</div></div>' : 
                    '<div class="modal-highlight"><div class="modal-highlight-text">⚠️ -25% outlier penalty applied</div></div>'
                }
            </div>
        </div>
        
        <div class="modal-section">
            <div class="modal-section-title">🎁 Creator Impact</div>
            <div class="modal-section-content">
                ${creatorName} will earn <strong>${(stakeAmount * 0.6).toFixed(2)} ALGO</strong> from your vote!
            </div>
        </div>
        
        <div class="modal-highlight">
            <div class="modal-highlight-text">
                🔗 <strong>Transaction Hash:</strong><br>
                <code style="font-size: 13px; color: #8e8e93;">0x4a7b...c9f2</code><br>
                <small>(Simulated - would show real tx hash in production)</small>
            </div>
        </div>
    `;
    
    showModal(title, subtitle, content);
}

function showGiftCreditsModal() {
    const title = '🎁 Gifted Credits Demo';
    const subtitle = 'Experience viral growth through compassion';
    
    const content = `
        <div class="modal-section">
            <div class="modal-section-title">💭 Scenario</div>
            <div class="modal-section-content">
                Your friend Sarah is going through a divorce and needs support.
            </div>
        </div>
        
        <div class="modal-highlight">
            <div class="modal-highlight-text">
                "Hey Sarah, I found this platform where people compete to give the most compassionate advice. Here's $15 of voting credits to help you get some wisdom during this tough time. ❤️"
            </div>
        </div>
        
        <div class="modal-section">
            <div class="modal-section-title">📈 Impact Chain</div>
            <div class="modal-stats">
                <div class="modal-stat">
                    <div class="modal-stat-label">Credits Gifted</div>
                    <div class="modal-stat-value">15 ALGO</div>
                </div>
                <div class="modal-stat">
                    <div class="modal-stat-label">Your Bonus</div>
                    <div class="modal-stat-value">3 ALGO</div>
                </div>
            </div>
            <div class="modal-section-content" style="margin-top: 12px;">
                <strong>Viral Growth:</strong> Sarah discovers quality support and invites her sister, creating a compassion network.
            </div>
        </div>
        
        <div class="modal-highlight">
            <div class="modal-highlight-text">
                🌟 This is how Uplift spreads compassion through personal networks!
            </div>
        </div>
    `;
    
    showModal(title, subtitle, content);
}