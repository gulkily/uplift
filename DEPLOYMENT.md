# Uplift Deployment Guide

## 🚀 Quick Start Options

### Option 1: Demo Only (Instant)
```bash
# Clone and run demo immediately
git clone https://github.com/gulkily/uplift.git
cd uplift/demo
open index.html  # or double-click the file
```
**Result**: Working demo in browser with simulated data

### Option 2: Local Development Server
```bash
# Simple HTTP server (no build required)
cd uplift/demo
python3 -m http.server 8000
# Visit: http://localhost:8000

# Or with Node.js
npx http-server . -p 8000
# Visit: http://localhost:8000
```
**Result**: Demo served locally with proper CORS headers

### Option 3: Full Testnet Integration
See detailed instructions below for real Algorand testnet deployment.

---

## 🖥️ Local Development Setup

### Prerequisites
```bash
# Install Node.js (for development tools)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python (for simple server)
sudo apt update && sudo apt install python3
```

### Setup Local Environment
```bash
# Clone repository
git clone https://github.com/gulkily/uplift.git
cd uplift

# Create development environment
mkdir -p local-dev
cp demo/* local-dev/
cd local-dev

# Start development server
python3 -m http.server 8080
```

**Access**: http://localhost:8080

### Development Features
- ✅ **Hot Reload**: Changes reflect immediately on refresh
- ✅ **CORS Support**: No browser security issues
- ✅ **Mobile Testing**: Test responsive design on phone
- ✅ **Network Access**: Share demo URL with others on local network

---

## ⚗️ Algorand Testnet Deployment

### Prerequisites
```bash
# Install Algorand developer tools
curl -O -L https://github.com/algorand/go-algorand/releases/download/v3.21.0-stable/algorand_3.21.0-stable_amd64.deb
sudo dpkg -i algorand_3.21.0-stable_amd64.deb

# Install AlgoSDK
npm install -g @algorand/algosdk
npm install -g @algorand/smart-contracts
```

### 1. Setup Testnet Account
```bash
# Create new testnet account
goal account new --datadir ~/node/data

# Fund with testnet ALGO
# Visit: https://dispenser.testnet.algorand.network/
# Enter your account address to receive test ALGO
```

### 2. Deploy Smart Contract
```bash
# Compile TEAL contract
goal clerk compile contracts/UpliftVoting.teal --outdir contracts/

# Deploy to testnet
goal app create \
  --creator YOUR_ACCOUNT_ADDRESS \
  --approval-prog contracts/UpliftVoting.teal.tok \
  --clear-prog contracts/clear.teal \
  --global-byteslices 64 \
  --global-ints 64 \
  --local-byteslices 16 \
  --local-ints 16 \
  --datadir ~/node/data

# Note the Application ID returned
```

### 3. Create Clear Program
```bash
# Create contracts/clear.teal
cat > contracts/clear.teal << 'EOF'
#pragma version 8
int 1
EOF

goal clerk compile contracts/clear.teal --outdir contracts/
```

### 4. Integrate with Frontend
```javascript
// Update demo/voting.js with real contract
const ALGORAND_CONFIG = {
    server: 'https://testnet-api.algonode.cloud',
    port: 443,
    token: '',
    network: 'testnet'
};

const UPLIFT_APP_ID = YOUR_DEPLOYED_APP_ID; // From step 2

// Replace simulated voting with real transactions
async function submitRealVote(responseId, scores, stakeAmount) {
    const algodClient = new algosdk.Algodv2(
        ALGORAND_CONFIG.token,
        ALGORAND_CONFIG.server,
        ALGORAND_CONFIG.port
    );
    
    // Get suggested params
    const suggestedParams = await algodClient.getTransactionParams().do();
    
    // Create payment transaction (stake)
    const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: userAddress,
        to: algosdk.getApplicationAddress(UPLIFT_APP_ID),
        amount: stakeAmount,
        suggestedParams
    });
    
    // Create application call transaction (vote)
    const appCallTxn = algosdk.makeApplicationCallTxnFromObject({
        from: userAddress,
        appIndex: UPLIFT_APP_ID,
        onComplete: algosdk.OnApplicationComplete.NoOpOC,
        appArgs: [
            new Uint8Array(Buffer.from('vote')),
            algosdk.encodeUint64(responseId),
            algosdk.encodeUint64(scores.empathy),
            algosdk.encodeUint64(scores.wisdom),
            algosdk.encodeUint64(scores.clarity),
            algosdk.encodeUint64(scores.impact)
        ],
        suggestedParams
    });
    
    // Group and sign transactions
    const txnGroup = [paymentTxn, appCallTxn];
    algosdk.assignGroupID(txnGroup);
    
    // Sign with wallet (Pera, MyAlgo, etc.)
    const signedTxns = await wallet.signTransaction(txnGroup);
    
    // Submit to network
    const result = await algodClient.sendRawTransaction(signedTxns).do();
    return result.txId;
}
```

