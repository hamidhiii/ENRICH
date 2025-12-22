import uvicorn
import sys
import os
import traceback

# Add current directory to path
sys.path.append(os.getcwd())

def log(msg):
    with open("startup_log.txt", "a") as f:
        f.write(msg + "\n")

try:
    log("Starting script...")
    from main import app
    log("Imported app successfully")
    log(f"__name__ is {__name__}")
    if __name__ == "__main__":
        log("Starting uvicorn...")
        import uvicorn
        log("Uvicorn imported")
        uvicorn.run(app, host="0.0.0.0", port=8001)
        log("Uvicorn finished")
except Exception as e:
    log(f"Error: {e}")
    with open("startup_log.txt", "a") as f:
        import traceback
        traceback.print_exc(file=f)
