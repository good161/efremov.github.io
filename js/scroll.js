window.onscroll = function() {
    var scrollToTop = document.getElementById('scrollToTop');
    if (window.pageYOffset > 300) {
        scrollToTop.classList.add('show');
    } else {
        scrollToTop.classList.remove('show');
    }
};
document.getElementById('scrollToTop').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
