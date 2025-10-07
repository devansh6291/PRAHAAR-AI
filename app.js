// PRAHAAR AI Defense Command Center JavaScript

class PrahaarAI {
    constructor() {
        this.data = {
            threats: [
                {"id": 1, "type": "Air", "level": "HIGH", "location": "Kashmir Sector", "time": "10:45", "status": "Active", "description": "Unidentified aircraft detected"},
                {"id": 2, "type": "Cyber", "level": "CRITICAL", "location": "Delhi Command", "time": "10:30", "status": "Investigating", "description": "Attempted network intrusion"},
                {"id": 3, "type": "Naval", "level": "MEDIUM", "location": "Arabian Sea", "time": "09:15", "status": "Monitoring", "description": "Unknown vessel approaching EEZ"},
                {"id": 4, "type": "Ground", "level": "LOW", "location": "Rajasthan Border", "time": "08:45", "status": "Resolved", "description": "Border patrol incident"}
            ],
            units: [
                {"name": "Alpha Squadron", "status": "Ready", "location": "Ambala AFB", "personnel": 24, "aircraft": 12},
                {"name": "Bravo Battalion", "status": "Deployed", "location": "Siachen", "personnel": 450, "equipment": 85},
                {"name": "Charlie Naval Group", "status": "Patrol", "location": "Indian Ocean", "personnel": 300, "vessels": 3},
                {"name": "Delta Cyber Division", "status": "Alert", "location": "Bangalore", "personnel": 150, "systems": 45}
            ],
            missions: [
                {"id": "OP-001", "name": "Border Patrol", "status": "Active", "priority": "High", "eta": "14:00"},
                {"id": "OP-002", "name": "Reconnaissance", "status": "Planning", "priority": "Medium", "eta": "16:30"},
                {"id": "OP-003", "name": "Training Exercise", "status": "Scheduled", "priority": "Low", "eta": "Tomorrow"}
            ],
            systems: [
                {"name": "Radar Network", "status": "Operational", "uptime": "99.8%", "coverage": "100%"},
                {"name": "Communication Grid", "status": "Operational", "uptime": "98.5%", "coverage": "95%"},
                {"name": "Satellite Network", "status": "Degraded", "uptime": "85.2%", "coverage": "80%"},
                {"name": "Cyber Defense", "status": "Alert", "uptime": "100%", "coverage": "100%"}
            ]
        };

        this.init();
    }

    init() {
        this.updateTime();
        this.populateThreats();
        this.populateUnits();
        this.populateMissions();
        this.populateSystems();
        this.setupEventListeners();
        this.startRealTimeUpdates();
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
        document.getElementById('systemTime').textContent = timeString;
    }

    populateThreats() {
        const threatGrid = document.getElementById('threatGrid');
        if (!threatGrid) return;

        threatGrid.innerHTML = '';

        this.data.threats.forEach(threat => {
            const threatElement = document.createElement('div');
            threatElement.className = `threat-item ${threat.level.toLowerCase()}`;
            threatElement.innerHTML = `
                <div class="threat-header">
                    <span class="threat-type">${threat.type}</span>
                    <span class="threat-level ${threat.level.toLowerCase()}">${threat.level}</span>
                </div>
                <div class="threat-info">
                    <span>${threat.location}</span>
                    <span>${threat.time} | ${threat.status}</span>
                </div>
                <div class="threat-description">${threat.description}</div>
            `;
            threatGrid.appendChild(threatElement);
        });

        // Update threat counts
        const counts = { critical: 0, high: 0, medium: 0, low: 0 };
        this.data.threats.forEach(threat => {
            counts[threat.level.toLowerCase()]++;
        });

        document.getElementById('criticalCount').textContent = counts.critical;
        document.getElementById('highCount').textContent = counts.high;
        document.getElementById('mediumCount').textContent = counts.medium;
        document.getElementById('lowCount').textContent = counts.low;
    }

