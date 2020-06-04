# AI Speech
 An Azure AI powered text editor

It uses the [Azure Text Analytics AI module](https://azure.microsoft.com/en-us/services/cognitive-services/text-analytics/) and the [Azure Speech Recognition module](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/quickstarts/speech-to-text-from-microphone?tabs=dotnet%2Cx-android%2Clinux%2Cjava-runtime%2Cwindowsinstall&pivots=programmer-tool-spx)

## Setup
Before anything, make sure you have your Azure keys in creds.js as the variables ```endpoint``` and ```key```

An example creds.js file:
```js
const creds = {
    key: "12a34b56c78d910e", // this will have 32 characters
    endpoint: "https://my-awesome-demo.cognitiveservices.azure.com/"
};

exports.creds = creds;
```

1. clone the repo with ```git clone https://github.com/filiptronicek/ai-speech/```
2. cd in the repo with ```cd ai-speech``` 
3. install the dependencies with ```npm i```
4. start the server with ```npm start```, and you are all set, the app is running on [localhost:5000](http://localhost:5000)