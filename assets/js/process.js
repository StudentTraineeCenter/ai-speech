/* DOM */
const startRecognizeOnceAsyncButton = document.getElementById(
  "startRecognizeOnceAsyncButton"
);
const subscriptionKey = document.getElementById("subscriptionKey");
const serviceRegion = document.getElementById("serviceRegion");
const phraseDiv = document.getElementById("phraseDiv");

let authorizationToken;
let SpeechSDK;
let recognizer;

document.addEventListener("DOMContentLoaded", () => {
  startRecognizeOnceAsyncButton.addEventListener("click", () => {
    startRecognizeOnceAsyncButton.disabled = true;
    phraseDiv.innerHTML = "";

    // if we got an authorization token, use the token. Otherwise use the provided subscription key
    let speechConfig;
    if (authorizationToken) {
      speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(
        authorizationToken,
        serviceRegion.value
      );
    } else {
      if (
        subscriptionKey.value === "" ||
        subscriptionKey.value === "subscription"
      ) {
        alert("Zadejte klíč!");
        startRecognizeOnceAsyncButton.disabled = false;
        return;
      }
      speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
        subscriptionKey.value,
        serviceRegion.value
      );
    }

    speechConfig.speechRecognitionLanguage = "en-US";
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync(
      (result) => {
        startRecognizeOnceAsyncButton.disabled = false;
        phraseDiv.value = result.privText;

        recognizer.close();
        recognizer = undefined;
      },
      (err) => {
        startRecognizeOnceAsyncButton.disabled = false;
        phraseDiv.value = err;
        console.error(err);

        recognizer.close();
        recognizer = undefined;
      }
    );
  });

  if (!!window.SpeechSDK) {
    SpeechSDK = window.SpeechSDK;
    startRecognizeOnceAsyncButton.disabled = false;

    document.getElementById("content").style.display = "block";
    document.getElementById("warning").style.display = "none";

    // in case we have a function for getting an authorization token, call it.
    if (typeof RequestAuthorizationToken === "function")
      RequestAuthorizationToken();
  }
});