    populateUnits() {
        const unitsGrid = document.getElementById('unitsGrid');
        if (!unitsGrid) return;

        unitsGrid.innerHTML = '';

        this.data.units.forEach(unit => {
            const unitElement = document.createElement('div');
            unitElement.className = 'unit-item';
            unitElement.innerHTML = `
                <div class="unit-header">
                    <span class="unit-name">${unit.name}</span>
                    <span class="unit-status ${unit.status.toLowerCase()}">${unit.status.toUpperCase()}</span>
                </div>
                <div class="unit-details">
                    <span>${unit.location}</span>
                    <span>${unit.personnel} Personnel</span>
                </div>
            `;
            unitsGrid.appendChild(unitElement);
        });
    }

    populateMissions() {
        const missionsList = document.getElementById('missionsList');
        if (!missionsList) return;

        missionsList.innerHTML = '';

        this.data.missions.forEach(mission => {
            const missionElement = document.createElement('div');
            missionElement.className = `mission-item ${mission.priority.toLowerCase()}`;
            missionElement.innerHTML = `
                <div class="mission-header">
                    <span class="mission-id">${mission.id}</span>
                    <span class="mission-eta">ETA: ${mission.eta}</span>
                </div>
                <div class="mission-name">${mission.name}</div>
            `;
            missionsList.appendChild(missionElement);
        });
    }

    populateSystems() {
        const systemsGrid = document.getElementById('systemsGrid');
        if (!systemsGrid) return;

        systemsGrid.innerHTML = '';

        this.data.systems.forEach(system => {
            const systemElement = document.createElement('div');
            systemElement.className = `system-item ${system.status.toLowerCase()}`;
            systemElement.innerHTML = `
                <div class="system-header">
                    <span class="system-name">${system.name}</span>
                    <span class="system-status ${system.status.toLowerCase()}">${system.status.toUpperCase()}</span>
                </div>
                <div class="system-metrics">
                    <span>Uptime: ${system.uptime}</span>
                    <span>Coverage: ${system.coverage}</span>
                </div>
            `;
            systemsGrid.appendChild(systemElement);
        });
    }

