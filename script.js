const textArea = document.querySelector(".row textarea"),
speechButton = document.querySelector(".btn"),
voiceList = document.querySelector(".outer select");
let synth = speechSynthesis;
let isSpecking = true;
voices();

function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "" ;
        let option = `<option value = "${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices)

function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utternance.voice = voice;
        }
    }
    synth.speak(utternance);

};

speechButton.addEventListener("click", e =>{
    e.preventDefault();

    if (textArea.value !== "") {
        if(!synth.speaking){
            textToSpeech(textArea.value); 
        }
        if(textArea.value.length > 80){
            if(isSpecking){
                synth.resume();
                isSpecking = false;
                speechButton.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpecking = true; 
                speechButton.innerText = "Resume Speech";
            }
            
            setInterval(() => {
                if(!synth.speaking &&  !isSpecking ){
                    isSpecking = true;
                    speechButton.innerText = "Convert To Speech"; 
                }
            });
        }else{
            speechButton.innerText = "Convert To Speech"; 
        }
    }  
});