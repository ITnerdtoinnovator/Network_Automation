import subprocess

def run_command(command):
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    while True:
        output = process.stdout.readline()
        if output == '' and process.poll() is not None:
            break
        if output:
            print(output.strip())
    rc = process.poll()
    return rc

if __name__ == "__main__":
    commands = [
        "ping -c 4 google.com",
        "ifconfig",
        "netstat -an"
    ]

    for command in commands:
        print(f"Running command: {command}")
        run_command(command)