    setupEventListeners() {
        // Alert indicator click
        const alertIndicator = document.getElementById('alertIndicator');
        if (alertIndicator) {
            alertIndicator.addEventListener('click', () => {
                this.showAlert();
            });
        }

        // Close modal
        const closeModal = document.getElementById('closeModal');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                this.hideAlert();
            });
        }

        // Modal background click
        const modal = document.getElementById('alertModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideAlert();
                }
            });
        }

        // Map controls
        const mapButtons = document.querySelectorAll('.map-btn');
        mapButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                mapButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Communication channels
        const channels = document.querySelectorAll('.channel');
        channels.forEach(channel => {
            channel.addEventListener('click', () => {
                channels.forEach(c => c.classList.remove('active'));
                channel.classList.add('active');
            });
        });

        // Send message
        const sendBtn = document.querySelector('.send-btn');
        const messageInput = document.querySelector('.message-input input');
        if (sendBtn && messageInput) {
            sendBtn.addEventListener('click', () => {
                const message = messageInput.value.trim();
                if (message) {
                    this.sendMessage(message);
                    messageInput.value = '';
                }
            });

            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendBtn.click();
                }
            });
        }

        // Module interactions
        document.querySelectorAll('.threat-item').forEach(item => {
            item.addEventListener('click', () => {
                item.style.transform = 'translateX(10px)';
                setTimeout(() => {
                    item.style.transform = 'translateX(5px)';
                }, 200);
            });
        });

        document.querySelectorAll('.unit-item').forEach(item => {
            item.addEventListener('click', () => {
                item.style.transform = 'translateX(10px)';
                setTimeout(() => {
                    item.style.transform = 'translateX(5px)';
                }, 200);
            });
        });
    }

    showAlert() {
        const modal = document.getElementById('alertModal');
        if (modal) {
            modal.classList.add('show');
        }
    }

    hideAlert() {
        const modal = document.getElementById('alertModal');
        if (modal) {
            modal.classList.remove('show');
        }
    }

    sendMessage(message) {
        const messagesFeed = document.querySelector('.message-feed');
        if (messagesFeed) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit' 
            });

            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.innerHTML = `
                <span class="msg-time">${timeString}</span>
                <span class="msg-from">CMD-USER</span>
                <span class="msg-text">${message}</span>
            `;

            messagesFeed.appendChild(messageElement);
            messagesFeed.scrollTop = messagesFeed.scrollHeight;

            // Simulate response
            setTimeout(() => {
                const responseElement = document.createElement('div');
                responseElement.className = 'message';
                responseElement.innerHTML = `
                    <span class="msg-time">${now.toLocaleTimeString('en-US', { 
                        hour12: false, 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    })}</span>
                    <span class="msg-from">SYSTEM</span>
                    <span class="msg-text">Message received and acknowledged</span>
                `;
                messagesFeed.appendChild(responseElement);
                messagesFeed.scrollTop = messagesFeed.scrollHeight;
            }, 1000);
        }
    }

    simulateDataUpdate() {
        // Simulate random threat level changes
        if (Math.random() > 0.8) {
            const randomThreat = this.data.threats[Math.floor(Math.random() * this.data.threats.length)];
            const levels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
            randomThreat.level = levels[Math.floor(Math.random() * levels.length)];
            this.populateThreats();
        }

        // Simulate system status changes
        if (Math.random() > 0.9) {
            const randomSystem = this.data.systems[Math.floor(Math.random() * this.data.systems.length)];
            const statuses = ['Operational', 'Degraded', 'Alert'];
            randomSystem.status = statuses[Math.floor(Math.random() * statuses.length)];
            this.populateSystems();
        }

        // Update performance bars randomly
        const perfBars = document.querySelectorAll('.perf-fill');
        perfBars.forEach(bar => {
            if (Math.random() > 0.7) {
                const newWidth = Math.floor(Math.random() * 40) + 30; // 30-70%
                bar.style.width = newWidth + '%';
                const valueSpan = bar.parentElement.parentElement.querySelector('.perf-value');
                if (valueSpan) {
                    valueSpan.textContent = newWidth + '%';
                }
            }
        });
    }

    startRealTimeUpdates() {
        // Update time every second
        setInterval(() => {
            this.updateTime();
        }, 1000);

        // Simulate data updates every 5 seconds
        setInterval(() => {
            this.simulateDataUpdate();
        }, 5000);

        // Blink alert indicator
        setInterval(() => {
            const alertIndicator = document.getElementById('alertIndicator');
            if (alertIndicator) {
                alertIndicator.style.opacity = alertIndicator.style.opacity === '0.5' ? '1' : '0.5';
            }
        }, 1500);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PrahaarAI();

    // Add some visual effects
    document.querySelectorAll('.module').forEach(module => {
        module.addEventListener('mouseenter', () => {
            module.style.borderColor = '#22d3ee';
        });

        module.addEventListener('mouseleave', () => {
            module.style.borderColor = '#00ff41';
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('alertModal');
            if (modal && modal.classList.contains('show')) {
                modal.classList.remove('show');
            }
        }

        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            location.reload();
        }
    });

    // Add loading animation to modules
    document.querySelectorAll('.module').forEach((module, index) => {
        module.style.opacity = '0';
        module.style.transform = 'translateY(20px)';

        setTimeout(() => {
            module.style.transition = 'all 0.5s ease';
            module.style.opacity = '1';
            module.style.transform = 'translateY(0)';
        }, index * 100);
    });

    console.log('PRAHAAR AI Defense System Initialized');
    console.log('Status: OPERATIONAL');
    console.log('Security Level: MAXIMUM');
});