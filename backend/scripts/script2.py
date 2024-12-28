import subprocess
import socket
import time
import sys

# List of IP addresses to test
IP_ADDRESSES = [
    "8.8.8.8",  # Google DNS
    "1.1.1.1",  # Cloudflare DNS
    "192.168.1.1",  # Common default gateway
]

# List of ports to check
PORTS = [22, 80, 443, 8080]

def ping_host(ip):
    """
    Ping a host to check reachability.
    """
    print(f"[*] Pinging {ip}...")
    sys.stdout.flush()
    try:
        result = subprocess.run(
            ["ping", "-c", "3", ip], stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
        if result.returncode == 0:
            print(f"[+] {ip} is reachable.")
        else:
            print(f"[-] {ip} is not reachable.")
        sys.stdout.flush()
    except Exception as e:
        print(f"[ERROR] Ping to {ip} failed: {str(e)}")
        sys.stdout.flush()

def check_port(ip, port):
    """
    Check if a specific port is open.
    """
    print(f"[*] Checking port {port} on {ip}...")
    sys.stdout.flush()
    try:
        with socket.create_connection((ip, port), timeout=5) as sock:
            sock.settimeout(2)
            banner = sock.recv(1024).decode('utf-8', errors='ignore')
            print(f"[+] Port {port} on {ip} is open. Banner: {banner.strip()}")
    except socket.timeout:
        print(f"[-] Port {port} on {ip} is open but no banner was received.")
    except ConnectionRefusedError:
        print(f"[-] Port {port} on {ip} is closed.")
    except Exception as e:
        print(f"[ERROR] Failed to check port {port} on {ip}: {str(e)}")
    sys.stdout.flush()

def network_automation():
    """
    Perform network automation tasks: ping and port scanning.
    """
    print("[*] Starting network automation script...")
    sys.stdout.flush()
    for ip in IP_ADDRESSES:
        ping_host(ip)
        time.sleep(1)  # Simulate delay for better logging
        for port in PORTS:
            check_port(ip, port)
            time.sleep(0.5)  # Simulate delay for each port check
    print("[*] Network automation completed.")
    sys.stdout.flush()

if __name__ == "__main__":
    network_automation()
