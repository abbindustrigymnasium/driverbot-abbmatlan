# Driverbot styrbas
[Länk till Styrbasen på AWS](http://robodriver.s3.amazonaws.com/index.html)

## Vad ingår
Dessa komponenter ingår i denna robotstyrbas

### App.vue
I App.vue binds alla komponenter ihop men även en dialogruta finns att klicka upp för att ställa in vilken MQTT broker man ska ansluta till.

### Buttons.vue
I Buttons.vue finns en enklare styrmöjlighet för att skicka kommandon för fram, bak, vänster och höger till mqtt.
MQTT topicen jag döpt min till heter drive, så antingen döper du din till samma eller så byter du bara namn i koden.
Det finns fyra knappar för att reglera hastighet.
### Buttonsv2.vue
I Buttonsv2.vue finns en mer avancerad styrmöjlighet för att skicka kommandon för fram, bak, vänster och höger, snett upp  och snett ner till mqtt.
MQTT topicen jag döpt min till heter drive, så antingen döper du din till samma eller så byter du bara namn i koden.
Det finns fyra knappar för att reglera hastighet.

### Logger.vue
En Komponent som loggar vilka kommandon som skickas över MQTT, vill du själv förbättra den så kan du göra att den läser av kommandon som även mikrokontrolllen skickar.

### store.js
Här sparas alla viktiga variabler som skickas mellan komponenterna.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
