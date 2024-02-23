***SETUP***
1. Download python

2. Create venv in this folder. I used second one and use python 3.10.11
run:
python -m venv /path/to/python_server
or:
path/to/your/python -m venv /path/to/python_server

3. Enter venv
run:
in windows cmd:
.venv\Scripts\activate.bat
linux:
.venv\Scripts\activate

Repeat when opening a new terminal

4. Install dependencies
run: 
python piper.py install deps.txt    

5. Start server

run:
python api_server.py 
(this will take some time the first time around)
ctrl^c to stop


***USAGE***
1. Introducing and removing dependencies from code

piper.py is a homebrew which more or less just keeps a record of you pip installs

Therefore, to add an dependency run:
python piper.py install “lib name”

And to remove run:
python piper.py uninstall “lib name”

The changes will be recorded in the deps.txt file and can then be used by others to make sure they have the required dependencies.
