// Flight Physics Engine
class FlightPhysics {
    constructor() {
        // Aircraft state
        this.position = { x: 0, y: 5000, z: 0 }; // meters, altitude is Y
        this.velocity = { x: 0, y: 0, z: 0 }; // m/s
        this.acceleration = { x: 0, y: 0, z: 0 };

        // Rotation state (Euler angles in radians)
        this.rotation = { pitch: 0, roll: 0, yaw: 0 }; // radians
        this.angularVelocity = { pitch: 0, roll: 0, yaw: 0 };

        // Control inputs (-1 to 1)
        this.controls = {
            pitch: 0,      // up/down
            roll: 0,       // left/right
            yaw: 0,        // turning
            throttle: 0,   // 0 to 1
            brake: 0       // 0 to 1
        };

        // Aircraft parameters
        this.maxThrottle = 100; // m/s max speed
        this.maxPitch = Math.PI / 3; // 60 degrees
        this.maxRoll = Math.PI / 2.5; // 72 degrees
        this.dragCoefficient = 0.02;
        this.gravity = 9.81;
        this.mass = 5000; // kg
        this.fuel = 1.0; // 0 to 1

        // Stall parameters
        this.stallSpeed = 15; // m/s
        this.liftCoefficient = 0.3;

        this.deltaTime = 0.016; // 60 FPS
    }

    update(dt = this.deltaTime) {
        this.deltaTime = dt;

        // Update fuel consumption
        this.fuel = Math.max(0, this.fuel - this.controls.throttle * dt * 0.05);
        
        if (this.fuel <= 0) {
            this.controls.throttle = 0;
        }

        // Calculate speed
        const speed = Math.sqrt(
            this.velocity.x ** 2 + 
            this.velocity.y ** 2 + 
            this.velocity.z ** 2
        );

        // Lift generation based on speed and pitch
        let lift = 0;
        if (speed > this.stallSpeed) {
            lift = this.liftCoefficient * speed * Math.cos(this.rotation.pitch) * this.deltaTime;
        }

        // Apply controls to angular velocities
        this.angularVelocity.pitch = this.controls.pitch * 2;
        this.angularVelocity.roll = this.controls.roll * 2;
        this.angularVelocity.yaw = this.controls.yaw * 2;

        // Update rotation
        this.rotation.pitch += this.angularVelocity.pitch * dt;
        this.rotation.roll += this.angularVelocity.roll * dt;
        this.rotation.yaw += this.angularVelocity.yaw * dt;

        // Limit rotation angles
        this.rotation.pitch = Math.max(-this.maxPitch, Math.min(this.maxPitch, this.rotation.pitch));
        this.rotation.roll = Math.max(-this.maxRoll, Math.min(this.maxRoll, this.rotation.roll));

        // Normalize yaw
        this.rotation.yaw = this.rotation.yaw % (Math.PI * 2);

        // Throttle control
        const targetSpeed = this.controls.throttle * this.maxThrottle;
        const speedDifference = targetSpeed - speed;
        const acceleration = Math.sign(speedDifference) * Math.min(Math.abs(speedDifference), 20) * dt;

        // Apply acceleration in the direction the plane is pointing
        const forwardX = Math.sin(this.rotation.yaw) * Math.cos(this.rotation.pitch);
        const forwardY = Math.sin(this.rotation.pitch);
        const forwardZ = Math.cos(this.rotation.yaw) * Math.cos(this.rotation.pitch);

        this.velocity.x += forwardX * acceleration;
        this.velocity.y += forwardY * acceleration + lift;
        this.velocity.z += forwardZ * acceleration;

        // Apply gravity
        this.velocity.y -= this.gravity * dt;

        // Apply drag
        const dragForce = -this.dragCoefficient * speed;
        this.velocity.x += (this.velocity.x / (speed + 0.001)) * dragForce * dt;
        this.velocity.y += (this.velocity.y / (speed + 0.001)) * dragForce * dt;
        this.velocity.z += (this.velocity.z / (speed + 0.001)) * dragForce * dt;

        // Apply brake
        if (this.controls.brake > 0) {
            this.velocity.x *= (1 - this.controls.brake * 0.1);
            this.velocity.y *= (1 - this.controls.brake * 0.1);
            this.velocity.z *= (1 - this.controls.brake * 0.1);
        }

        // Update position
        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;
        this.position.z += this.velocity.z * dt;

        // Ground collision (sea level at y=0)
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
            this.velocity.x *= 0.95;
            this.velocity.z *= 0.95;
        }

        // Maximum altitude limit
        if (this.position.y > 15000) {
            this.position.y = 15000;
            this.velocity.y = Math.min(0, this.velocity.y);
        }
    }

    getSpeed() {
        return Math.sqrt(
            this.velocity.x ** 2 + 
            this.velocity.y ** 2 + 
            this.velocity.z ** 2
        );
    }

    getHeading() {
        let heading = (this.rotation.yaw * 180 / Math.PI + 90) % 360;
        if (heading < 0) heading += 360;
        return heading;
    }

    getPitch() {
        return (this.rotation.pitch * 180 / Math.PI);
    }

    getRoll() {
        return (this.rotation.roll * 180 / Math.PI);
    }

    reset() {
        this.position = { x: 0, y: 2000, z: 0 };
        this.velocity = { x: 0, y: 0, z: 0 };
        this.rotation = { pitch: 0, roll: 0, yaw: 0 };
        this.angularVelocity = { pitch: 0, roll: 0, yaw: 0 };
        this.fuel = 1.0;
    }

    setControl(controlName, value) {
        if (this.controls.hasOwnProperty(controlName)) {
            this.controls[controlName] = Math.max(-1, Math.min(1, value));
        }
    }

    getLatitude() {
        return (this.position.z / 111320); // rough conversion
    }

    getLongitude() {
        return (this.position.x / 111320);
    }
}
