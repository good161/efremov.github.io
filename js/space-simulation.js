document.addEventListener('DOMContentLoaded', function() {
    const SolarSystem = {
        canvas: document.getElementById('universeCanvas'),
        ctx: null,
        container: document.getElementById('celestialContainer'),
        starLabel: document.getElementById('stellarLabel'),
        baseSize: 800,
        scale: 1,
        center: { x: 0, y: 0 },
        showOrbits: true,
        showLabels: true,
        rotationSpeed: 1,
        zoomLevel: 1,
        minZoom: 0.5,
        maxZoom: 3,
        stars: [],
        planets: [],
        planetData: [
            { name: "Меркурий", distance: 0.4, size: 0.010, speed: 0.04, color: "#b5b5b5" },
            { name: "Венера", distance: 0.6, size: 0.016, speed: 0.015, color: "#e6c229" },
            { name: "Земля", distance: 0.8, size: 0.016, speed: 0.01, color: "#6b93d6", hasMoon: true, moonSize: 0.004 },
            { name: "Марс", distance: 1.0, size: 0.012, speed: 0.005, color: "#c1440e" },
            { name: "Юпитер", distance: 1.3, size: 0.030, speed: 0.002, color: "#c88b3a" },
            { name: "Сатурн", distance: 1.6, size: 0.026, speed: 0.0009, color: "#e4d191", hasRings: true },
            { name: "Уран", distance: 1.9, size: 0.022, speed: 0.0004, color: "#d1e7e7" },
            { name: "Нептун", distance: 2.2, size: 0.022, speed: 0.0001, color: "#5b5ddf" }
        ],
        baseMoon: {
            distance: 0.03,
            size: 0.004,
            speed: 0.03,
            color: "#cccccc"
        },
        init() {
            this.ctx = this.canvas.getContext('2d');
            this.setupSystem();
            this.createStars();
            this.createPlanets();
            this.setupControls();
            this.startAnimation();
            window.addEventListener('resize', () => this.handleResize());
        },
        setupSystem() {
            const maxOrbit = Math.max(...this.planetData.map(p => p.distance)) * 1.1;
            const neededDiameter = maxOrbit * 2 * this.baseSize;
            const containerWidth = this.container.clientWidth;
            const containerHeight = this.container.clientHeight;
            const availableSize = Math.min(containerWidth, containerHeight);
            this.scale = Math.min(1, availableSize / neededDiameter);
            this.center = {
                x: containerWidth / 2,
                y: containerHeight / 2
            };
            this.canvas.width = containerWidth;
            this.canvas.height = containerHeight;
        },
        createStars() {
            const starCount = Math.floor((this.canvas.width * this.canvas.height) / 200);
            this.stars = Array.from({ length: starCount }, () => ({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5,
                alpha: 0.1 + Math.random() * 0.7,
                blinkSpeed: 0.5 + Math.random() * 2
            }));
        },
        createPlanets() {
            const minVisibleSize = 4;
            this.planets = this.planetData.map(planet => {
                const size = Math.max(
                    minVisibleSize,
                    planet.size * this.baseSize * this.scale
                );
                return {
                    ...planet,
                    baseDistance: planet.distance * this.baseSize * 0.5,
                    baseSize: planet.size * this.baseSize,
                    size: size,
                    distance: planet.distance * this.baseSize * 0.5,
                    angle: Math.random() * Math.PI * 2,
                    x: 0,
                    y: 0
                };
            });
        },
        drawRings(x, y, planetSize) {
            this.ctx.save();
            this.ctx.translate(x, y);
            const ringSize = planetSize * 2;
            const ringWidth = planetSize * 0.6;
            const gradient = this.ctx.createLinearGradient(-ringSize, 0, ringSize, 0);
            gradient.addColorStop(0, 'rgba(210,180,140,0.8)');
            gradient.addColorStop(0.5, 'rgba(255,255,255,0.9)');
            gradient.addColorStop(1, 'rgba(210,180,140,0.8)');
            this.ctx.beginPath();
            this.ctx.ellipse(0, 0, ringSize, ringWidth, 0, 0, Math.PI * 2);
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = ringWidth * 0.5;
            this.ctx.stroke();
            this.ctx.restore();
        },
        getMoon(planet) {
            const moonSize = planet.moonSize || this.baseMoon.size;
            return {
                ...this.baseMoon,
                size: Math.max(2, moonSize * this.baseSize * this.scale * this.zoomLevel),
                distance: (this.baseMoon.distance * this.baseSize + planet.size) * this.scale * this.zoomLevel
            };
        },
        handleResize() {
            this.setupSystem();
            this.createStars();
            this.updatePlanetSizes();
        },
        updatePlanetSizes() {
            const minVisibleSize = 4;
            this.planets.forEach(planet => {
                planet.size = Math.max(
                    minVisibleSize,
                    planet.baseSize * this.scale * this.zoomLevel
                );
                planet.distance = planet.baseDistance * this.scale * this.zoomLevel;
            });
        },
        setupControls() {
            this.canvas.addEventListener('wheel', (e) => {
                e.preventDefault();
                const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
                this.zoomLevel = Math.max(
                    this.minZoom,
                    Math.min(this.maxZoom, this.zoomLevel * zoomFactor)
                );
                this.updatePlanetSizes();
            });
            if (document.getElementById('zoomIn')) {
                document.getElementById('zoomIn').addEventListener('click', () => {
                    this.zoomLevel = Math.min(this.maxZoom, this.zoomLevel * 1.2);
                    this.updatePlanetSizes();
                });
            }
            if (document.getElementById('zoomOut')) {
                document.getElementById('zoomOut').addEventListener('click', () => {
                    this.zoomLevel = Math.max(this.minZoom, this.zoomLevel * 0.8);
                    this.updatePlanetSizes();
                });
            }
            if (document.getElementById('resetZoom')) {
                document.getElementById('resetZoom').addEventListener('click', () => {
                    this.zoomLevel = 1;
                    this.updatePlanetSizes();
                });
            }
        },
        startAnimation() {
            const animate = (timestamp) => {
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                this.stars.forEach(star => {
                    const blink = Math.abs(Math.sin(timestamp * 0.001 * star.blinkSpeed));
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * (0.5 + blink * 0.5)})`;
                    this.ctx.beginPath();
                    this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                    this.ctx.fill();
                });
                const sunGradient = this.ctx.createRadialGradient(
                    this.center.x, this.center.y, 0,
                    this.center.x, this.center.y, 50 * this.scale * this.zoomLevel
                );
                sunGradient.addColorStop(0, '#ffff00');
                sunGradient.addColorStop(0.7, '#ff9900');
                sunGradient.addColorStop(1, '#ff6600');
                this.ctx.fillStyle = sunGradient;
                this.ctx.beginPath();
                this.ctx.arc(
                    this.center.x, this.center.y,
                    40 * this.scale * this.zoomLevel,
                    0, Math.PI * 2
                );
                this.ctx.fill();
                this.planets.forEach(planet => {
                    planet.angle += planet.speed * this.rotationSpeed;
                    planet.x = this.center.x + Math.cos(planet.angle) * planet.distance;
                    planet.y = this.center.y + Math.sin(planet.angle) * planet.distance;
                    if (this.showOrbits) {
                        this.ctx.beginPath();
                        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                        this.ctx.arc(
                            this.center.x, this.center.y,
                            planet.distance,
                            0, Math.PI * 2
                        );
                        this.ctx.stroke();
                    }
                    this.ctx.fillStyle = planet.color;
                    this.ctx.beginPath();
                    this.ctx.arc(planet.x, planet.y, planet.size, 0, Math.PI * 2);
                    this.ctx.fill();
                    if (planet.hasRings) {
                        this.drawRings(planet.x, planet.y, planet.size);
                    }
                    if (planet.hasMoon) {
                        const moon = this.getMoon(planet);
                        const moonAngle = planet.angle * 10;
                        const moonX = planet.x + Math.cos(moonAngle) * moon.distance;
                        const moonY = planet.y + Math.sin(moonAngle) * moon.distance;
                        this.ctx.fillStyle = moon.color;
                        this.ctx.beginPath();
                        this.ctx.arc(moonX, moonY, moon.size, 0, Math.PI * 2);
                        this.ctx.fill();
                    }
                    if (this.showLabels) {
                        this.ctx.fillStyle = 'white';
                        this.ctx.font = `${Math.max(10, 14 * this.scale * this.zoomLevel)}px Arial`;
                        this.ctx.textAlign = 'center';
                        this.ctx.fillText(
                            planet.name,
                            planet.x,
                            planet.y + planet.size + 18 * this.scale * this.zoomLevel
                        );
                    }
                });
                requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }
    };
    SolarSystem.init();
});
