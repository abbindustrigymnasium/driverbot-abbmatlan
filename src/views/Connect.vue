<template>
 <v-container
   full-height
   style="height:75%; "
  >
 <v-container style="display: flex;  align-items: center; align-content: flex-start; flex-direction: column; height: 100%;">        
<v-row> 
  <v-col>
      <v-switch
               @change="send()"
               v-model="Message"
               :label="`On/Off Color`"
               align-center
            
             ></v-switch>
    </v-col>
<v-col style="align-items: end; justify-content: middle; "> 
   </v-col>

    </v-row>
<v-row style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
           <color-picker v-bind="color" @input="onInput" id="copi"></color-picker>
         
         <v-btn @click="uppdatera()" class="mt-5">Choose</v-btn>
             </v-row>
    </v-container>  
  </v-container>
</template>

<script>
import ColorPicker from "@radial-color-picker/vue-color-picker";
var mqtt = require("mqtt");                  //Berättar att man använder MQTT
export default {
  components: { ColorPicker },
  data() {                                   //datan programmet arbetar med
    return {                                 //datan man returnerar vid förändring av sliden
       devices: [],
      Name: "",
      bruh: 0,
      value: 1,
      Message: false,
      client: undefined,
      clientId: "Ahahah",                          //vad klienten heter
      user: "jesper.ribe@abbindustrigymnasium.se",  //MQTT publishern
      pass: "samstalosenordet",                      //lösenordet
      connected: false,
      
      color: {
        //sätter värde allt nedanför "standardFärgen"
        hue: 50, 
        saturation: 100,
        luminosity: 50,
        alpha: 1
      }
    };
  },
  created(){
this.connect()
this.Message= this.$store.getters.Switch[1]      //Den hämtar senaste värdet från switch "0" i store
this.color= this.$store.getters.Color            //Den hämtar senaste värdet från color i store
  },
  methods: {

    onInput(hue) {                                 // input = hue
      this.color.hue = hue;                         // definerar hue 
      
  this.$store.dispatch("setColor",hue) 
    },
    send() { 
      //funktionen för av/på
      console.log(this.Message);                       //this.Message är värdet switchen är på
       this.$store.dispatch("setSwitch",1)
      this.client.publish(
        //skickar 1 respektive 0 till topiceb power2
        "jesper.ribe@abbindustrigymnasium.se/power2",
        this.Message == true ? "1" : "0"
      );
    },
     uppdatera() {
       //funktionen för att uppdatera ljusstyrkan för den vanliga LED-strippen
        console.log(this.aa)                             //console loggar för att veta RGB:n
      var aa = this.HSLToRGB(                            // definerar aa som variabel för konventeringen av HSL till RGB längre ned i koden
        // hämtar värdena för de olika värdena
        this.color.hue,
        this.color.saturation,
        this.color.luminosity,
       
      );
       this.$store.dispatch("setColor",this.color),         // ändrar värdet i store
        
      console.log(aa);
this.client.publish("jesper.ribe@abbindustrigymnasium.se/color",aa.toString());    //skickar aa till topicen color
    },
      
      connect() {
      var mqtt_url = "maqiatto.com";                      //Broker adressen som vi använder
      var url = "mqtt://" + mqtt_url;                       //definerar det som ska vara innan url:n
      var options = {
        port: 8883,                                      //porten för att publisha
        clientId:                                         //genererar ett random clientId för att annars skulle alla få samma
          "mqttjs_" +
          Math.random()
            .toString(16)
            .substr(2, 8),
        username: this.user,                           //användarnamn
        password: this.pass                             //lösenord
      };
      console.log("connecting");                       
      this.client = mqtt.connect(url, options);
      console.log("connected?");                      //frågar om det har connectat

      this.client
        .on("error", function() {
          console.log("no");                        // vid fel consol loggar "no"
        })
        .on("close", function() {
          console.log("no");                        // vid fel consol loggar "no"
        });
      this.connected = true;
      console.log(this.connected);                    //loggar om den har connectat
    },

    HSLToRGB(h,s,l) {
      //en konverter från värdeformatet vi får in i färghjulet till RGB:n som arduino kan läsa av
  // Must be fractions of 1
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;
      if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return "(" + r + "," + g + "," + b + ")";
},
  }
};
</script>

<style>
/* .button {
  height
  color: white;
} */

#lay{
    display: flex;
    align-items: center;
    justify-content: center;
}

#copi{
  width:250px;
  height: 250px;
}

@import "~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css";
</style>
