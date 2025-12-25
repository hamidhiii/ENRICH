import urllib.request
import urllib.error
import json
import secrets

BASE_URL = "http://localhost:8001"

def test_health():
    try:
        with urllib.request.urlopen(f"{BASE_URL}/health") as response:
            data = json.loads(response.read().decode())
            print(f"Health Check: {response.status} - {data}")
    except Exception as e:
        print(f"Health Check Failed: {e}")

def test_registration_restricted():
    user_data = {
        "email": f"test_{secrets.token_hex(4)}@example.com",
        "username": f"user_{secrets.token_hex(4)}",
        "password": "password123",
        "role": "viewer"
    }
    data = json.dumps(user_data).encode('utf-8')
    req = urllib.request.Request(f"{BASE_URL}/api/auth/register", data=data, method='POST')
    req.add_header('Content-Type', 'application/json')
    try:
        with urllib.request.urlopen(req) as response:
            print(f"Restricted Registration: {response.status}")
    except urllib.error.HTTPError as e:
        print(f"Restricted Registration (Expected Error): {e.code} - {e.reason}")
    except Exception as e:
        print(f"Restricted Registration Failed: {e}")

if __name__ == "__main__":
    print("Starting Verification (using urllib)...")
    test_health()
    test_registration_restricted()
    print("Verification Complete.")
