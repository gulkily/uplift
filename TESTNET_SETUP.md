# 🚀 Uplift TestNet Setup Guide

## Quick Start

Your Uplift TestNet integration is ready! Here's everything you need:

### 🏦 TestNet Address
```
WB62SP4LFUKZSMJD7G3ENTCHEZVEKW3FYAJ64HV2IU6W52ZQRDSOR3JOQY
```

## 💰 Getting TestNet Funding

### Option 1: Algorand TestNet Dispenser
1. Visit: https://testnet.algoexplorer.io/dispenser
2. Enter the address above
3. Click "Dispense" to get free TestNet ALGO tokens

### Option 2: Alternative Sources
- https://developer.algorand.org/docs/get-details/testnet/
- Algorand Discord community (ask for testnet funding)

## 🔗 Access Your Demo

### Live TestNet Demo
```bash
# Navigate to project directory
cd /home/wsl/uplift

# Start local server
python3 -m http.server 8080

# Open in browser:
# http://localhost:8080/testnet.html
```

### Features Available:
- ✅ Real Algorand TestNet connection
- ✅ Smart contract deployment simulation
- ✅ Actual voting transactions
- ✅ Dynamic pricing based on quality scores
- ✅ Live balance checking
- ✅ Transaction logging
- ✅ Results retrieval from contract

## 🔧 Contract Deployment

### Automated Deployment
```bash
# Make sure you have ALGO in the test account first!
export ALGORAND_ACCOUNT=WB62SP4LFUKZSMJD7G3ENTCHEZVEKW3FYAJ64HV2IU6W52ZQRDSOR3JOQY
bash scripts/deploy-testnet.sh
```

### Manual Integration
The `testnet.html` page includes:
- Real Algorand SDK integration
- TestNet API connections
- Smart contract interaction simulation
- Wallet connection (supports Pera Wallet, MyAlgo)

## 📊 Monitor Your TestNet Activity

### Account Explorer
```
https://testnet.algoexplorer.io/address/WB62SP4LFUKZSMJD7G3ENTCHEZVEKW3FYAJ64HV2IU6W52ZQRDSOR3JOQY
```

### Once Contract is Deployed
- Application will have its own App ID
- Contract address for receiving votes
- All transactions visible on explorer

## 🎮 Demo Workflow

1. **Open TestNet Demo**: `http://localhost:8080/testnet.html`
2. **Fund Account**: Get free ALGO from dispenser  
3. **Connect Wallet**: Use the generated test account
4. **Deploy Contract**: Click "Deploy Contract" button
5. **Submit Votes**: Test the pay-to-vote system
6. **View Results**: See real contract state updates
7. **Monitor Transactions**: Watch on AlgoExplorer

## 🔐 Security Notes

- **TestNet Only**: This account is for testing only
- **No Real Value**: TestNet ALGO has no monetary value
- **Keep Mnemonic Safe**: Store the recovery phrase securely
- **Never Use on MainNet**: Don't use these keys on production

## 📱 Wallet Integration

The demo supports:
- Pera Wallet (recommended)
- MyAlgo Wallet
- Test account simulation (fallback)

## 🚀 Production Deployment

When ready for MainNet:
1. Generate new MainNet addresses
2. Update network configuration
3. Deploy to MainNet (requires real ALGO)
4. Update frontend to use MainNet endpoints

## 🎯 Key Integration Points

```javascript
// TestNet Configuration
const TESTNET_CONFIG = {
  server: 'https://testnet-api.algonode.cloud',
  port: 443,
  token: '',
  account: 'WB62SP4LFUKZSMJD7G3ENTCHEZVEKW3FYAJ64HV2IU6W52ZQRDSOR3JOQY'
};
```

## 📞 Support

- **Issues**: Check transaction logs in the demo
- **Funding Problems**: Try multiple dispenser sources
- **Technical Issues**: Review browser console for errors

---

**🎉 Your TestNet integration is complete and ready for testing!**