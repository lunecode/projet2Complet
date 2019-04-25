const express = require("express");
const morgan = require("morgan");
const moment = require('moment');
const bodyyParser = require('body-parser')

require('dotenv').config();

// SERVER PORT
const PORT = process.env.PORT || 3031;

const app = express();

// Call in Twitter package
const Twitter = require("twitter");

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  bearer_token: process.env.BEARER_TOKEN
});

//  Train lines
const lignesRATP = [];
const lignesSNCF = ["LigneH_SNCF", "LigneJ_SNCF", "LigneL_SNCF", "LigneP_SNCF", "LigneR_SNCF", "lignesNetU_SNCF", "RERC_SNCF", "RERD_SNCF", "RERE_SNCF"];

//  Adding names in RATP list
//  [METRO]
for (let i = 1; i <= 13; i++) {
  lignesRATP.push("Ligne" + i + "_RATP");
}
//  [RER RATP] 
lignesRATP.push("RER_A", "RERB");

//  [TRAM RATP]
for (let i = 1; i <= 8; i++) {
  if (i === 3) {
    lignesRATP.push("T3a" + "_RATP");
  } else if (i === 4) {
    lignesRATP.push("T3b" + "_RATP");
  } else {
    lignesRATP.push("T" + i + "_RATP");
  }
}

// Join lists of both RATP and SNCF lines 
const allLines = [ ...lignesRATP, ...lignesSNCF];

// Variable storing result of api request
let result =  [];

for (let i = 0; i < allLines.length; i++) {
  // Set parameters to get from Twitter API
  let params = {
    screen_name: allLines[i],
    exclude_replies: "true",
    tweet_mode: "extended"
  };
  // Get tweets from the user timeline
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      // result.push(
        tweets.filter(
          tweet => (tweet.full_text.match(/ralenti|interrompu|perturbé/i)) 
            && !( (tweet.full_text.match(/fin des ralentissements|fin de l'incident|travaux|hier/i)) )
            && moment(new Date(tweet.created_at)).isAfter(moment().subtract(3, 'hours'))
        ).map(tweet => {

          // Formating time with Moment.js
          const formatedTime = moment(new Date(tweet.created_at)).locale('fr').format('LT')
          const timeFromNow = moment(new Date(tweet.created_at)).locale('fr').fromNow()

          // Matching text function
          const matchText = (regex) => tweet.full_text.match(regex);

          // Compare time of objects
          const compare = (a,b) => {
            if (a.time > b.time)
              return -1;
            if (a.time < b.time)
              return 1;
            return 0;
          }

          // Get issue in tweet string
          let issue = "";
          
          if (matchText(/ralenti/i)) {
            issue = "un ralentissement"
          } else if (matchText(/interrompu/i)) {
            issue = "une interruption du traffic"
          } else if (matchText(/perturbé/i)) {
            issue = "des perturbations"
          }

          // Get cause of issue in tweet string
          let cause = "";
          
          if (matchText(/bagage/i)) {
            cause = "d'un bagage oublié"
          } else if (matchText(/signalisation/i)) {
            cause = "d'une panne de signalisation"
          } else if (matchText(/panne/i)) {
            cause = "d'une panne de train"
          } else if (matchText(/sécurité/i)) {
            cause = "de mesures de sécurité"
          } else if (matchText(/malaise/i)) {
            cause = "d'un malaise voyageur"
          } else if (matchText(/accident grave de personne|accident de personne|incident voyageur/i)) {
            cause = "d'un suicide sur la voie"
          } else if (matchText(/personne sur les voies|personnes sur les voies/i)) {
            cause = "de personnes sur les voies"
          } else if (matchText(/incident technique/i)) {
            cause = "d'un incident technique"
          } else {
            cause = "d'un incident"
          }
          
          // Return an object with custom propreties from twitter API
          result.push(
            {
              time: formatedTime,
              last_time: timeFromNow,
              line: {
                    name: tweet.user.name,
                    image: tweet.user.profile_image_url
              },
              text: tweet.full_text,
              issue: issue,
              cause: cause
            }
          )

          // Sort all problem objects from the most recent
          result.sort(compare) 
            console.log(tweet)
        })
    } else {
      throw error;
    }
  });

}

app.use(morgan("dev"));

app.use(bodyyParser.json());

app.get("/api/transport", (req, res) => {
    res.json(result);
});

let server = app.listen(PORT, () => {
  console.log("listening port", server.address().port);
});

// https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=rerd_sncf&exclude_replies=true
