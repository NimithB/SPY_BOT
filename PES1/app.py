from flask import Flask, render_template, jsonify, request, make_response, Response
import os
import pdfkit
import serial
import serial.tools.list_ports
import threading
import time
import csv
from datetime import datetime

app = Flask(__name__)
app.static_folder = 'static'

# ----------------- ROUTES -----------------

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/gps')
def gps():
    return render_template('gps.html')

@app.route('/logs')
def logs():
    return render_template('logs.html')

@app.route('/ai_prediction')
def ai_prediction():
    return render_template('ai_prediction.html')

@app.route('/terminal')
def terminal():
    return render_template('terminal.html')

@app.route('/summary')
def summary():
    return render_template('summary.html')

# ----------------- PDF EXPORT FUNCTION -----------------
@app.route('/export_pdf')
def export_pdf():
    """Generates a PDF report of the logs and returns it as a downloadable file."""
    try:
        html = render_template('logs_pdf.html', now=datetime.now().strftime('%Y-%m-%d %H:%M:%S'))

        options = {
            'page-size': 'A4',
            'margin-top': '0.75in',
            'margin-right': '0.75in',
            'margin-bottom': '0.75in',
            'margin-left': '0.75in',
            'encoding': 'UTF-8',
            'no-outline': None
        }

        pdf = pdfkit.from_string(html, False, options=options)
        response = make_response(pdf)
        response.headers['Content-Type'] = 'application/pdf'
        response.headers['Content-Disposition'] = 'attachment; filename=logs_report.pdf'
        return response
    except Exception as e:
        return str(e), 500

# ----------------- CSV EXPORT FUNCTION -----------------
@app.route('/export_csv')
def export_csv():
    """Generates a CSV report of logs and returns it as a downloadable file."""
    try:
        log_data = [
            ["Timestamp", "Device ID", "User ID", "Geolocation", "Event Type", "Status"],
            ["2023-03-07T03:45:04.792Z", "Device001", "User123", "37.7749,-122.4194", "Unauthorized Access", "🔔"],
            ["2023-03-07T03:30:00.000Z", "Device002", "User456", "37.7750,-122.4195", "Network Breach", "❌"]
        ]

        output = Response()
        output.headers["Content-Disposition"] = "attachment; filename=logs.csv"
        output.headers["Content-type"] = "text/csv"

        writer = csv.writer(output.stream)
        writer.writerows(log_data)

        return output
    except Exception as e:
        return str(e), 500

# ----------------- GPS API -----------------
@app.route('/get_gps_devices')
def get_gps_devices():
    """Returns GPS tracking data for connected devices."""
    gps_devices = [
        {"id": "GPS-001", "location": "N 40.7128° W 74.0060°", "speed": "0 km/h", "movement": "Stationary"},
        {"id": "GPS-002", "location": "N 34.0522° W 118.2437°", "speed": "65 km/h", "movement": "Moving Northeast"},
        {"id": "GPS-003", "location": "N 51.5074° W 0.1278°", "speed": "30 km/h", "movement": "Moving West"}
    ]
    return jsonify({"gps_devices": gps_devices})

# ----------------- SERIAL TERMINAL -----------------
ser = None
serial_thread = None
serial_data = []

def get_serial_ports():
    """Detect available serial ports on the system."""
    return [port.device for port in serial.tools.list_ports.comports()]

def read_serial():
    """Continuously read data from serial port."""
    global ser, serial_data
    while ser and ser.is_open:
        try:
            line = ser.readline().decode('utf-8').strip()
            if line:
                serial_data.append(line)
        except Exception:
            break

@app.route('/ports', methods=['GET'])
def list_ports():
    """Returns available serial ports."""
    return jsonify({"ports": get_serial_ports()})

@app.route('/connect', methods=['POST'])
def connect():
    """Connect to the selected serial port."""
    global ser, serial_thread
    port = request.json.get('port')

    try:
        ser = serial.Serial(port, 115200, timeout=1)
        serial_data.clear()

        serial_thread = threading.Thread(target=read_serial, daemon=True)
        serial_thread.start()

        return jsonify({"status": "connected", "message": f"Connected to {port}"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

@app.route('/send', methods=['POST'])
def send_command():
    """Send a command via serial port and return response."""
    global ser
    if ser and ser.is_open:
        command = request.json.get('command')
        ser.write((command + '\n').encode())

        time.sleep(0.5)
        response = "\n".join(serial_data)
        serial_data.clear()

        return jsonify({"status": "success", "response": response}), 200
    return jsonify({"status": "error", "message": "Not connected"}), 400

@app.route('/receive', methods=['GET'])
def receive_data():
    """Fetch latest received serial data."""
    global serial_data
    data = "\n".join(serial_data)
    serial_data.clear()
    return jsonify({"data": data}), 200

# ----------------- RESET DEVICE FUNCTION -----------------
@app.route('/reset_device', methods=['POST'])
def reset_device():
    """Simulates a device reset and returns status."""
    return jsonify({"status": "success", "message": "Device reset successfully", "timestamp": datetime.now().isoformat()}), 200

# ----------------- RUN APP -----------------
if __name__ == '__main__':
    app.run(debug=True)
