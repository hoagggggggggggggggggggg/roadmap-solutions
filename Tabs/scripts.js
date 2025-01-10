// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select all elements needed for tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Function to handle tab switching
    function switchTab(event) {
        // Get the clicked button
        const clickedButton = event.target;
        
        // Get the tab number from data attribute
        const tabId = clickedButton.dataset.tab;

        // Remove active class from all buttons and panes
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });

        // Add active class to clicked button and corresponding pane
        clickedButton.classList.add('active');
        document.querySelector(`.tab-pane[data-content="${tabId}"]`).classList.add('active');
    }

    // Add click event listener to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', switchTab);
    });
});