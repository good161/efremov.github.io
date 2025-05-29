const CONFIG = {
    rotationStep: 0.15,
    minScrollDelta: 1,
    sparkDelay: 250
};
let state = {
    lastScrollY: window.scrollY,
    lastRotation: 0,
    scrollTimeout: null
};
function handleScroll() {
    const currentY = window.scrollY;
    const deltaY = currentY - state.lastScrollY;
    if (state.scrollTimeout) clearTimeout(state.scrollTimeout);
    if (Math.abs(deltaY) >= CONFIG.minScrollDelta) {
        state.lastRotation += deltaY * CONFIG.rotationStep;

        document.querySelectorAll('.mechanical-gear').forEach(gear => {
            const direction = gear.id.includes('left') ? 1 : -1;
            gear.style.transform = `rotate(${state.lastRotation * direction}deg)`;
        });
        state.scrollTimeout = setTimeout(createSparks, CONFIG.sparkDelay);
    }
    state.lastScrollY = currentY;
}
function initGears() {
    const gearsContainer = document.createElement('div');
    gearsContainer.className = 'mechanical-gears-container';
    gearsContainer.innerHTML = `
        <div class="mechanical-gears-column mechanical-gears-column--left">
            <div class="mechanical-gear" id="gear-left-top"></div>
            <div class="mechanical-gear" id="gear-left-bottom"></div>
        </div>
        <div class="mechanical-gears-column mechanical-gears-column--right">
            <div class="mechanical-gear" id="gear-right-top"></div>
            <div class="mechanical-gear" id="gear-right-bottom"></div>
        </div>
    `;
    document.body.appendChild(gearsContainer);
}
let isTicking = false;
window.addEventListener('scroll', () => {
    if (!isTicking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            isTicking = false;
        });
        isTicking = true;
    }
});
window.addEventListener('load', () => {
    state.lastScrollY = window.scrollY;
});
document.addEventListener('DOMContentLoaded', initGears);
