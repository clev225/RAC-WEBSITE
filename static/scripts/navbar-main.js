document.addEventListener('DOMContentLoaded', function() {
    // Load the navbar component
    (function() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'components/navbar-main.html', true);
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var navbarPlaceholder = document.getElementById('navbar-placeholder');
                navbarPlaceholder.innerHTML = this.responseText;

                // Set active class based on current page
                const currentPage = window.location.pathname.split('/').pop();
                const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

                navLinks.forEach(link => {
                    const linkPage = link.getAttribute('href');
                    if (linkPage === currentPage || 
                        (currentPage === '' && linkPage === 'index.html') ||
                        (currentPage === '/' && linkPage === 'index.html')) {
                        link.classList.add('active');
                        link.style.fontWeight = 'bold';
                    }
                });

                // Load the modal component
                var xhrModal = new XMLHttpRequest();
                xhrModal.open('GET', 'components/modal.html', true);
                xhrModal.onreadystatechange = function() {
                    if (this.readyState === 4 && this.status === 200) {
                        // Create a temporary div to hold the modal content
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = this.responseText;
                        document.body.appendChild(tempDiv);

                        const navbarToggler = document.querySelector('.navbar-toggler');
                        const navbarPopover = document.querySelector('.navbar-popover');
                        const closeBtn = document.querySelector('.close-btn');

                        // Function to show the popover
                        function showPopover() {
                            navbarPopover.style.display = 'flex';
                            requestAnimationFrame(() => {
                                navbarPopover.classList.add('show');
                            });
                        }

                        // Function to hide the popover
                        function hidePopover() {
                            navbarPopover.classList.remove('show');
                            navbarPopover.addEventListener('transitionend', function handler() {
                                navbarPopover.style.display = 'none';
                                navbarPopover.removeEventListener('transitionend', handler);
                            });
                        }

                        // Initially hide the popover
                        navbarPopover.style.display = 'none';

                        navbarToggler.addEventListener('click', function(event) {
                            event.stopPropagation();
                            if (navbarPopover.style.display === 'none') {
                                showPopover();
                            } else {
                                hidePopover();
                            }
                        });

                        // Close the modal when clicking outside of it
                        window.addEventListener('click', function(event) {
                            if (!navbarPopover.contains(event.target) && event.target !== navbarToggler) {
                                hidePopover();
                            }
                        });

                        // Close the modal when clicking the close button
                        closeBtn.addEventListener('click', function() {
                            hidePopover();
                        });
                    }
                };
                xhrModal.send();
            }
        };
        xhr.send();
    })();

    // jQuery alternative method for loading the navbar
    $(function() {
        $("#navbar-placeholder").load("navbar-main.html");
    });
});
