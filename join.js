(function () {
    const DISCORD_INVITE = 'https://discord.gg/5ayHMr8khv';
    const UWO_EMAIL = /^[a-z0-9](?:[a-z0-9._-]{1,62}[a-z0-9])?@uwo\.ca$/i;
    const JOIN_PENDING_KEY = 'wemars_join_pending';

    const form = document.getElementById('join-form');
    const emailInput = document.getElementById('join-email');
    const autoresponseInput = document.getElementById('join-autoresponse');
    const nextInput = document.getElementById('join-next');
    const errorEl = document.getElementById('join-error');
    const successEl = document.getElementById('join-success');
    const successMessageEl = document.getElementById('join-success-message');
    const successEmailEl = document.getElementById('join-success-email');
    const noticeEl = document.getElementById('join-notice');
    const submitBtn = document.getElementById('join-submit');

    if (!form) return;

    function showError(message) {
        if (!errorEl) return;
        errorEl.textContent = message;
        errorEl.hidden = false;
    }

    function showSuccess(email) {
        if (errorEl) errorEl.hidden = true;
        if (successEl) successEl.hidden = false;
        if (form) form.hidden = true;
        if (successMessageEl) {
            successMessageEl.textContent =
                'Check your inbox for the Discord invite link. If you do not see it, check your junk or spam folder.';
        }
        if (successEmailEl && email) {
            successEmailEl.textContent = 'We sent it to ' + email + '.';
        }
    }

    function isUwoEmail(value) {
        return UWO_EMAIL.test(value.trim());
    }

    function clearSentQuery() {
        if (window.history.replaceState) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    function setAutoresponseMessage() {
        if (!autoresponseInput) return;
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

    function setNextUrl() {
        if (!nextInput) return;
        const returnUrl = window.location.href.split('?')[0].split('#')[0];
        if (returnUrl.indexOf('http') === 0) {
            nextInput.value = returnUrl + '?sent=1';
        }
    }

    setAutoresponseMessage();
    setNextUrl();

    if (window.location.search.indexOf('sent=1') !== -1) {
        const pendingEmail = sessionStorage.getItem(JOIN_PENDING_KEY);
        if (pendingEmail && isUwoEmail(pendingEmail)) {
            showSuccess(pendingEmail);
            sessionStorage.removeItem(JOIN_PENDING_KEY);
        } else {
            showError('Something went wrong. Please submit the form again with your @uwo.ca email.');
        }
        clearSentQuery();
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
            showError('Please enter your Western-assigned @uwo.ca email address.');
            emailInput.focus();
            return;
        }

        emailInput.value = email;
        setAutoresponseMessage();
        setNextUrl();
        sessionStorage.setItem(JOIN_PENDING_KEY, email);
        if (errorEl) errorEl.hidden = true;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending…';
        }
    });
})();
