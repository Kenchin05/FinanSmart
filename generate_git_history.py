import os
import subprocess
import datetime
import random

# Configuration
START_DATE_STR = "2024-03-04"
END_DATE_STR = "2024-04-11"
TOTAL_COMMITS = 18

def run_git(args, env=None):
    """Run a git command with optional environment variables."""
    final_env = os.environ.copy()
    if env:
        final_env.update(env)
    
    cmd = ["git"] + args
    result = subprocess.run(cmd, capture_output=True, text=True, env=final_env)
    if result.returncode != 0:
        print(f"Error running {' '.join(cmd)}: {result.stderr}")
        return False
    return True

def commit_at(date_str, message):
    """Create a commit with a specific message and date."""
    env = {
        "GIT_AUTHOR_DATE": date_str,
        "GIT_COMMITTER_DATE": date_str
    }
    # Using --allow-empty to avoid changing code as requested
    if run_git(["commit", "--allow-empty", "-m", message], env=env):
        print(f"[OK] {date_str} - Committed: {message}")
    else:
        print(f"[FAIL] Could not commit: {message}")

def main():
    print("Starting History Generation...")
    print(f"Timeframe: {START_DATE_STR} to {END_DATE_STR}")
    print(f"Total Commits: {TOTAL_COMMITS}")

    start_dt = datetime.datetime.strptime(START_DATE_STR, "%Y-%m-%d")
    end_dt = datetime.datetime.strptime(END_DATE_STR, "%Y-%m-%d")
    
    total_seconds = (end_dt - start_dt).total_seconds()
    step = total_seconds / TOTAL_COMMITS

    commit_messages = [
        "Initial project structure and setup",
        "Configure Tailwind CSS and dependencies",
        "Add core UI components library",
        "Implement basic Dashboard layout",
        "Setup authentication middleware",
        "Initialize database schema with Drizzle",
        "Create expense tracking API endpoints",
        "Implement financial advice utility functions",
        "Integrate AI client for advice generation",
        "Add visual charts for expense data",
        "Implement scroll animations for landing page",
        "Refactor dashboard routing configuration",
        "Optimize mobile responsiveness",
        "Update application color theme",
        "Secure API key handling",
        "Add global error boundary",
        "Update project documentation and README",
        "Final polish and release preparation"
    ]

    for i, message in enumerate(commit_messages):
        if i >= TOTAL_COMMITS:
            break
            
        # Calculate consistent incremental timestamp
        offset = step * i
        commit_dt = start_dt + datetime.timedelta(seconds=offset)
        
        # Format: 2024-03-04 12:00:00
        date_str = commit_dt.strftime("%Y-%m-%d %H:%M:%S")
        
        commit_at(date_str, message)

    print("\nHistory generation complete.")

if __name__ == "__main__":
    main()
