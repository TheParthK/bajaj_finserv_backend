document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;
    const filterSelect = document.getElementById('filter');

    // Theme toggle logic
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        toggle.checked = true;
    } else {
        body.classList.remove('light-mode');
        toggle.checked = false;
    }

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Filter handling
    filterSelect.addEventListener('change', () => {
        const selectedFilter = filterSelect.value;
        sendData(selectedFilter); // Pass the filter value to sendData
    });
});

function sendData(filter) {
    const dataInput = document.getElementById('data').value;
    const dataArray = dataInput.split(',').map(item => item.trim());

    const payload = {
        data: dataArray
    };

    fetch('https://bajaj-finserv-backend-wn08.onrender.com/bfhl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
        const outputDiv = document.getElementById('output');
        let filteredData;

        if (filter === "numbers") {
            // filteredData = {
            //     numbers: data.numbers.filter(item => !isNaN(item)), // Filter numbers only using isNaN
            // };
            filteredData = data.numbers.filter(item => !isNaN(item)); // Filter numbers only using isNaN
        } else if (filter === "alphabets") {
            // filteredData = {
            //     alphabets: data.alphabets.filter(item => item.match(/^[a-zA-Z]+$/)), // Filter alphabets only using regex
            // };
            filteredData = data.alphabets.filter(item => item.match(/^[a-zA-Z]+$/));
            
        } 
        else if (filter === "high") {
            // filteredData = {
            //     highest_lowercase_alphabet: data.highest_lowercase_alphabet, // Filter alphabets only using regex
            // };
            filteredData = data.highest_lowercase_alphabet
        } 
        else {
            filteredData = data; // Display all data if filter is "all"
        }

        outputDiv.innerHTML = '<pre>' + JSON.stringify(filteredData, null, 2) + '</pre>';
    })
    
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('output').innerText = 'An error occurred. Please check the console for details.';
    });
    const filteredOutputDiv = document.getElementById('filtered-output');
    const numbersOutputDiv = document.getElementById('numbers-output');
    const alphabetsOutputDiv = document.getElementById('alphabets-output');
    const highestLowercaseAlphabetOutputDiv = document.getElementById('highest-lowercase-alphabet-output');



    // Display the filtered output
    // filteredOutputDiv.style.display = 'block';
    // numbersOutputDiv.innerHTML = '<pre>' + JSON.stringify(extractedOutput.numbers, null, 2) + '</pre>';
    // alphabetsOutputDiv.innerHTML = '<pre>' + JSON.stringify(extractedOutput.alphabets, null, 2) + '</pre>';
    // highestLowercaseAlphabetOutputDiv.innerHTML = '<pre>' + JSON.stringify(extractedOutput.highest_lowercase_alphabet, null, 2) + '</pre>';
}