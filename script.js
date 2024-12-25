const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");

convertBtn.addEventListener('click', function () {
    const speechSynth = window.speechSynthesis;
    const enteredText = text.value;
    const error = document.querySelector('.error-para');

    if (!enteredText.trim().length) {
        error.textContent = `Nothing to Convert! Enter text in the text area.`;
        return;
    }

    error.textContent = ""; // Clear any existing error

    // Get available voices
    const voices = speechSynth.getVoices();
    const indianVoice = voices.find(voice => voice.lang === 'en-IN');

    // Create a new SpeechSynthesisUtterance instance
    const newUtter = new SpeechSynthesisUtterance(enteredText);

    // Set Indian English voice if available
    if (indianVoice) {
        newUtter.voice = indianVoice;
    } else {
        console.warn("Indian English voice (en-IN) not available. Defaulting to another voice.");
    }

    // Set pitch (you can customize this value)
    newUtter.pitch = 1.2; // Higher pitch for example

    // Play the speech
    speechSynth.speak(newUtter);
    convertBtn.textContent = "Sound is Playing...";

    // Reset button text after playback
    newUtter.onend = () => {
        convertBtn.textContent = "Play Converted Sound";
    };
});
