# UPLIFT 1-HOUR DEV SPRINT

## TECH STACK (Simplest Possible)
- **Frontend**: HTML/CSS/JavaScript (no frameworks)
- **Smart Contracts**: TEAL on Algorand Testnet
- **Data**: JSON mock data + localStorage
- **Algorand**: AlgoSDK via CDN

## CONTRACT SPECIFICATION

### Core Contract: UpliftVoting.teal
```teal
#pragma version 8
txn ApplicationID
int 0
==
bnz main_l19
txn OnCompletion
int NoOp
==
bnz main_l3
err
main_l3:
txna ApplicationArgs 0
byte "vote"
==
bnz vote_l5
txna ApplicationArgs 0
byte "get_results"
==
bnz get_results_l6
err
vote_l5:
// Vote function: stake ALGO to vote on response
txn GroupIndex
int 1
-
gtxn PaymentTxn
txn Amount
int 2500000  // 2.5 ALGO minimum vote price
>=
assert
// Store vote in global state
txna ApplicationArgs 1  // response_id
txna ApplicationArgs 2  // empathy_score (1-10)
txna ApplicationArgs 3  // wisdom_score (1-10)  
txna ApplicationArgs 4  // clarity_score (1-10)
txna ApplicationArgs 5  // impact_score (1-10)
// Logic to store vote and calculate running averages
int 1
return
get_results_l6:
// Return voting results for a response
txna ApplicationArgs 1  // response_id
// Return stored voting data
int 1
return
main_l19:
// App creation
int 1
return
```

### Simplified Functions Needed:
1. `submitVote(responseId, scores[4], stakeAmount)`
2. `getResults(responseId)` → returns average scores
3. `calculateRewards(responseId)` → distribute to top responses

## SAMPLE DATA STRUCTURE

### Mock Responses:
```javascript
const sampleData = [
  {
    id: 1,
    submission: "I just lost my job and feel hopeless. What should I do?",
    responses: [
      {
        id: 101,
        creator: "0x123...",
        text: "I understand how devastating job loss feels. Start by taking one small step today - update your LinkedIn, reach out to one contact, or apply to one position. Progress beats perfection.",
        votes: 23,
        totalStaked: 57.5, // ALGO
        avgScores: {empathy: 9.2, wisdom: 8.8, clarity: 9.1, impact: 8.9},
        earnings: 34.5 // 60% of staked amount
      },
      {
        id: 102,
        creator: "0x456...",
        text: "Job loss is an opportunity for reinvention. Use this time to explore new skills, consider career pivots, and remember - this setback is temporary.",
        votes: 18,
        totalStaked: 45.0,
        avgScores: {empathy: 7.8, wisdom: 9.1, clarity: 8.5, impact: 8.7},
        earnings: 27.0
      }
    ]
  }
];
```

## 1-HOUR IMPLEMENTATION PLAN

### Minutes 0-15: Setup
```bash
mkdir uplift-demo
cd uplift-demo
touch index.html voting.js contracts.js demo-data.js
```

### Minutes 15-30: Core HTML/CSS
```html
<!DOCTYPE html>
<html>
<head><title>Uplift Demo</title></head>
<body>
  <div id="app">
    <h1>Uplift: Pay-to-Vote Compassion</h1>
    <div id="submission"></div>
    <div id="responses"></div>
    <div id="voting-interface"></div>
  </div>
  <script src="demo-data.js"></script>
  <script src="voting.js"></script>
</body>
</html>
```

### Minutes 30-45: JavaScript Logic
```javascript
// voting.js - Core demo functionality
function displayResponses(submissionId) {
  const submission = sampleData.find(s => s.id === submissionId);
  // Render responses with vote buttons
  // Show current scores and earnings
}

function simulateVote(responseId, scores) {
  // Mock the voting process
  // Update local data
  // Show dynamic pricing
  // Display stake/reward calculation
}

function showResults() {
  // Display final rankings
  // Show reward distribution
  // Highlight winner
}
```

### Minutes 45-60: Demo Polish
- Add CSS styling
- Wire up click handlers  
- Test full voting flow
- Prepare for presentation

## WHAT YOU GET IN 1 HOUR:
✅ Working demo of core voting flow
✅ Mock smart contract interaction
✅ Sample data showing realistic scenarios
✅ Visual proof of concept for pitch
✅ Foundation for real development later

## START WITH:
1. Create the files above
2. Copy in the sample data
3. Build basic HTML structure
4. I'll help with any specific code you need

**READY TO CODE? Let's go!**