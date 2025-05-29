const SPARK_CONFIG = {
    sparkSize: 8,
    sparkCount: 7,
    maxJumpHeight: 15,
    sparkDistance: 250,
    fallAngle: 75 * Math.PI/180,
    spreadDistance: 60,
    lightSize: 150,
    lightDuration: 1500,
    sparkOffsetY: 20
};
const COLORS = {
    start: '#FF4500',
    mid1: '#FF8C00',
    mid2: '#FFA500',
    mid3: '#FFC600',
    end: '#FFFF00'
};
function createSparks() {
    const sparksContainer = document.createElement('div');
    sparksContainer.style.position = 'fixed';
    sparksContainer.style.top = '0';
    sparksContainer.style.left = '0';
    sparksContainer.style.width = '100%';
    sparksContainer.style.height = '100%';
    sparksContainer.style.pointerEvents = 'none';
    sparksContainer.style.zIndex = '2000';
    document.body.appendChild(sparksContainer);
    document.querySelectorAll('.mechanical-gear').forEach(gear => {
        const gearRect = gear.getBoundingClientRect();
        const centerX = gearRect.left + gearRect.width / 2;
        const centerY = gearRect.top + gearRect.height / 2 + SPARK_CONFIG.sparkOffsetY;
        const isLeft = gear.id.includes('left');
        for (let i = 0; i < SPARK_CONFIG.sparkCount; i++) {
            const spark = document.createElement('div');
            spark.className = 'mechanical-spark';
            const startX = centerX + (Math.random() * SPARK_CONFIG.spreadDistance * 2 - SPARK_CONFIG.spreadDistance);
            const startY = centerY + (Math.random() * SPARK_CONFIG.spreadDistance - SPARK_CONFIG.spreadDistance/2);
            spark.style.left = `${startX}px`;
            spark.style.top = `${startY}px`;
            spark.style.marginLeft = `-${SPARK_CONFIG.sparkSize/2}px`;
            spark.style.marginTop = `-${SPARK_CONFIG.sparkSize/2}px`;
            const jumpHeight = SPARK_CONFIG.maxJumpHeight * (0.5 + Math.random() * 0.5);
            const duration = 1200 + Math.random() * 800;
            const sizeVariation = 0.8 + Math.random() * 0.4;
            spark.style.width = `${SPARK_CONFIG.sparkSize * sizeVariation}px`;
            spark.style.height = `${SPARK_CONFIG.sparkSize * sizeVariation}px`;
            const direction = isLeft ? 1 : -1;
            const endX = startX + direction * SPARK_CONFIG.sparkDistance * Math.cos(SPARK_CONFIG.fallAngle);
            const endY = startY + SPARK_CONFIG.sparkDistance * Math.sin(SPARK_CONFIG.fallAngle);
            const animationName = `mechanicalSparkAnim_${Date.now()}_${i}`;
            const style = document.createElement('style');
            style.innerHTML = `@keyframes ${animationName} {
                0% { transform: translate(0, 0) scale(1); opacity: 0; background-color: ${COLORS.start}; box-shadow: 0 0 12px 4px ${COLORS.start}; }
                15% { transform: translate(0, -${jumpHeight}px) scale(1.2); opacity: 0.9; }
                30% { transform: translate(0, 0) scale(1); opacity: 1; }
                40% { background-color: ${COLORS.mid1}; box-shadow: 0 0 14px 5px ${COLORS.mid1}; }
                60% { background-color: ${COLORS.mid2}; }
                80% { background-color: ${COLORS.mid3}; box-shadow: 0 0 16px 6px ${COLORS.mid3}; }
                100% { transform: translate(${endX-startX}px, ${endY-startY}px) scale(0.3); opacity: 0; background-color: ${COLORS.end}; box-shadow: 0 0 18px 7px ${COLORS.end}; }
            }`;
            document.head.appendChild(style);
            spark.style.animation = `${animationName} ${duration}ms forwards cubic-bezier(0.3, 0, 0.1, 1)`;
            sparksContainer.appendChild(spark);
            const light = document.createElement('div');
            light.className = 'mechanical-spark-light';
            light.style.left = `${startX}px`;
            light.style.top = `${startY}px`;
            light.style.width = `${SPARK_CONFIG.lightSize}px`;
            light.style.height = `${SPARK_CONFIG.lightSize}px`;
            light.style.opacity = '0';
            const lightAnimName = `mechanicalLightAnim_${Date.now()}_${i}`;
            const lightStyle = document.createElement('style');
            lightStyle.innerHTML = `@keyframes ${lightAnimName} {
                0% { opacity: 0; width: ${SPARK_CONFIG.lightSize}px; height: ${SPARK_CONFIG.lightSize}px; }
                20% { opacity: 0.3; }
                50% { opacity: 0.2; width: ${SPARK_CONFIG.lightSize * 1.5}px; height: ${SPARK_CONFIG.lightSize * 1.5}px; }
                100% { opacity: 0; width: ${SPARK_CONFIG.lightSize * 0.5}px; height: ${SPARK_CONFIG.lightSize * 0.5}px; }
            }`;
            document.head.appendChild(lightStyle);
            light.style.animation = `${lightAnimName} ${SPARK_CONFIG.lightDuration}ms forwards ease-out`;
            document.body.appendChild(light);
            setTimeout(() => {
                spark.remove();
                light.remove();
                style.remove();
                lightStyle.remove();
            }, Math.max(duration, SPARK_CONFIG.lightDuration));
        }
    });
    setTimeout(() => {
        sparksContainer.remove();
    }, 2000);
}
