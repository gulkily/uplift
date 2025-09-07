#!/bin/bash

echo "🚀 Deploying Uplift to Algorand Testnet..."

# Check prerequisites
if ! command -v goal &> /dev/null; then
    echo "❌ Algorand goal CLI not found. Please install Algorand node."
    echo "Visit: https://developer.algorand.org/docs/run-a-node/setup/install/"
    exit 1
fi

if [ -z "$ALGORAND_ACCOUNT" ]; then
    echo "⚠️  Please set ALGORAND_ACCOUNT environment variable:"
    echo "export ALGORAND_ACCOUNT=YOUR_TESTNET_ACCOUNT_ADDRESS"
    echo ""
    echo "Create account with: goal account new --datadir ~/node/data"
    echo "Fund at: https://dispenser.testnet.algorand.network/"
    exit 1
fi

# Check account balance
echo "💰 Checking account balance..."
BALANCE=$(goal account balance --address $ALGORAND_ACCOUNT --datadir ~/node/data | grep -oP 'Balance: \K\d+')
if [ "$BALANCE" -lt 1000000 ]; then
    echo "❌ Insufficient balance. Need at least 1 ALGO for deployment."
    echo "Fund your account at: https://dispenser.testnet.algorand.network/"
    exit 1
fi

# Compile contracts
echo "📦 Compiling smart contracts..."
if [ ! -f "contracts/UpliftVoting.teal" ]; then
    echo "❌ contracts/UpliftVoting.teal not found"
    exit 1
fi

if [ ! -f "contracts/clear.teal" ]; then
    echo "❌ contracts/clear.teal not found"
    exit 1
fi

mkdir -p contracts/compiled
goal clerk compile contracts/UpliftVoting.teal --outdir contracts/compiled/
goal clerk compile contracts/clear.teal --outdir contracts/compiled/

echo "✅ Contracts compiled successfully"

# Deploy main contract
echo "🔗 Deploying UpliftVoting contract to testnet..."
DEPLOY_OUTPUT=$(goal app create \
  --creator $ALGORAND_ACCOUNT \
  --approval-prog contracts/compiled/UpliftVoting.teal.tok \
  --clear-prog contracts/compiled/clear.teal.tok \
  --global-byteslices 64 \
  --global-ints 64 \
  --local-byteslices 16 \
  --local-ints 16 \
  --datadir ~/node/data 2>&1)

if [[ $DEPLOY_OUTPUT == *"Created app with app index"* ]]; then
    APP_ID=$(echo "$DEPLOY_OUTPUT" | grep "Created app with app index" | cut -d' ' -f6)
    echo "✅ Contract deployed successfully!"
    echo "📋 App ID: $APP_ID"
    echo "🔍 View on TestNet: https://testnet.algoexplorer.io/application/$APP_ID"
    echo "🔍 View on GoalSeeker: https://goalseeker.purestake.io/algorand/testnet/application/$APP_ID"
    
    # Save app ID to config file
    echo "APP_ID=$APP_ID" > .env
    echo "NETWORK=testnet" >> .env
    echo "ALGORAND_SERVER=https://testnet-api.algonode.cloud" >> .env
    echo "ALGORAND_PORT=443" >> .env
    
    echo "💾 Configuration saved to .env file"
    
    # Update demo with real contract (optional)
    if [ -f "demo/voting.js" ]; then
        echo "🔧 Updating demo configuration..."
        sed -i "s/const UPLIFT_APP_ID = .*/const UPLIFT_APP_ID = $APP_ID;/" demo/voting.js
        sed -i "s/const ALGORAND_NETWORK = .*/const ALGORAND_NETWORK = 'testnet';/" demo/voting.js
        echo "✅ Demo updated with real contract ID"
    fi
    
    echo ""
    echo "🎉 Deployment Complete!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📱 Next Steps:"
    echo "1. Test the demo: cd demo && python3 -m http.server 8080"
    echo "2. Integrate with wallet: Add Pera/MyAlgo wallet connection"
    echo "3. Test voting: Submit real votes with testnet ALGO"
    echo "4. Monitor transactions: Use provided explorer links"
    echo ""
    echo "💡 Integration Code:"
    echo "const UPLIFT_CONFIG = {"
    echo "  appId: $APP_ID,"
    echo "  network: 'testnet',"
    echo "  server: 'https://testnet-api.algonode.cloud'"
    echo "};"
    
else
    echo "❌ Deployment failed:"
    echo "$DEPLOY_OUTPUT"
    exit 1
fi