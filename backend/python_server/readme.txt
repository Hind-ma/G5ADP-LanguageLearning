SETUP
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

Repeat when oppening a new terminal

4. Activate venv
run:
pip install -r requirements.txt

I have had problems with this before, worst case scenario you will
have to install the libraries manually with pip install. 

5. Start server

run:
python api_server.py 

ctrl^c to stop








