// JavaScript for AI-Powered Forensic Log Dashboard

// Initialize log entries when the page loads
function initLogEntries() {
    const logEntries = document.getElementById('log-entries');
    if (!logEntries) return;

    // In a real application, this would fetch data from a backend API
    const mockData = [
        { timestamp: '2023-03-07T03:45:04.792Z', deviceId: 'Device001', userId: 'User123', geolocation: '37.7749, -122.4194', eventType: 'Unauthorized Access', status: '🚨' },
        { timestamp: '2023-03-07T03:30:00.000Z', deviceId: 'Device002', userId: 'User456', geolocation: '37.7750, -122.4195', eventType: 'Network Breach', status: '🚨' },
        { timestamp: '2023-03-07T03:15:00.000Z', deviceId: 'Device003', userId: 'User789', geolocation: '37.7751, -122.4196', eventType: 'Suspicious Login', status: '⚠️' },
        { timestamp: '2023-03-07T03:00:00.000Z', deviceId: 'Device004', userId: 'User012', geolocation: '37.7752, -122.4197', eventType: 'Regular Login', status: '✅' },
        { timestamp: '2023-03-07T02:45:00.000Z', deviceId: 'Device005', userId: 'User345', geolocation: '37.7753, -122.4198', eventType: 'Data Transfer', status: '✅' },
        { timestamp: '2023-03-07T02:30:00.000Z', deviceId: 'Device006', userId: 'User678', geolocation: '37.7754, -122.4199', eventType: 'Configuration Change', status: '⚠️' },
        { timestamp: '2023-03-07T02:15:00.000Z', deviceId: 'Device007', userId: 'User901', geolocation: '37.7755, -122.4200', eventType: 'Password Reset', status: '✅' },
        { timestamp: '2023-03-07T02:00:00.000Z', deviceId: 'Device008', userId: 'User234', geolocation: '37.7756, -122.4201', eventType: 'Account Lockout', status: '🚨' },
        { timestamp: '2023-03-07T01:45:00.000Z', deviceId: 'Device009', userId: 'User567', geolocation: '37.7757, -122.4202', eventType: 'File Access', status: '✅' },
        { timestamp: '2023-03-07T01:30:00.000Z', deviceId: 'Device010', userId: 'User890', geolocation: '37.7758, -122.4203', eventType: 'Malware Detection', status: '🚨' }
    ];

    // Clear existing entries
    logEntries.innerHTML = '';

    // Add mock data to the table
    mockData.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.timestamp}</td>
            <td>${entry.deviceId}</td>
            <td>${entry.userId}</td>
            <td>${entry.geolocation}</td>
            <td>${entry.eventType}</td>
            <td>${entry.status}</td>
        `;
        logEntries.appendChild(row);
    });
}

// Update router overview data
function updateRouterOverview() {
    document.getElementById('connection-type').textContent = 'WiFi';
    document.getElementById('public-ip').textContent = '192.168.1.1';
    
    // Generate random number of connected devices
    const connectedDevices = Math.floor(Math.random() * 10) + 1;
    document.getElementById('connected-devices').textContent = connectedDevices;
    
    // Update network status
    const hasIssues = Math.random() > 0.8;
    document.getElementById('network-status').textContent = hasIssues ? 'Minor Issues' : 'None';
    document.getElementById('isp-provider').textContent = 'Example ISP';
    document.getElementById('internet-speed').textContent = Math.floor(Math.random() * 50 + 50) + ' Mbps';
    
    // Update connection indicator
    const connectionIndicator = document.getElementById('connection-indicator');
    if (connectedDevices > 0 && !hasIssues) {
        connectionIndicator.classList.remove('disconnected');
        connectionIndicator.classList.add('connected');
    } else {
        connectionIndicator.classList.remove('connected');
        connectionIndicator.classList.add('disconnected');
    }
}

// Update network performance metrics
function updateNetworkPerformance() {
    if (!document.getElementById('uptime-percentage')) return;
    
    document.getElementById('uptime-percentage').textContent = (99 + Math.random()).toFixed(1) + '%';
    document.getElementById('bandwidth-usage').textContent = Math.floor(Math.random() * 30 + 20) + ' Mbps';
    document.getElementById('signal-strength').textContent = Math.random() > 0.7 ? 'Strong' : 'Medium';
    document.getElementById('ping-results').textContent = Math.floor(Math.random() * 30 + 10) + ' ms';
    document.getElementById('dns-status').textContent = Math.random() > 0.9 ? 'Issue Detected' : 'OK';
}

// Handle live video feed
function handleLiveVideo() {
    const liveVideo = document.getElementById('live-feed');
    if (!liveVideo) return;
    
    // In a real application, this would connect to a live stream
    // For demo purposes, we're just updating the AI detection status
    setInterval(() => {
        document.getElementById('ai-detection-status').textContent = 
            Math.random() > 0.8 ? 'Motion Detected!' : 'Monitoring...';
    }, 3000);
}

// Update heatmap data
function updateHeatmaps() {
    const heatmapCanvas = document.getElementById('heatmap-canvas');
    if (!heatmapCanvas) return;
    
    // In a real application, this would render a heatmap visualization
    document.getElementById('incident-frequency').textContent = 
        Math.floor(Math.random() * 5);
}

// Track geolocation
function trackGeolocation() {
    const map = document.getElementById('map');
    if (!map) return;
    
    // Note: Main geolocation tracking is now handled in gps.html
    // This function is kept for backward compatibility with other code
    
    // Update any geofencing alerts if present
    const geofencingElement = document.getElementById('geofencing-alerts');
    if (geofencingElement) {
        geofencingElement.textContent = Math.random() > 0.7 ? 'Breach detected in Zone 3!' : 'None';
    }
}

// Update AI analysis results
function updateAIAnalysis() {
    if (!document.getElementById('unusual-patterns')) return;
    
    document.getElementById('unusual-patterns').textContent = 
        Math.random() > 0.7 ? 'Login pattern anomaly detected' : 'None detected';
    document.getElementById('high-risk-locations').textContent = 
        Math.random() > 0.8 ? 'Unusual activity from foreign IP' : 'None detected';
        
    // Add click event listeners to AI predictions
    document.getElementById('unusual-patterns').style.cursor = 'pointer';
    document.getElementById('high-risk-locations').style.cursor = 'pointer';
    
    document.getElementById('unusual-patterns').addEventListener('click', showRandomGraph);
    document.getElementById('high-risk-locations').addEventListener('click', showRandomGraph);
}

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
    initLogEntries();
    updateRouterOverview();
    updateNetworkPerformance();
    handleLiveVideo();
    updateHeatmaps();
    trackGeolocation();
    updateAIAnalysis();
    
    // Set up periodic updates
    setInterval(updateRouterOverview, 5000);
    setInterval(updateNetworkPerformance, 7000);
    setInterval(updateAIAnalysis, 10000); // Periodically update AI predictions
    
    // Set up event handlers
    const refreshButton = document.getElementById('refresh-button');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            updateRouterOverview();
            updateNetworkPerformance();
            updateAIAnalysis();
            alert('Data refreshed!');
        });
    }
    
    // Set up summary button event handler
    const summaryButton = document.getElementById('summary-button');
    if (summaryButton) {
        summaryButton.addEventListener('click', generateSummary);
    }
    
    // We no longer need to add click handler for AI prediction button
    // as it now navigates directly to the AI prediction page
});

// Function to go back to main dashboard (for logs and gps pages)
function goBack() {
    window.location.href = '/';
}

// Function to show random graph when AI prediction is clicked
function showRandomGraph() {
    // Create modal container if it doesn't exist
    let modal = document.getElementById('graph-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'graph-modal';
        modal.className = 'modal';
        
        // Add modal content
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button" onclick="closeGraphModal()">&times;</span>
                <h2>AI Analysis Graph</h2>
                <div id="graph-container"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add modal style if not already in CSS
        const style = document.createElement('style');
        style.textContent = `
            .modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.7);
            }
            .modal-content {
                background-color: #fefefe;
                margin: 15% auto;
                padding: 20px;
                border: 1px solid #888;
                width: 70%;
                border-radius: 5px;
            }
            .close-button {
                color: #aaa;
                float: right;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
            }
            .close-button:hover {
                color: black;
            }
            #graph-container {
                width: 100%;
                height: 300px;
                background-color: #f5f5f5;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 20px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show modal
    modal.style.display = 'block';
    
    // Generate random graph
    const graphContainer = document.getElementById('graph-container');
    graphContainer.innerHTML = ''; // Clear previous graph
    
    // Create a random graph (just for visualization)
    const graphType = Math.random() > 0.5 ? 'bar' : 'line';
    
    if (graphType === 'bar') {
        // Create a simple bar graph
        let barGraph = '';
        for (let i = 0; i < 10; i++) {
            const height = Math.floor(Math.random() * 200) + 20;
            barGraph += `<div style="display:inline-block; width:8%; margin:0 1%; background-color:hsl(${Math.random()*360},70%,50%); height:${height}px;"></div>`;
        }
        graphContainer.innerHTML = barGraph;
    } else {
        // Create a simple line graph
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '300');
        svg.setAttribute('viewBox', '0 0 500 300');
        
        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        let points = '';
        for (let i = 0; i < 10; i++) {
            const y = Math.floor(Math.random() * 200) + 50;
            points += `${i*50},${y} `;
        }
        polyline.setAttribute('points', points);
        polyline.setAttribute('stroke', `hsl(${Math.random()*360},70%,50%)`);
        polyline.setAttribute('stroke-width', '3');
        polyline.setAttribute('fill', 'none');
        
        svg.appendChild(polyline);
        graphContainer.appendChild(svg);
    }
}

