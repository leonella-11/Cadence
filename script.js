document.getElementById('usageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    startSession();
});

document.getElementById('addTime').addEventListener('click', function() {
    addTime();
});

document.getElementById('endSession').addEventListener('click', function() {
    endSession();
});

let countdownInterval;

function startSession() {
    const customerName = document.getElementById('customerName').value;
    const usageTime = parseInt(document.getElementById('usageTime').value);

    document.getElementById('greeting').innerText = `Hello, ${customerName}!`;
    document.getElementById('usageForm').classList.add('hidden');
    document.getElementById('timerSection').classList.remove('hidden');

    let timeRemaining = usageTime * 60 * 60; // Convert hours to seconds
    updateTimeDisplay(timeRemaining);

    countdownInterval = setInterval(() => {
        timeRemaining--;
        updateTimeDisplay(timeRemaining);

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            alert('Time is up!');
            document.getElementById('timerSection').classList.add('hidden');
            document.getElementById('thankYouSection').classList.remove('hidden');
        }
    }, 1000);
}

function updateTimeDisplay(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(secs).padStart(2, '0');
}

function addTime() {
    const additionalTime = parseInt(prompt('Enter additional time in hours:', '1'));
    if (!isNaN(additionalTime) && additionalTime > 0) {
        let currentTime = document.getElementById('hours').innerText * 3600 +
                          document.getElementById('minutes').innerText * 60 +
                          parseInt(document.getElementById('seconds').innerText);
        let totalSeconds = currentTime + additionalTime * 3600;
        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
            totalSeconds--;
            updateTimeDisplay(totalSeconds);

            if (totalSeconds <= 0) {
                clearInterval(countdownInterval);
                alert('Time is up!');
                document.getElementById('timerSection').classList.add('hidden');
                document.getElementById('thankYouSection').classList.remove('hidden');
            }
        }, 1000);
    }
}

function endSession() {
    clearInterval(countdownInterval);
    document.getElementById('timerSection').classList.add('hidden');
    document.getElementById('thankYouSection').classList.remove('hidden');
}
