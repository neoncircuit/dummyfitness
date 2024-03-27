let is24HourFormat = false; // Default to 12-hour format

function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    let period = '';
    if (!is24HourFormat) {
        period = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
    }
    hours = String(hours).padStart(2, '0');
    
    const timeZoneOffset = now.getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(timeZoneOffset / 60)).toString().padStart(2, '0');
    const offsetMinutes = (Math.abs(timeZoneOffset) % 60).toString().padStart(2, '0');
    const offsetSign = timeZoneOffset > 0 ? '-' : '+';
    const timeZoneString = `GMT ${offsetSign}${offsetHours}:${offsetMinutes}`;
    
    const timeString = `${hours}:${minutes}:${seconds}${period} ${timeZoneString}`;
    clockElement.textContent = timeString;
}

function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat;
    updateClock(); // Immediately update the clock after toggling the format
}
function updateGreeting() {
    const greetingElement = document.getElementById('greeting');
    const now = new Date();
    const hour = now.getHours();

    let greetingText = '';
    if (hour < 12) {
        greetingText = 'Good morning!';
    } else if (hour < 18) {
        greetingText = 'Good afternoon!';
    } else {
        greetingText = 'Good evening!';
    }
    greetingElement.textContent = greetingText;
}

function showDigitalDate() {
    const digitalDateElement = document.getElementById('digital-date');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);
    digitalDateElement.textContent = dateString;
}

// Update clock and calendar every second
setInterval(updateClock, 1000);
updateClock(); 
updateGreeting(); 
showDigitalDate(); 


