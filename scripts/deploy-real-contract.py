#!/usr/bin/env python3

"""
Real TestNet Contract Deployment for Uplift
Compiles and deploys actual smart contracts to Algorand TestNet
"""

import os
import json
import base64
from algosdk import mnemonic, account, transaction
from algosdk.v2client import algod

# TestNet Configuration
ALGOD_ADDRESS = "https://testnet-api.algonode.cloud"
ALGOD_TOKEN = ""

def load_account():
    """Load account from stored credentials"""
    try:
        with open('.uplift/testnet-account.json', 'r') as f:
            account_data = json.load(f)
        
        # Convert mnemonic to private key
        private_key = mnemonic.to_private_key(account_data['mnemonic'])
        address = account_data['address']
        
        print(f"✅ Loaded account: {address}")
        return private_key, address
        
    except Exception as e:
        print(f"❌ Error loading account: {e}")
        print("Run: python3 scripts/create-testnet-account.py")
        return None, None

def compile_teal_program(algod_client, source_code):
    """Compile TEAL source code to bytecode"""
    try:
        compile_response = algod_client.compile(source_code)
        return base64.b64decode(compile_response['result'])
    except Exception as e:
        print(f"❌ TEAL compilation error: {e}")
        return None

def deploy_contract(algod_client, sender_address, private_key):
    """Deploy the Uplift voting contract"""
    
    print("🔨 Compiling TEAL programs...")
    
    # Read and compile approval program
    with open('contracts/UpliftVoting.teal', 'r') as f:
        approval_source = f.read()
    
    approval_program = compile_teal_program(algod_client, approval_source)
    if not approval_program:
        return None
    
    # Read and compile clear program  
    with open('contracts/clear.teal', 'r') as f:
        clear_source = f.read()
    
    clear_program = compile_teal_program(algod_client, clear_source)
    if not clear_program:
        return None
    
    print("✅ TEAL compilation successful")
    
    # Get transaction parameters
    params = algod_client.suggested_params()
    
    # Create application creation transaction
    txn = transaction.ApplicationCreateTxn(
        sender=sender_address,
        sp=params,
        on_complete=transaction.OnComplete.NoOpOC.real,
        approval_program=approval_program,
        clear_program=clear_program,
        global_schema=transaction.StateSchema(num_uints=32, num_byte_slices=32),
        local_schema=transaction.StateSchema(num_uints=8, num_byte_slices=8),
    )
    
    # Sign transaction
    signed_txn = txn.sign(private_key)
    
    print("🚀 Deploying contract to TestNet...")
    
    try:
        # Submit transaction
        tx_id = algod_client.send_transaction(signed_txn)
        print(f"📝 Transaction ID: {tx_id}")
        
        # Wait for confirmation
        confirmed_txn = transaction.wait_for_confirmation(algod_client, tx_id, 4)
        
        app_id = confirmed_txn["application-index"]
        print(f"✅ Contract deployed successfully!")
        print(f"📋 Application ID: {app_id}")
        
        # Calculate contract address
        from algosdk.logic import get_application_address
        contract_address = get_application_address(app_id)
        print(f"🏠 Contract Address: {contract_address}")
        
        # Save deployment info
        deployment_info = {
            "appId": app_id,
            "contractAddress": contract_address,
            "creatorAddress": sender_address,
            "transactionId": tx_id,
            "network": "testnet",
            "deploymentBlock": confirmed_txn["confirmed-round"],
            "timestamp": confirmed_txn.get("round-time", 0)
        }
        
        with open('.uplift/deployment-info.json', 'w') as f:
            json.dump(deployment_info, f, indent=2)
        
        print(f"💾 Deployment info saved to .uplift/deployment-info.json")
        
        # Fund contract with initial balance
        fund_contract(algod_client, sender_address, private_key, contract_address, app_id)
        
        return app_id, contract_address
        
    except Exception as e:
        print(f"❌ Deployment failed: {e}")
        return None, None

def fund_contract(algod_client, sender_address, private_key, contract_address, app_id):
    """Fund the contract with initial ALGO for operations"""
    try:
        params = algod_client.suggested_params()
        
        # Send 2 ALGO to contract
        funding_amount = 2_000_000  # 2 ALGO in microALGO
        
        txn = transaction.PaymentTxn(
            sender=sender_address,
            sp=params,
            receiver=contract_address,
            amt=funding_amount,
            note=f"Funding Uplift contract {app_id}".encode()
        )
        
        signed_txn = txn.sign(private_key)
        tx_id = algod_client.send_transaction(signed_txn)
        
        print(f"💰 Funding contract with 2 ALGO...")
        print(f"📝 Funding TX: {tx_id}")
        
        # Wait for confirmation
        transaction.wait_for_confirmation(algod_client, tx_id, 4)
        print("✅ Contract funded successfully")
        
    except Exception as e:
        print(f"⚠️ Contract funding failed: {e}")

def main():
    print("🤗 Uplift Real TestNet Deployment")
    print("=" * 50)
    
    # Load account credentials
    private_key, address = load_account()
    if not private_key:
        return
    
    # Initialize Algorand client
    algod_client = algod.AlgodClient(ALGOD_TOKEN, ALGOD_ADDRESS)
    
    # Check account balance
    try:
        account_info = algod_client.account_info(address)
        balance_algo = account_info['amount'] / 1_000_000
        print(f"💰 Account balance: {balance_algo:.6f} ALGO")
        
        if balance_algo < 0.5:
            print("❌ Insufficient balance for deployment (need at least 0.5 ALGO)")
            print("Fund your account at: https://bank.testnet.algorand.network/")
            return
            
    except Exception as e:
        print(f"❌ Error checking balance: {e}")
        return
    
    # Deploy contract
    app_id, contract_address = deploy_contract(algod_client, address, private_key)
    
    if app_id:
        print("\n" + "=" * 50)
        print("🎉 DEPLOYMENT SUCCESSFUL!")
        print("=" * 50)
        print(f"Application ID: {app_id}")
        print(f"Contract Address: {contract_address}")
        print(f"Creator: {address}")
        print("\n🔍 View on TestNet Explorer:")
        print(f"App: https://lora.algokit.io/testnet/application/{app_id}")
        print(f"Contract: https://lora.algokit.io/testnet/account/{contract_address}")
        print(f"Creator: https://lora.algokit.io/testnet/account/{address}")
        
        print("\n🎯 Integration Code:")
        print(f"const UPLIFT_APP_ID = {app_id};")
        print(f"const CONTRACT_ADDRESS = '{contract_address}';")
        
        print("\n📱 Next Steps:")
        print("1. Update testnet-integration.js with real App ID")
        print("2. Replace simulated transactions with real ones")
        print("3. Test voting with actual ALGO")
        
    else:
        print("❌ Deployment failed - check errors above")

if __name__ == "__main__":
    main()