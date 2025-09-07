#!/usr/bin/env python3

"""
Get deployment info for the already deployed contract
"""

from algosdk.logic import get_application_address

# The contract was successfully deployed with App ID: 745516459
APP_ID = 745516459
CONTRACT_ADDRESS = get_application_address(APP_ID)

deployment_info = {
    "appId": APP_ID,
    "contractAddress": CONTRACT_ADDRESS,
    "creatorAddress": "ESIYMXVC34CGPXQUQBLHXZVJBPRYYN6DOHR42EVFT6Q2HKK4C3KYZQK4N4",
    "network": "testnet",
    "status": "deployed"
}

print("🎉 UPLIFT CONTRACT SUCCESSFULLY DEPLOYED!")
print("=" * 50)
print(f"Application ID: {APP_ID}")
print(f"Contract Address: {CONTRACT_ADDRESS}")
print(f"Creator: ESIYMXVC34CGPXQUQBLHXZVJBPRYYN6DOHR42EVFT6Q2HKK4C3KYZQK4N4")
print()
print("🔍 View on TestNet Explorer:")
print(f"App: https://lora.algokit.io/testnet/application/{APP_ID}")
print(f"Contract: https://lora.algokit.io/testnet/account/{CONTRACT_ADDRESS}")
print()
print("🎯 Integration Code:")
print(f"const UPLIFT_APP_ID = {APP_ID};")
print(f"const CONTRACT_ADDRESS = '{CONTRACT_ADDRESS}';")

# Save to file
import json
import os

os.makedirs('.uplift', exist_ok=True)
with open('.uplift/deployment-info.json', 'w') as f:
    json.dump(deployment_info, f, indent=2)

print("\n💾 Deployment info saved to .uplift/deployment-info.json")