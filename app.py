from flask import Flask, render_template, jsonify, request, send_from_directory, make_response
import os
import pdfkit

app = Flask(__name__)

# Move static files to Flask's static folder structure
app.static_folder = 'static'

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

@app.route('/export_pdf')
def export_pdf():
    # Create a PDF from a PDF-specific template (without navigation buttons)
    # Add current datetime to the template
    from datetime import datetime
    
    # Create a PDF from the logs template
    html = render_template('logs_pdf.html', now=datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    
    # Configure pdfkit options
    options = {
        'page-size': 'A4',
        'margin-top': '0.75in',
        'margin-right': '0.75in',
        'margin-bottom': '0.75in',
        'margin-left': '0.75in',
        'encoding': 'UTF-8',
        'no-outline': None
    }
    
    try:
        # Generate PDF from HTML
        pdf = pdfkit.from_string(html, False, options=options)
        
        # Create a response with PDF content
        response = make_response(pdf)
        response.headers['Content-Type'] = 'application/pdf'
        response.headers['Content-Disposition'] = 'attachment; filename=logs_report.pdf'
        
        return response
    except Exception as e:
        # Handle errors (for example, if pdfkit/wkhtmltopdf is not installed)
        return str(e), 500

if __name__ == '__main__':
    app.run(debug=True)