### 5. Test Testnet Integration
```bash
# Test contract deployment
goal app read --app-id YOUR_APP_ID --datadir ~/node/data

# Test vote submission
goal app call \
  --app-id YOUR_APP_ID \
  --app-arg "str:vote" \
  --app-arg "int:101" \
  --app-arg "int:9" \
  --app-arg "int:8" \
  --app-arg "int:9" \
  --app-arg "int:8" \
  --from YOUR_ACCOUNT \
  --datadir ~/node/data
```

---

## 🌐 Production Deployment Options

### Option 1: Netlify (Recommended for Demo)
```bash
# Build for production
mkdir production-build
cp -r demo/* production-build/
cd production-build

# Deploy to Netlify
# 1. Push to GitHub
# 2. Connect Netlify to repo
# 3. Set build command: none
# 4. Set publish directory: demo/
# 5. Deploy!

# Result: https://uplift-demo.netlify.app
```

### Option 2: Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from demo directory
cd demo
vercel --prod

# Result: https://uplift-demo.vercel.app
```

### Option 3: GitHub Pages
```bash
# Enable GitHub Pages
# 1. Go to repository Settings
# 2. Scroll to Pages section
# 3. Set source to "main branch /demo folder"
# 4. Save

# Result: https://gulkily.github.io/uplift/
```

### Option 4: AWS S3 + CloudFront
```bash
# Upload to S3 bucket
aws s3 sync demo/ s3://uplift-demo-bucket --acl public-read

# Configure CloudFront distribution
aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json

# Result: https://d123456789.cloudfront.net
```

---

## 🔧 Development Tools & Scripts

### Package.json Setup
```bash
# Create package.json
cat > package.json << 'EOF'
{
  "name": "uplift-demo",
  "version": "1.0.0",
  "description": "Pay-to-vote compassion marketplace",
  "main": "demo/index.html",
  "scripts": {
    "dev": "python3 -m http.server 8080",
    "start": "cd demo && python3 -m http.server 8080",
    "build": "echo 'No build needed for demo'",
    "deploy:netlify": "netlify deploy --prod --dir=demo",
    "deploy:vercel": "cd demo && vercel --prod",
    "test:contracts": "goal clerk compile contracts/UpliftVoting.teal",
    "deploy:testnet": "bash scripts/deploy-testnet.sh"
  },
  "dependencies": {
    "@algorand/algosdk": "^2.7.0"
  },
  "devDependencies": {
    "http-server": "^14.1.1",
    "netlify-cli": "^17.0.0",
    "vercel": "^32.0.0"
  }
}
EOF

npm install
```

### Deployment Scripts
```bash
# Create scripts/deploy-testnet.sh
mkdir -p scripts
cat > scripts/deploy-testnet.sh << 'EOF'
#!/bin/bash

echo "🚀 Deploying Uplift to Algorand Testnet..."

# Compile contracts
echo "📦 Compiling smart contracts..."
goal clerk compile contracts/UpliftVoting.teal --outdir contracts/
goal clerk compile contracts/clear.teal --outdir contracts/

# Deploy main contract
echo "🔗 Deploying to testnet..."
APP_ID=$(goal app create \
  --creator $ALGORAND_ACCOUNT \
  --approval-prog contracts/UpliftVoting.teal.tok \
  --clear-prog contracts/clear.teal.tok \
  --global-byteslices 64 \
  --global-ints 64 \
  --local-byteslices 16 \
  --local-ints 16 \
  --datadir ~/node/data | grep "Created app with app index" | cut -d' ' -f6)

