#!/usr/bin/env python3

"""
Real-time TestNet Transaction Monitor for Uplift
Watches for new transactions on your testnet address
"""

import requests
import json
import time
from datetime import datetime

TESTNET_ADDRESS = "WB62SP4LFUKZSMJD7G3ENTCHEZVEKW3FYAJ64HV2IU6W52ZQRDSOR3JOQY"
API_BASE = "https://testnet-api.algonode.cloud/v2"

def get_account_info():
    """Get current account information"""
    try:
        url = f"{API_BASE}/accounts/{TESTNET_ADDRESS}"
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            return response.json()
        return None
    except Exception as e:
        print(f"Error fetching account info: {e}")
        return None

def get_recent_transactions(limit=5):
    """Get recent transactions using AlgoExplorer API"""
    try:
        # AlgoExplorer API for transactions
        url = f"https://testnet.algoexplorerapi.io/v2/accounts/{TESTNET_ADDRESS}/transactions"
        params = {"limit": limit}
        response = requests.get(url, params=params, timeout=10)
        if response.status_code == 200:
            return response.json()
        
        # Fallback: try to parse from web scraping if needed
        print(f"⚠️ API returned status {response.status_code}, check explorer manually")
        return None
    except Exception as e:
        print(f"Error fetching transactions: {e}")
        print("💡 Use browser explorer for transaction history")
        return None

def format_algo_amount(micro_algo):
    """Convert microALGO to ALGO"""
    return f"{micro_algo / 1_000_000:.6f} ALGO"

def print_account_status():
    """Print current account status"""
    print("🔍 Uplift TestNet Monitor")
    print("=" * 50)
    
    account_info = get_account_info()
    if not account_info:
        print("❌ Could not fetch account information")
        return
    
    balance = account_info.get('amount', 0)
    round_number = account_info.get('round', 0)
    
    print(f"📍 Address: {TESTNET_ADDRESS[:8]}...{TESTNET_ADDRESS[-8:]}")
    print(f"💰 Balance: {format_algo_amount(balance)}")
    print(f"🔗 Current Round: {round_number:,}")
    print(f"⏰ Last Update: {datetime.now().strftime('%H:%M:%S')}")
    print()

def print_transactions():
    """Print recent transactions"""
    tx_data = get_recent_transactions(10)
    if not tx_data:
        print("📭 No transaction data available")
        return
    
    transactions = tx_data.get('transactions', [])
    if not transactions:
        print("📭 No transactions found")
        return
    
    print("📋 Recent Transactions:")
    print("-" * 50)
    
    for tx in transactions:
        tx_id = tx.get('id', 'Unknown')
        tx_type = tx.get('tx-type', 'unknown')
        round_num = tx.get('confirmed-round', 0)
        
        # Format transaction based on type
        if tx_type == 'pay':
            sender = tx.get('sender', '')
            receiver = tx.get('payment-transaction', {}).get('receiver', '')
            amount = tx.get('payment-transaction', {}).get('amount', 0)
            
            direction = "🔴 OUT" if sender == TESTNET_ADDRESS else "🟢 IN"
            other_party = receiver if sender == TESTNET_ADDRESS else sender
            
            print(f"{direction} | {format_algo_amount(amount)} | Round {round_num:,}")
            print(f"     {other_party[:8]}...{other_party[-8:]}")
            print(f"     TX: {tx_id[:16]}...")
            
        elif tx_type == 'appl':
            app_id = tx.get('application-transaction', {}).get('application-id', 0)
            print(f"📱 APP | Contract Call | App ID: {app_id} | Round {round_num:,}")
            print(f"     TX: {tx_id[:16]}...")
            
        else:
            print(f"🔷 {tx_type.upper()} | Round {round_num:,}")
            print(f"     TX: {tx_id[:16]}...")
        
        print(f"     🔍 View: https://testnet.algoexplorer.io/tx/{tx_id}")
        print()

def monitor_continuously():
    """Continuously monitor for new transactions"""
    print("🚀 Starting continuous monitoring...")
    print("Press Ctrl+C to stop")
    print()
    
    last_round = 0
    
    try:
        while True:
            account_info = get_account_info()
            if account_info:
                current_round = account_info.get('round', 0)
                if current_round > last_round:
                    print(f"\n🔄 New blocks detected (Round {current_round:,})")
                    print_transactions()
                    last_round = current_round
            
            time.sleep(5)  # Check every 5 seconds
            
    except KeyboardInterrupt:
        print("\n👋 Monitoring stopped")

def main():
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "monitor":
        monitor_continuously()
    else:
        print_account_status()
        print_transactions()
        
        print("\n💡 Usage:")
        print("python3 monitor-testnet.py         # One-time check")
        print("python3 monitor-testnet.py monitor # Continuous monitoring")
        print()
        print("🔗 Explorer Links:")
        print(f"Account: https://testnet.algoexplorer.io/address/{TESTNET_ADDRESS}")
        print(f"Transactions: https://testnet.algoexplorer.io/address/{TESTNET_ADDRESS}/transactions")

if __name__ == "__main__":
    main()