// Function to close the graph modal
function closeGraphModal() {
    const modal = document.getElementById('graph-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Function to generate summary of key parameters
function generateSummary() {
    // Get current values of key parameters
    const connectionType = document.getElementById('connection-type').textContent;
    const publicIP = document.getElementById('public-ip').textContent;
    const connectedDevices = document.getElementById('connected-devices').textContent;
    const networkStatus = document.getElementById('network-status').textContent;
    const ispProvider = document.getElementById('isp-provider').textContent;
    const internetSpeed = document.getElementById('internet-speed').textContent;
    
    // Analyze the impact of these parameters
    let analysis = '';
    
    // Connection type analysis
    analysis += `<p><strong>Connection Type:</strong> ${connectionType} - `;
    if (connectionType === 'WiFi') {
        analysis += 'Wireless connection offers convenience but may have security vulnerabilities if not properly secured.</p>';
    } else if (connectionType === 'Ethernet') {
        analysis += 'Wired connection provides more stable and secure connectivity compared to wireless options.</p>';
    } else {
        analysis += 'Connection type may affect overall network security and stability.</p>';
    }
    
    // Connected devices analysis
    analysis += `<p><strong>Connected Devices:</strong> ${connectedDevices} - `;
    if (parseInt(connectedDevices) > 5) {
        analysis += 'High number of connected devices could impact network performance and bandwidth availability.</p>';
    } else {
        analysis += 'Current device count is within normal range for typical home/small office environment.</p>';
    }
    
    // Network status analysis
    analysis += `<p><strong>Network Issues:</strong> ${networkStatus} - `;
    if (networkStatus !== 'None') {
        analysis += 'Detected issues may affect network reliability and should be addressed promptly.</p>';
    } else {
        analysis += 'Network appears to be operating normally without detected issues.</p>';
    }
    
    // Internet speed analysis
    analysis += `<p><strong>Internet Speed:</strong> ${internetSpeed} - `;
    const speedValue = parseInt(internetSpeed);
    if (speedValue < 50) {
        analysis += 'Current speed may be insufficient for high-bandwidth activities like video conferencing or streaming.</p>';
    } else if (speedValue >= 50 && speedValue < 100) {
        analysis += 'Speed is adequate for most online activities including HD streaming.</p>';
    } else {
        analysis += 'High-speed connection capable of supporting multiple simultaneous high-bandwidth activities.</p>';
    }
    
    // Overall conclusion
    let conclusion = '<p><strong>Overall Assessment:</strong> ';
    if (networkStatus !== 'None' || parseInt(connectedDevices) > 5) {
        conclusion += 'The network is experiencing some strain that may affect performance. ';
        if (networkStatus !== 'None') {
            conclusion += 'Addressing the identified network issues should be prioritized. ';
        }
        if (parseInt(connectedDevices) > 5) {
            conclusion += 'Consider monitoring bandwidth usage across connected devices. ';
        }
    } else {
        conclusion += 'The network appears to be operating within normal parameters. ';
    }
    conclusion += `Regular monitoring is recommended to maintain optimal performance with your ${ispProvider} connection.</p>`;
    
    // Display the summary in a modal or dedicated section
    const summaryContent = `
        <div class="summary-modal">
            <h2>Network Summary Analysis</h2>
            <div class="summary-content">
                ${analysis}
                ${conclusion}
            </div>
            <button onclick="closeSummary()">Close</button>
        </div>
    `;
    
    // Create modal container if it doesn't exist
    let modalContainer = document.getElementById('modal-container');
    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'modal-container';
        document.body.appendChild(modalContainer);
    }
    
    modalContainer.innerHTML = summaryContent;
    modalContainer.style.display = 'block';
}

// Function to close the summary modal
function closeSummary() {
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
        modalContainer.style.display = 'none';
    }
}