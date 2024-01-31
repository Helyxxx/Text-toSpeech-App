
const text = document.querySelector("textarea"),
button = document.querySelector("button"),
voiceList = document.querySelector("select");

let synth = speechSynthesis,
isSpeaking = true;
voices();

//FUNCTIONS

/**
 * Populates droplist for option tag
 */
function voices() {
    for(let voice of synth.getVoices()) {
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name}(${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
};

/**
 * Converts text to speech
 * 
 * @param text takes users text input
 */
function convertTextToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()) {
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
};


//EVENT LISTENER

/**
 * Checks for change in voice type
 */
synth.addEventListener("voiceschanged", voices);

/**
 * Checks if user wants to convert text to speech by button click
 */
button.addEventListener("click", event =>{
    event.preventDefault();

    if(text.value !== ""){
        if(!synth.speaking){
            convertTextToSpeech(text.value);
        }
        if(text.value.length > 80){
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    button.innerText = "Convert To Speech";
                }else{
                }
            }, 500);
        }else{
            button.innerText = "Convert To Speech";
        }
    }
    console.log("button")
});

