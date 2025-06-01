const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const solarSystem = document.getElementById('solar-system');
canvas.width = 800;
canvas.height = 800;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const maxOrbitRadius = 350;
const planets = [
    {
        radius: 25,
        distance: 0,
        color: '#ffff00',
        speed: 0
    },
    {
        radius: 4,
        distance: maxOrbitRadius * 0.15,
        color: '#a9a9a9',
        speed: 0.04
    },
    {
        radius: 6,
        distance: maxOrbitRadius * 0.25,
        color: '#e6c229',
        speed: 0.015
    },
    {
        radius: 7,
        distance: maxOrbitRadius * 0.35,
        color: '#1e90ff',
        speed: 0.01,
        satellites: [
            { radius: 2, distance: 15, color: '#dddddd', speed: 0.1 }
        ]
    },
    {
        radius: 5,
        distance: maxOrbitRadius * 0.5,
        color: '#ff4500',
        speed: 0.008
    },
    {
        radius: 14,
        distance: maxOrbitRadius * 0.65,
        color: '#f4a460',
        speed: 0.002
    },
    {
        radius: 12,
        distance: maxOrbitRadius * 0.8,
        color: '#deb887',
        speed: 0.0009,
        hasRings: true
    },
    {
        radius: 9,
        distance: maxOrbitRadius * 0.9,
        color: '#add8e6',
        speed: 0.0004
    },
    {
        radius: 8,
        distance: maxOrbitRadius,
        color: '#1e90ff',
        speed: 0.0001
    }
];
const planetAngles = planets.map(() => Math.random() * Math.PI * 2);
const satelliteAngles = planets.map(p => p.satellites ? [Math.random() * Math.PI * 2] : null);
const stars = Array.from({length: 800}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 1.2,
    opacity: Math.random() * 0.6 + 0.2,
    twinkleSpeed: Math.random() * 0.02 + 0.01
}));
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const time = Date.now();
    stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.strokeStyle = 'rgba(100, 150, 255, 0.1)';
    ctx.lineWidth = 1;
    planets.slice(1).forEach(planet => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.distance, 0, Math.PI * 2);
        ctx.stroke();
    });
    planets.forEach((planet, i) => {
        const planetX = centerX + Math.cos(planetAngles[i]) * planet.distance;
        const planetY = centerY + Math.sin(planetAngles[i]) * planet.distance;
        if (i === 0) {
            const gradient = ctx.createRadialGradient(
                planetX, planetY, 0,
                planetX, planetY, planet.radius
            );
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.7, '#ffff00');
            gradient.addColorStop(1, '#ff9900');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(planetX, planetY, planet.radius, 0, Math.PI * 2);
            const glow = Math.sin(Date.now() * 0.001) * 10 + 20;
            ctx.shadowBlur = glow;
            ctx.shadowColor = '#ff9900';
            ctx.fill();
            ctx.shadowBlur = 0;
        } else {
            ctx.fillStyle = planet.color;
            ctx.beginPath();
            ctx.arc(planetX, planetY, planet.radius, 0, Math.PI * 2);
            ctx.fill();
            if (planet.hasRings) {
                ctx.save();
                ctx.translate(planetX, planetY);
                ctx.rotate(planetAngles[i] * 0.5);
                ctx.fillStyle = 'rgba(210, 180, 140, 0.3)';
                ctx.beginPath();
                ctx.ellipse(0, 0, planet.radius * 1.5, planet.radius * 0.4, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            if (planet.satellites) {
                const satAngle = satelliteAngles[i][0];
                const satX = planetX + Math.cos(satAngle) * planet.satellites[0].distance;
                const satY = planetY + Math.sin(satAngle) * planet.satellites[0].distance;
                ctx.fillStyle = planet.satellites[0].color;
                ctx.beginPath();
                ctx.arc(satX, satY, planet.satellites[0].radius, 0, Math.PI * 2);
                ctx.fill();
                satelliteAngles[i][0] += planet.satellites[0].speed;
            }
        }
        planetAngles[i] += planet.speed;
    });
    requestAnimationFrame(animate);
}
animate();
