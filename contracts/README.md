# Uplift Smart Contracts

## Overview
Smart contracts for the Uplift pay-to-vote compassion marketplace built on Algorand blockchain.

## Contracts

### UpliftVoting.teal
Main voting contract handling:
- **Dynamic Pricing**: Vote costs adjust based on demand and quality signals
- **Stake Management**: Voters stake ALGO tokens with votes
- **Consensus Calculation**: Real-time averaging of community scores  
- **Reward Distribution**: 60% of vote revenue to response creators
- **Gaming Prevention**: Economic barriers prevent manipulation

#### Key Functions:
- `vote(response_id, empathy, wisdom, clarity, impact)` - Submit paid vote with stake
- `get_results(response_id)` - Get current averaged scores
- `calculate_rewards(response_id)` - Distribute earnings to creators
- `get_price(response_id)` - Get current dynamic vote price

#### State Storage:
- `vote_count_{response_id}` - Total votes for each response
- `{dimension}_total_{response_id}` - Sum of scores for averaging
- `total_staked_{response_id}` - Total ALGO staked on response
- `creator_{response_id}` - Response creator address
- `voter_{response_id}_{address}` - Track individual votes

### UpliftCredits.teal (Coming Soon)
Credit management contract for:
- Credit gifting with personal messages
- Referral tracking and bonus distribution
- Stable USD value despite ALGO volatility
- Viral growth mechanics

### UpliftCore.teal (Coming Soon)  
Core platform contract managing:
- Problem submissions
- Response submissions
- Creator reputation scores
- Platform fee collection

## Deployment

### Testnet Deployment
```bash
# Compile contract
goal clerk compile UpliftVoting.teal

# Create application
goal app create --creator $CREATOR --approval-prog UpliftVoting.teal --clear-prog clear.teal --global-byteslices 64 --global-ints 64 --local-byteslices 16 --local-ints 16

# Note the application ID for frontend integration
```

### Production Considerations
- **Formal Verification**: All contracts require formal verification before mainnet
- **Audit**: Third-party security audit recommended
- **Upgrade Path**: Implement upgrade mechanisms for contract improvements
- **Emergency Controls**: Circuit breakers for security incidents

## Integration

### Frontend Integration
```javascript
import algosdk from 'algosdk';

// Submit vote with payment
const voteTransaction = algosdk.makeApplicationCallTxnFromObject({
    from: voterAddress,
    appIndex: UPLIFT_APP_ID,
    onComplete: algosdk.OnApplicationComplete.NoOpOC,
    appArgs: [
        new Uint8Array(Buffer.from('vote')),
        algosdk.encodeUint64(responseId),
        algosdk.encodeUint64(empathyScore),
        algosdk.encodeUint64(wisdomScore), 
        algosdk.encodeUint64(clarityScore),
        algosdk.encodeUint64(impactScore)
    ]
});

const paymentTransaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: voterAddress,
    to: algosdk.getApplicationAddress(UPLIFT_APP_ID),
    amount: votePrice,
    suggestedParams
});

// Group transactions
const groupedTxns = [paymentTransaction, voteTransaction];
algosdk.assignGroupID(groupedTxns);
```

### API Integration
```python
# Python SDK example
from algosdk import algod_client, transaction

# Get current vote price
app_args = [b'get_price', response_id.to_bytes(8, 'big')]
txn = transaction.ApplicationCallTxn(
    sender=sender_address,
    sp=suggested_params,
    index=UPLIFT_APP_ID,
    on_complete=transaction.OnComplete.NoOpOC,
    app_args=app_args
)
```

## Testing

### Unit Tests
```bash
# Test dynamic pricing
npm run test:pricing

# Test vote storage
npm run test:voting  

# Test reward distribution
npm run test:rewards

# Test consensus calculation
npm run test:consensus
```

### Integration Tests
```bash
# Full voting flow
npm run test:integration

# Multi-voter consensus
npm run test:consensus-flow

# Reward distribution accuracy
npm run test:rewards-flow
```

## Security Considerations

### Economic Security
- **Minimum Stakes**: Prevent spam with meaningful vote costs
- **Maximum Stakes**: Prevent whale domination with stake caps
- **Price Bounds**: Dynamic pricing within reasonable ranges (1.5-4.5 ALGO)
- **Consensus Thresholds**: Require meaningful vote counts for reward distribution

### Technical Security  
- **Input Validation**: All scores must be 1-10 range
- **Overflow Protection**: Safe arithmetic operations
- **Access Controls**: Only authorized operations allowed
- **State Consistency**: Atomic updates to prevent race conditions

### Gaming Prevention
- **Economic Inefficiency**: Gaming costs more than rewards
- **Statistical Outliers**: Consensus alignment rewards/penalties
- **Transparent Operations**: All votes and rewards publicly auditable
- **Rate Limiting**: Prevent rapid-fire gaming attempts

## Roadmap

### Phase 1: Core Voting (Current)
- [x] Dynamic pricing implementation
- [x] Basic vote storage and retrieval
- [x] Reward calculation logic
- [ ] Testnet deployment and testing

### Phase 2: Advanced Features  
- [ ] Consensus-based stake returns
- [ ] Credit system integration
- [ ] Reputation scoring
- [ ] Multi-signature reward distribution

### Phase 3: Scaling & Optimization
- [ ] Gas optimization
- [ ] Batch operations
- [ ] Layer 2 integration if needed
- [ ] Cross-chain compatibility

---

*Smart contracts are the foundation of Uplift's economic self-regulation and transparent reward distribution*