document.addEventListener('DOMContentLoaded', function() {
    // Load the navbar component
    (function() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'components/navbar.html', true);
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                document.getElementById('navbar-placeholder').innerHTML = this.responseText;

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
                            navbarPopover.classList.add('show');
                        }

                        // Function to hide the popover
                        function hidePopover() {
                            navbarPopover.classList.remove('show');
                        }

                        navbarToggler.addEventListener('click', function(event) {
                            event.stopPropagation(); // Prevent the click from propagating to the window
                            if (!navbarPopover.classList.contains('show')) {
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
});