echo "✅ Contract deployed! App ID: $APP_ID"
echo "🔍 View on TestNet: https://testnet.algoexplorer.io/application/$APP_ID"

# Update frontend config
echo "🔧 Updating frontend configuration..."
sed -i "s/const UPLIFT_APP_ID = .*/const UPLIFT_APP_ID = $APP_ID;/" demo/voting.js

echo "🎉 Deployment complete!"
EOF

chmod +x scripts/deploy-testnet.sh
```

---

## 📱 Mobile & Responsive Testing

### Local Mobile Testing
```bash
# Find your local IP
ip addr show | grep "inet " | grep -v 127.0.0.1

# Start server with network access
cd demo
python3 -m http.server 8080 --bind 0.0.0.0

# Access from phone: http://YOUR_LOCAL_IP:8080
```

### Browser Testing
```bash
# Test different browsers
google-chrome http://localhost:8080
firefox http://localhost:8080
```

### Responsive Design Testing
- Open DevTools → Device Toolbar
- Test iPhone, iPad, Android viewports
- Verify touch interactions work
- Check vote sliders on mobile

---

## 🔍 Testing & Validation

### Demo Functionality Tests
```bash
# Test checklist:
# ✅ Page loads without errors
# ✅ Crisis scenario displays correctly
# ✅ All 4 responses show with proper rankings
# ✅ Vote button opens voting interface
# ✅ Sliders adjust vote price dynamically
# ✅ Vote submission shows realistic transaction details
# ✅ Statistics update after voting
# ✅ Gifted credits demo works
# ✅ Mobile responsive design
# ✅ Works across browsers
```

### Smart Contract Tests
```bash
# Validate TEAL compilation
goal clerk compile contracts/UpliftVoting.teal

# Test contract logic
goal clerk dryrun-remote -d ~/node/data \
  --approval-prog contracts/UpliftVoting.teal.tok \
  --app-arg "str:get_price" \
  --app-arg "int:101"
```

### Performance Tests
```bash
# Test page load speed
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:8080

# Test with network throttling in browser DevTools
```

---

## ✅ Pre-Launch Checklist

### Demo Quality
- [ ] All links work correctly
- [ ] Mobile responsive design
- [ ] Cross-browser compatibility
- [ ] Fast loading times (<2 seconds)
- [ ] No JavaScript errors in console
- [ ] Realistic demo data and scenarios

### Smart Contracts
- [ ] TEAL contracts compile without errors
- [ ] Testnet deployment successful
- [ ] Contract functions work as expected
- [ ] Security audit considerations documented
- [ ] Gas optimization implemented

### Documentation
- [ ] README.md comprehensive and accurate
- [ ] Deployment instructions tested
- [ ] API documentation complete
- [ ] Demo instructions clear
- [ ] Technical architecture explained

### Production Ready
- [ ] Domain name secured (optional)
- [ ] SSL certificate configured
- [ ] Analytics tracking setup
- [ ] Error monitoring configured
- [ ] Backup and recovery plan

---

## 🚨 Troubleshooting

### Common Issues

**Demo won't load:**
```bash
# Check for JavaScript errors
# Open browser DevTools → Console tab
# Verify all files present in demo/ directory
ls -la demo/
```

**CORS errors:**
```bash
# Use HTTP server instead of file:// protocol
cd demo && python3 -m http.server 8080
```

**Contract compilation fails:**
```bash
# Check TEAL version
goal --version
# Update if needed: apt update && apt upgrade algorand
```

**Testnet deployment fails:**
```bash
# Check account balance
goal account balance --address YOUR_ACCOUNT --datadir ~/node/data

# Fund account at: https://dispenser.testnet.algorand.network/
```

### Getting Help
- **Algorand Discord**: https://discord.gg/algorand
- **Documentation**: https://developer.algorand.org/
- **GitHub Issues**: https://github.com/gulkily/uplift/issues

---

## 🎯 Next Steps

1. **Immediate**: Test demo locally → `cd demo && python3 -m http.server 8080`
2. **Short-term**: Deploy to Netlify/Vercel for public demo
3. **Medium-term**: Testnet integration with real wallet connectivity
4. **Long-term**: Mainnet deployment with full features

**Your Uplift platform is ready to change the world! 🚀**