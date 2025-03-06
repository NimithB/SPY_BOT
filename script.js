const videoFeed = document.getElementById('video-feed');
const patternAnalysisChart = document.getElementById('pattern-analysis-chart').getContext('2d');
const voiceDetectionsChart = document.getElementById('voice-detections-chart').getContext('2d');

// Generate Synthetic Data for 5 Devices
const devices = [
    { id: 1, status: 'normal', activity: 75 },
    { id: 2, status: 'warning', activity: 50 },
    { id: 3, status: 'critical', activity: 20 },
    { id: 4, status: 'normal', activity: 90 },
    { id: 5, status: 'normal', activity: 60 }
];

// Initialize Video Feed
function initVideoFeed() {
    // Logic to start the video feed
    videoFeed.play();
}

// Create Animated Line Graph for Pattern Analysis
const patternChart = new Chart(patternAnalysisChart, {
    type: 'line',
    data: {
        labels: devices.map(device => Device ${device.id}), // Device labels
        datasets: [{
            label: 'Activity Levels',
            data: devices.map(device => device.activity), // Activity data points
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        }]
    },
    options: {
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad'
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Create Circular Progress Chart for Voice Detections
const voiceChart = new Chart(voiceDetectionsChart, {
    type: 'doughnut',
    data: {
        labels: ['Detected', 'Not Detected'],
        datasets: [{
            data: [3, 7], // Example data
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw;
                    }
                }
            }
        }
    }
});

// Generate Random Predictions
function generateRandomPredictions() {
    const predictions = [
        { type: 'Activity Recognition', result: Math.random() > 0.5 ? 'Detected' : 'Not Detected' },
        { type: 'Anomaly Detection', result: Math.random() > 0.5 ? 'Anomaly Found' : 'No Anomaly' },
        { type: 'Threat Level', result: Math.random() > 0.5 ? 'High' : 'Low' },
        { type: 'User Behavior', result: Math.random() > 0.5 ? 'Suspicious' : 'Normal' },
        { type: 'System Health', result: Math.random() > 0.5 ? 'Critical' : 'Stable' }
    ];
    
    predictions.forEach(prediction => {
        const predictionCard = document.createElement('div');
        predictionCard.className = 'ai-prediction-card';
        predictionCard.textContent = ${prediction.type}: ${prediction.result};
        document.querySelector('.ai-prediction').appendChild(predictionCard);
    });
}

// Update Device Status
function updateDeviceStatus() {
    devices.forEach(device => {
        const deviceCard = document.querySelector(.device-card[data-id="${device.id}"]);
        deviceCard.className = device-card ${device.status};
        deviceCard.textContent = Device ${device.id}: ${device.status};
    });
}

// Initialize everything
initVideoFeed();
updateDeviceStatus();
generateRandomPredictions();