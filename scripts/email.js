document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Send the form data using EmailJS
    emailjs.sendForm('service_4iv6o0j', 'template_984lj97', this)
      .then(function() {
        console.log('SUCCESS!');
        alert('Your message has been sent!');
      }, function(error) {
        console.log('FAILED...', error);
        alert('Failed to send the message, please try again later.');
      });
  });