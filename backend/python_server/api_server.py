from flask import Flask, request
import sys
from swegptmodel import swegpt_handeler

app = Flask(__name__)


swe_gbt = swegpt_handeler()

@app.route('/greet')
def greet():
    """A good function"""
    name = request.args.get('name', 'Anonymous')
    greeting = request.args.get('greeting', 'Hello')
    return f'{greeting}, {name}!'

@app.route('/get_fill_in_prob')
def get_fill_in_prob():
    before = request.args.get('before', '')
    fill = request.args.get('fill', '')
    after = request.args.get('after', '')
    ratio = request.args.get('ratio', '')
    if ratio != "":
        prob = swe_gbt.calc_fill_prob(before, fill, after,  float(ratio))
    else:
        prob = swe_gbt.calc_fill_prob(before, fill, after)
    return str(prob)


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
