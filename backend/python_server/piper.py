import sys
import subprocess

DEPENDENCY_FILE = "deps.txt"

def piper(command, target):
    if command == "install":
        if target == DEPENDENCY_FILE:
            install_libraries_from_file(target)
        else:
            install_library_from_line(target)
    elif command == "uninstall":
        if target.endswith('.txt'):
            print("Cannot uninstall from a file. Provide a single library name.")
            sys.exit(1)
        else:
            uninstall_library(target)
    else:
        print("Invalid command. Use 'install' or 'uninstall'.")
        sys.exit(1)

def install_libraries_from_file(file_path):
    with open(file_path, 'r') as file:
        for line in file:
            install_library_from_line(line.strip(), force=file_path == DEPENDENCY_FILE)
           

def install_library_from_line(line, force = False):
    try:
        # Split the line by whitespace to separate package name and additional arguments
        args = line.split()
        # Run pip install command with the arguments
        if not has_dependency(line) or force:
            subprocess.run(['pip', 'install'] + args, check=True)
            if not force:
                record_dependency(line)
            print(f"Successfully installed {' '.join(args)}")
        else:
            print(f"{' '.join(args)} allready installed")
    except subprocess.CalledProcessError:
        print(f"Failed to install {' '.join(args)}")

def uninstall_library(library_name):
    try:
        # Run pip uninstall command for the library
        subprocess.run(['pip', 'uninstall', '-y', library_name], check=True)
        remove_dependency(library_name)
        print(f"Successfully uninstalled {library_name}")
    except subprocess.CalledProcessError:
        print(f"Failed to uninstall {library_name}")

def record_dependency(library_name):
    with open(DEPENDENCY_FILE, 'a') as file:
        file.write(library_name + '\n')

def remove_dependency(library_name):
    # Read the dependency file, remove the library entry, and rewrite the file
    with open(DEPENDENCY_FILE, 'r') as file:
        lines = file.readlines()
    with open(DEPENDENCY_FILE, 'w') as file:
        for line in lines:
            if line.strip() != library_name:
                file.write(line)
def has_dependency(library_name):
    # Read the dependency file, remove the library entry, and rewrite the file
    with open(DEPENDENCY_FILE, 'r') as file:
        lines = file.readlines()
    with open(DEPENDENCY_FILE, 'r') as file:
        for line in lines:
            if line.strip() == library_name:
                return True
    return False

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python piper.py install/uninstall <file_path | library_name>")
        sys.exit(1)
    
    command = sys.argv[1]
    target = sys.argv[2]
    piper(command, target)
