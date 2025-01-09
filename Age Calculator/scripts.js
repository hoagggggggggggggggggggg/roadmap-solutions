document.addEventListener('DOMContentLoaded', function() {
    // Initialize Flatpickr datepicker
    const datePicker = flatpickr("#birthdate", {
        dateFormat: "d/m/Y",
        maxDate: "today",
        allowInput: true,
    });

    // Get DOM elements
    const calculateBtn = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');

    // Calculate age function
    function calculateAge() {
        const birthDate = datePicker.selectedDates[0];
        
        if (!birthDate) {
            resultDiv.textContent = "Please select a valid date";
            return;
        }

        // Convert to Luxon DateTime
        const birth = luxon.DateTime.fromJSDate(birthDate);
        const now = luxon.DateTime.now();

        // Calculate the difference
        const diff = now.diff(birth, ['years', 'months', 'days']).toObject();

        // Format the result
        let result = `You are ${Math.floor(diff.years)} years`;
        if (diff.months > 0) {
            result += ` ${Math.floor(diff.months)} months`;
        }
        if (diff.days > 0) {
            result += ` ${Math.floor(diff.days)} days`;
        }
        result += ' old';

        // Display the result
        resultDiv.textContent = result;
    }

    // Add click event listener to calculate button
    calculateBtn.addEventListener('click', calculateAge);
});

