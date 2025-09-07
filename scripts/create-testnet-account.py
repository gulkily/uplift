#!/usr/bin/env python3

"""
Uplift TestNet Account Generator
Creates a new Algorand TestNet account for use with the Uplift demo
"""

import os
import sys
import json
from algosdk import account, encoding, mnemonic
import requests

def create_account():
    """Create a new Algorand account"""
    print("🔑 Generating new Algorand TestNet account...")
    
    # Generate account
    private_key, public_address = account.generate_account()
    
    # Get mnemonic for backup
    account_mnemonic = mnemonic.from_private_key(private_key)
    
    return {
        'address': public_address,
        'private_key': private_key,
        'mnemonic': account_mnemonic
    }

def check_testnet_dispenser():
    """Check if TestNet dispenser is available"""
    try:
        response = requests.get('https://testnet.algoexplorer.io/dispenser', timeout=5)
        return response.status_code == 200
    except:
        return False

def save_account_info(account_info):
    """Save account info to secure file"""
    # Create secure directory
    os.makedirs('.uplift', exist_ok=True)
    
    account_file = '.uplift/testnet-account.json'
    
    with open(account_file, 'w') as f:
        json.dump({
            'address': account_info['address'],
            'mnemonic': account_info['mnemonic'],
            'network': 'testnet',
            'created_at': '2024-09-07'
        }, f, indent=2)
    
    # Set restrictive permissions
    os.chmod(account_file, 0o600)
    
    return account_file

def main():
    print("🤗 Uplift TestNet Account Setup")
    print("=" * 50)
    
    # Check if account already exists
    if os.path.exists('.uplift/testnet-account.json'):
        print("⚠️  TestNet account already exists!")
        choice = input("Create new account? (y/N): ").lower()
        if choice != 'y':
            with open('.uplift/testnet-account.json', 'r') as f:
                existing = json.load(f)
            print(f"✅ Using existing account: {existing['address']}")
            return existing['address']
    
    # Generate new account
    account_info = create_account()
    
    print("✅ Account generated successfully!")
    print()
    print("📋 Account Details:")
    print("=" * 50)
    print(f"Address: {account_info['address']}")
    print()
    print("🔐 Mnemonic (KEEP SECRET!):")
    print(account_info['mnemonic'])
    print()
    
    # Save account info
    account_file = save_account_info(account_info)
    print(f"💾 Account saved to: {account_file}")
    print("🔒 File permissions set to 600 (owner read/write only)")
    print()
    
    # Check dispenser availability
    print("🏦 TestNet Funding Instructions:")
    print("=" * 50)
    
    if check_testnet_dispenser():
        print("✅ TestNet dispenser is available!")
        print()
        print("💰 Get free TestNet ALGO tokens:")
        print("1. Visit: https://testnet.algoexplorer.io/dispenser")
        print("2. Enter your address:")
        print(f"   {account_info['address']}")
        print("3. Click 'Dispense'")
        print("4. Wait for transaction confirmation")
        print()
        print("🔍 Monitor your account:")
        print(f"   https://testnet.algoexplorer.io/address/{account_info['address']}")
    else:
        print("⚠️  TestNet dispenser may be unavailable")
        print("Try alternative funding methods:")
        print("1. Algorand Faucet: https://developer.algorand.org/docs/get-details/testnet/")
        print("2. Community Discord: Ask for testnet funding")
    
    print()
    print("🚀 Integration Instructions:")
    print("=" * 50)
    print("Add this to your testnet configuration:")
    print()
    print(f"const TESTNET_ACCOUNT = '{account_info['address']}';")
    print("const TESTNET_SERVER = 'https://testnet-api.algonode.cloud';")
    print("const TESTNET_PORT = 443;")
    print()
    
    print("⚠️  SECURITY WARNING:")
    print("- This is a TestNet account for development only")
    print("- Never use TestNet keys on MainNet")
    print("- Keep your mnemonic phrase secure")
    print("- Don't commit private keys to version control")
    print()
    
    # Create environment file
    with open('.env.testnet', 'w') as f:
        f.write(f"ALGORAND_TESTNET_ADDRESS={account_info['address']}\n")
        f.write("ALGORAND_TESTNET_SERVER=https://testnet-api.algonode.cloud\n")
        f.write("ALGORAND_TESTNET_PORT=443\n")
        f.write("ALGORAND_TESTNET_TOKEN=\n")
    
    print("📁 Environment file created: .env.testnet")
    print()
    print("🎯 Ready for TestNet integration!")
    
    return account_info['address']

if __name__ == "__main__":
    try:
        address = main()
        print()
        print("🎉 Setup complete!")
        print(f"Your TestNet address: {address}")
        
    except KeyboardInterrupt:
        print("\n❌ Setup cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)