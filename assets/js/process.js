let phraseDiv;
let startRecognizeOnceAsyncButton;

let subscriptionKey, serviceRegion;
let authorizationToken;
let SpeechSDK;
let recognizer;

document.addEventListener("DOMContentLoaded", function () {
  startRecognizeOnceAsyncButton = document.getElementById("startRecognizeOnceAsyncButton");
  subscriptionKey = document.getElementById("subscriptionKey");
  serviceRegion = document.getElementById("serviceRegion");
  phraseDiv = document.getElementById("phraseDiv");

  startRecognizeOnceAsyncButton.addEventListener("click", function () {
    startRecognizeOnceAsyncButton.disabled = true;
    phraseDiv.innerHTML = "";

    // if we got an authorization token, use the token. Otherwise use the provided subscription key
    let speechConfig;
    if (authorizationToken) {
      speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(authorizationToken, serviceRegion.value);
    } else {
      if (subscriptionKey.value === "" || subscriptionKey.value === "subscription") {
        alert("Zadejte klíč!");
        return;
      }
      speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey.value, serviceRegion.value);
    }

    speechConfig.speechRecognitionLanguage = "en-US";
    const audioConfig  = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync(
      function (result) {
        startRecognizeOnceAsyncButton.disabled = false;
        console.log(result.privText);
        phraseDiv.value = result.privText;

        recognizer.close();
        recognizer = undefined;
      },
      function (err) {
        startRecognizeOnceAsyncButton.disabled = false;
        phraseDiv.value = err;
        console.error(err);

        recognizer.close();
        recognizer = undefined;
      });
  });

  if (!!window.SpeechSDK) {
    SpeechSDK = window.SpeechSDK;
    startRecognizeOnceAsyncButton.disabled = false;

    document.getElementById('content').style.display = 'block';
    document.getElementById('warning').style.display = 'none';

    // in case we have a function for getting an authorization token, call it.
    if (typeof RequestAuthorizationToken === "function") {
        RequestAuthorizationToken();
    }
  }
});