let box = document.querySelector(".box");
let btn = document.querySelector("button");

const speakFunc = (input) => {
    let speakInput = new SpeechSynthesisUtterance(input);
    // speakInput.rate = 1;
    // speakInput.pitch = 1;
    // speakInput.volume = 1;
    speakInput.lang = 'en-IN';
    window.speechSynthesis.speak(speakInput);
}
window.onload = () => {
    // speakFunc("Just For code");
    // greetingFunc();
}

const greetingFunc = () => {
    let date = new Date();
    let hour = date.getHours();
    if (hour >= 0 && hour < 12) {
        speakFunc("good morning sir, how can i help you");
    }
    else if (hour >= 12 && hour < 16) {
        speakFunc("good Afternoon sir, how can i help you");
    } else {
        speakFunc("good evening sir, how can i help you");
    }
}

const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {

        let recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onresult = (e) => {
            let spokenText = e.results[0][0].transcript;
            handleCommands(spokenText.toLowerCase());
            box.classList.remove('btn-box');
            btn.innerHTML = `<i class="fa-solid fa-microphone-lines-slash"></i>`;
        }
        recognition.start();
    } else {
        alert("Your browser doesn't support voice input !");
    }
}

btn.onclick = () => {
    box.classList.add('btn-box');
    btn.innerHTML = `<i class="fa-solid fa-microphone-lines"></i>`;
    startVoiceInput();
}

const handleCommands = (command) => {
    console.log(command);
    if (command.includes("hello") || command.includes("hey")) {
        speakFunc("Hello sir, how can i help you !");
    }
    else if (command.includes("who are you") || command.includes("developed") || command.includes("hu r u")) {
        speakFunc("I am Virtual Asistance, Developed by Abhash Singh !");
    }

    else if (command.includes("Open Youtube") || command.includes("youtube")) {
        speakFunc("Opening... Youtube");
        window.open("https://www.youtube.com");
    }
    else if (command.includes("Open instagram") || command.includes("instagram")) {
        speakFunc("Opening... instagram");
        window.open("https://www.instagram.com");
    }
    else if (command.includes("Open facebook") || command.includes("facebook")) {
        speakFunc("Opening... facebook");
        window.open("https://www.facebook.com");
    }
    else if (command.includes("Open whatsapp") || command.includes("whatsapp")) {
        speakFunc("Opening... Whatsapp");
        window.open("https://www.whatsapp.com");
    }
    else if (command.includes("tell me time") || command.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: 'numeric', minute: 'numeric' });
        speakFunc(time);
    }
    else if (command.includes("tell me date") || command.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: 'numeric', month: 'long' });
        speakFunc(date);
    }
    else {
        speakFunc(`This is, What i found on internet regarding ${command}`);
        window.open(`https://www.google.com/search?q=${command}`);
    }

}