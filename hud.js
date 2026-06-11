// ENHANCED HUD Display Manager with Debug Info
class HUDManager {
    constructor(aircraft) {
        this.aircraft = aircraft;
        this.setupElements();
        this.frameCount = 0;
        this.fps = 0;
        this.lastTime = Date.now();
    }

    setupElements() {
        this.altitudeDisplay = document.getElementById('altitude');
        this.speedDisplay = document.getElementById('speed');
        this.headingDisplay = document.getElementById('heading');
        this.pitchDisplay = document.getElementById('pitch');
        this.throttleDisplay = document.getElementById('throttle');
        this.fuelDisplay = document.getElementById('fuel');
        this.locationDisplay = document.getElementById('location');
        this.compassNeedle = document.getElementById('compass-needle');
        this.horizonCanvas = document.getElementById('horizon-canvas');
        this.horizonCtx = this.horizonCanvas.getContext('2d');
    }

    update() {
        // Calculate FPS
        this.frameCount++;
        const currentTime = Date.now();
        if (currentTime - this.lastTime >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = currentTime;
        }

        // Update altitude
        const altitude = this.aircraft.position.y * 3.28084;
        this.altitudeDisplay.textContent = altitude.toFixed(0) + ' ft';

        // Update speed (knots)
        const speed = this.aircraft.getSpeed() * 1.94384;
        this.speedDisplay.textContent = speed.toFixed(0) + ' kt';

        // Update heading
        const heading = this.aircraft.getHeading();
        this.headingDisplay.textContent = heading.toFixed(0) + '°';

        // Update pitch
        const pitch = this.aircraft.getPitch();
        this.pitchDisplay.textContent = pitch.toFixed(1) + '°';

        // Update throttle
        const throttlePercent = (this.aircraft.controls.throttle * 100).toFixed(0);
        this.throttleDisplay.textContent = throttlePercent + '%';

        // Update fuel
        const fuelPercent = (this.aircraft.fuel * 100).toFixed(0);
        this.fuelDisplay.textContent = fuelPercent + '%';

        // Update location
        const lat = this.aircraft.getLatitude();
        const lon = this.aircraft.getLongitude();
        this.locationDisplay.textContent = 
            lat.toFixed(4) + '°, ' + lon.toFixed(4) + '°';

        // Update compass
        const compassRotation = -heading;
        this.compassNeedle.style.transform = `rotate(${compassRotation}deg)`;

        // Update artificial horizon
        this.drawArtificialHorizon();

        // Add status message to console
        if (this.frameCount % 60 === 0) {
            console.log(`FPS: ${this.fps} | Alt: ${altitude.toFixed(0)}ft | Speed: ${speed.toFixed(0)}kt | Heading: ${heading.toFixed(0)}°`);
        }
    }

    drawArtificialHorizon() {
        const width = this.horizonCanvas.width;
        const height = this.horizonCanvas.height;
        const centerX = width / 2;
        const centerY = height / 2;

        this.horizonCtx.clearRect(0, 0, width, height);

        const pitch = this.aircraft.getPitch();
        const roll = this.aircraft.getRoll();

        // Sky
        this.horizonCtx.fillStyle = '#87ceeb';
        this.horizonCtx.fillRect(0, 0, width, height);

        // Ground
        this.horizonCtx.fillStyle = '#8b7355';
        this.horizonCtx.fillRect(0, height / 2, width, height / 2);

        this.horizonCtx.save();
        this.horizonCtx.translate(centerX, centerY);
        this.horizonCtx.rotate((roll * Math.PI) / 180);

        const pitchOffset = (pitch / 90) * (height / 4);
        this.horizonCtx.translate(0, pitchOffset);

        // Horizon line
        this.horizonCtx.strokeStyle = '#0f0';
        this.horizonCtx.lineWidth = 2;
        this.horizonCtx.beginPath();
        this.horizonCtx.moveTo(-width, 0);
        this.horizonCtx.lineTo(width, 0);
        this.horizonCtx.stroke();

        // Pitch lines
        this.horizonCtx.strokeStyle = '#0f0';
        this.horizonCtx.lineWidth = 1;
        for (let i = -80; i <= 80; i += 10) {
            const y = (i / 90) * (height / 4);
            const w = i % 30 === 0 ? 40 : 20;
            this.horizonCtx.beginPath();
            this.horizonCtx.moveTo(-w / 2, y);
            this.horizonCtx.lineTo(w / 2, y);
            this.horizonCtx.stroke();
        }

        this.horizonCtx.restore();

        // Center point
        this.horizonCtx.fillStyle = '#0f0';
        this.horizonCtx.beginPath();
        this.horizonCtx.arc(centerX, centerY, 3, 0, Math.PI * 2);
        this.horizonCtx.fill();

        // Aircraft symbol
        this.horizonCtx.strokeStyle = '#0f0';
        this.horizonCtx.lineWidth = 2;
        
        this.horizonCtx.beginPath();
        this.horizonCtx.moveTo(centerX - 30, centerY);
        this.horizonCtx.lineTo(centerX + 30, centerY);
        this.horizonCtx.stroke();

        this.horizonCtx.beginPath();
        this.horizonCtx.moveTo(centerX, centerY - 15);
        this.horizonCtx.lineTo(centerX, centerY + 15);
        this.horizonCtx.stroke();
    }
}
