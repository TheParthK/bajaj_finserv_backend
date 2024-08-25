document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Load saved theme from localStorage
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        toggle.checked = true;
    } else {
        body.classList.remove('light-mode');
        toggle.checked = false;
    }

    // Toggle theme
    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
});

function sendData() {
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
        outputDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('output').innerText = 'An error occurred. Please check the console for details.';
    });
}
