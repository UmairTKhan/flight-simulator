# 🛩️ First Flight Simulator - Complete Setup Guide

A fully functional flight simulator built with Three.js and JavaScript. Experience realistic aircraft physics, beautiful 3D terrain, and an authentic cockpit HUD.

---

## 🚀 Quick Start (Choose Your Method)

### **Method 1: GitHub Pages (Easiest - No Installation)**
1. Go to repository settings: https://github.com/UmairTKhan/flight-simulator/settings/pages
2. Under "Source," select `main` branch and `/root` folder
3. Click Save
4. Your game is live at: **`https://umairtkhan.github.io/flight-simulator/`**
5. Open that link and enjoy! ✈️

### **Method 2: One-Click Launcher**

**Windows:**
```
Double-click: launch-windows.bat
```

**macOS/Linux:**
```bash
chmod +x launch-mac-linux.sh
./launch-mac-linux.sh
```

**Node.js (All Platforms):**
```bash
node launcher.js
```

### **Method 3: Manual Server Setup**

**Python 3:**
```bash
python -m http.server 8000
# Then open: http://localhost:8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
# Then open: http://localhost:8000
```

**Node.js:**
```bash
npm install -g http-server
http-server
```

---

## 🎮 Complete Controls Guide

### Keyboard Controls
| Action | Key | Alternative |
|--------|-----|-------------|
| **Pitch Up** | ⬆️ Up Arrow | W (hold) |
| **Pitch Down** | ⬇️ Down Arrow | S (hold) |
| **Roll Left** | ⬅️ Left Arrow | A (hold) |
| **Roll Right** | ➡️ Right Arrow | D (hold) |
| **Yaw Left** | A | Q |
| **Yaw Right** | D | E |
| **Increase Throttle** | W | Shift |
| **Decrease Throttle** | S | Ctrl |
| **Apply Brake** | Space | B |
| **Reset Position** | R | Home |
| **Change View** | V | C |

### Gamepad Controls (Xbox/PlayStation)
| Action | Control |
|--------|---------|
| **Pitch & Roll** | Right Stick |
| **Yaw** | Left Stick X-axis |
| **Throttle Up** | RT / R2 |
| **Throttle Down** | LT / L2 |
| **Brake** | A / Cross |
| **Reset** | Start Menu |

---

## 📊 Flight Simulator Specifications

### Aircraft Performance
- **Max Speed**: 100 m/s (~194 knots / 224 mph)
- **Stall Speed**: 15 m/s (~29 knots / 34 mph)
- **Max Altitude**: 15,000 meters (~49,212 feet)
- **Cruise Speed**: 60-70 m/s (~116-136 knots)

### Flight Envelope
- **Max Pitch**: ±60°
- **Max Roll**: ±72°
- **Fuel Capacity**: 1.0 (normalized)
- **Fuel Consumption Rate**: Variable (0.05% per second at full throttle)

### Physics Model
- Gravitational acceleration: 9.81 m/s² (Earth standard)
- Lift coefficient: 0.3 (pitch-dependent)
- Drag coefficient: 0.02 (speed-dependent)
- Aircraft mass: 5,000 kg

---

## 🎯 Flying Tips & Tutorials

### Taking Off ✈️
1. **Increase throttle** (W key) to 50-70%
2. **Pitch up** gently (Up Arrow) to gain altitude
3. Once airborne, reduce pitch and maintain throttle
4. Climb steadily while turning

### Cruising 🌤️
- Maintain **60-70% throttle** for efficient flight
- Keep **pitch near 0°** for level flight
- Watch **fuel consumption** - it increases with throttle
- Altitude auto-levels to 15,000m maximum

### Landing 着陸
1. **Reduce throttle** (S key) gradually
2. **Pitch down** gently to descend
3. **Speed will decrease** as you lose altitude
4. When near ground, **reduce throttle to 0%**
5. Aircraft will settle on terrain smoothly

### Emergency Maneuvers 🚨
- **Stall Recovery**: Reduce pitch, increase throttle
- **Spin Recovery**: Level wings first (A/D), then pitch up
- **Emergency Descent**: Reduce throttle, pitch down sharply
- **Brake**: Use Space bar for emergency stop

---

## 📁 Project Structure

```
flight-simulator/
├── index.html              # Main HTML file
├── styles.css              # HUD and UI styling
├── flight-physics.js       # Aircraft dynamics engine
├── scene-setup.js          # Three.js 3D environment
├── controls.js             # Input handling
├── hud.js                  # Cockpit instruments
├── main.js                 # Game loop
├── launcher.js             # Node.js launcher
├── launch-windows.bat      # Windows quick start
├── launch-mac-linux.sh     # macOS/Linux quick start
├── package.json            # npm configuration
├── README.md               # This file
└── .gitignore              # Git ignore rules
```

---

## 🧠 Flight Physics Implementation

