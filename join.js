(function () {
    const DISCORD_INVITE = 'https://discord.gg/5ayHMr8khv';
    const UWO_EMAIL = /^[a-zA-Z0-9._%+-]+@uwo\.ca$/i;

    const form = document.getElementById('join-form');
    const emailInput = document.getElementById('join-email');
    const autoresponseInput = document.getElementById('join-autoresponse');
    const nextInput = document.getElementById('join-next');
    const errorEl = document.getElementById('join-error');
    const successEl = document.getElementById('join-success');
    const noticeEl = document.getElementById('join-notice');
    const submitBtn = document.getElementById('join-submit');

    if (!form) return;

    function showError(message) {
        if (!errorEl) return;
        errorEl.textContent = message;
        errorEl.hidden = false;
    }

    function showSuccess() {
        if (errorEl) errorEl.hidden = true;
        if (successEl) successEl.hidden = false;
        if (form) form.hidden = true;
    }

    function isUwoEmail(value) {
        return UWO_EMAIL.test(value.trim());
    }

    if (autoresponseInput) {
        autoresponseInput.value = [
            'Hi,',
            '',
            'Thanks for your interest in WEMARS! Join our Discord server here:',
            '',
            DISCORD_INVITE,
            '',
            'See you in the server!',
            'WEMARS Team',
        ].join('\n');
    }

    if (nextInput) {
        const returnUrl = window.location.href.split('?')[0].split('#')[0];
        nextInput.value = returnUrl + '?sent=1';
    }

    if (window.location.search.indexOf('sent=1') !== -1) {
        showSuccess();
        if (window.history.replaceState) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    if (window.location.protocol === 'file:') {
        if (noticeEl) noticeEl.hidden = false;
        if (submitBtn) submitBtn.disabled = true;
        return;
    }

    form.addEventListener('submit', function (event) {
        const email = emailInput.value.trim().toLowerCase();

        if (!isUwoEmail(email)) {
            event.preventDefault();
            showError('Please use your Western email (name@uwo.ca).');
            emailInput.focus();
            return;
        }

        emailInput.value = email;
        if (errorEl) errorEl.hidden = true;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending…';
        }
    });
})();
