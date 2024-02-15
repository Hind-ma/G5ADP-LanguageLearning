from flask import Flask, request
from flask_swagger_ui import get_swaggerui_blueprint
import sys

app = Flask(__name__)




@app.route('/greet')
def greet():
    """A good function"""
    name = request.args.get('name', 'Anonymous')
    greeting = request.args.get('greeting', 'Hello')
    return f'{greeting}, {name}!'


if __name__ == '__main__':
    # Default host and port
    host = '127.0.0.1'
    port = 5000

    # Check if host and port are provided as command-line arguments
    if len(sys.argv) > 1:
        host = sys.argv[1]
    if len(sys.argv) > 2:
        port = int(sys.argv[2])

    app.run(host=host, port=port)