### Lift Generation
- **Formula**: `lift = liftCoefficient × airspeed × cos(pitch)`
- **Stall Threshold**: 15 m/s minimum airspeed
- **Effect**: Prevents aircraft from falling when flying level

### Drag Model
- **Formula**: `drag = -dragCoefficient × velocity`
- **Proportional to Speed**: Higher speed = more drag
- **Realistic Slowdown**: Matches real aircraft behavior

### Gravity & Weight
- **Vertical Force**: -9.81 m/s² (constant)
- **Counteracted by**: Lift when pitched correctly
- **Result**: Aircraft sinks if pitch too negative

### Control Response
- **Angular Acceleration**: Limited to realistic rates
- **Max Pitch Rate**: ±2 rad/s
- **Max Roll Rate**: ±2 rad/s
- **Max Yaw Rate**: ±2 rad/s

### Ground Collision
- **Sea Level**: y = 0 meters
- **Collision Response**: Position resets, velocity dampened (×0.95)
- **Bounce Prevention**: Vertical velocity zeroed on contact

---

## 🎨 HUD Instruments Explained

### Altitude Indicator
- **Display**: Feet (×3.28084 m/ft conversion)
- **Range**: 0 - 49,212 ft
- **Warning**: Aircraft cannot exceed 15,000m

### Airspeed Indicator
- **Display**: Knots (×1.94384 m/s conversion)
- **Stall Speed**: 29 knots (marked in code)
- **Max Speed**: 194 knots

### Heading Indicator
- **Display**: Degrees (0-360°)
- **Format**: Cardinal directions (N, S, E, W)
- **Compass**: Visual rose overlay

### Artificial Horizon
- **Shows**: Aircraft pitch and roll in real-time
- **Visual**: Green line represents horizon
- **Wings**: Aircraft symbol indicates attitude

### Compass Rose
- **Red Needle**: Points to current heading
- **Cardinals**: N, E, S, W marked
- **360° Scale**: Full rotation display

---

## 🐛 Troubleshooting

### Game Won't Start
**Problem**: Blank screen or JavaScript errors
- **Solution 1**: Clear browser cache (Ctrl+Shift+Del)
- **Solution 2**: Try different browser (Chrome, Firefox, Safari)
- **Solution 3**: Check console for errors (F12 → Console tab)

### Low Frame Rate
**Problem**: Game running slowly (below 60 FPS)
- **Solution 1**: Close other browser tabs
- **Solution 2**: Reduce screen resolution
- **Solution 3**: Update graphics drivers

### Controls Not Responding
**Problem**: Keyboard/gamepad input not working
- **Solution 1**: Click on game window to ensure focus
- **Solution 2**: Test keyboard on another website
- **Solution 3**: Gamepad may need driver update

### Server Connection Failed
**Problem**: "Cannot connect to localhost:8000"
- **Solution 1**: Check if port 8000 is available
- **Solution 2**: Use different port: `python -m http.server 9000`
- **Solution 3**: Firewall may be blocking - check settings

---

## 🔮 Future Features Roadmap

- [ ] **Multiplayer Mode** - Fly with friends
- [ ] **Weather System** - Rain, wind, turbulence
- [ ] **Real Map Integration** - OpenStreetMap/Mapbox
- [ ] **Multiple Aircraft** - Cessna, Boeing, Jet
- [ ] **Autopilot System** - Auto-level, waypoint nav
- [ ] **Missions & Challenges** - Racing, rescue ops
- [ ] **Damage Model** - Structural failures
- [ ] **Air Traffic Control** - Landing guidance
- [ ] **Virtual Airlines** - Career progression
- [ ] **Custom Liveries** - Airplane skins

---

## 💡 Advanced Tips

### Performance Optimization
- Use **Chrome** for best performance
- Close **unnecessary browser tabs**
- Run on **dedicated GPU** (laptops: settings → graphics)
- Update **graphics drivers** regularly

### Realistic Flying
- **Real-world ratios**: Mimics Cessna 172
- **Stall behavior**: Matches actual aerodynamics
- **Control authority**: Realistic response curves
- **Fuel consumption**: Based on throttle usage

### Custom Modifications
Edit aircraft parameters in `flight-physics.js`:
```javascript
this.maxThrottle = 100;      // Maximum speed (m/s)
this.maxPitch = Math.PI / 3;  // ±60° maximum
this.stallSpeed = 15;         // Minimum airspeed (m/s)
```

---

## 📞 Support & Contact

- **Issues**: Open a GitHub issue
- **Questions**: Check the README FAQ
- **Contributions**: Pull requests welcome
- **Suggestions**: Discussions tab on GitHub

---

## 📄 License

This project is open source under the **MIT License**.

Feel free to use, modify, and distribute!

---

## 🙏 Credits

- **Three.js** - 3D graphics library
- **GitHub** - Hosting & version control
- **Contributors** - Community feedback

---

**🎉 Enjoy your flight! Happy flying! ✈️**

*Last Updated: June 2026*
