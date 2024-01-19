// Add custom JS

// script.js
document.addEventListener('DOMContentLoaded', function () {
    function startTypingAnimation() {
        var titleElement = document.querySelector('.hero-title');

        if (titleElement) {
            var text = titleElement.innerText;

            titleElement.innerText = '';

            var charIndex = 0;

            text.split('').forEach(function (char) {
                var charSpan = document.createElement('span');
                charSpan.innerText = char;
                titleElement.appendChild(charSpan);
            });

            var typingInterval = setInterval(function () {
                titleElement.children[charIndex].classList.add('visible');

                if (charIndex < text.length - 1) {
                    charIndex++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 80);
        }
    }

    startTypingAnimation();

    setInterval(startTypingAnimation, 10000); // 10000 milidetik = 10 detik
});