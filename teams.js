var inquirer = require("inquirer"); 
var fs = require("fs");

// constructor function 
var Player = function(Name, Position, Offense, Defense) {
  this.Name = Name;
  this.Position = Position;
  this.Offense = Offense;
  this.Defense = Defense;  

   this.printInfo = function() {
    console.log("Name: " + this.Name + 
                "\nPosition: " + this.Position +
                "\nOffense: " + this.Offense + 
                "\nDefense: " + this.Defense);
  }
   this.goodGame = function() {
    var randomize = Math.floor(Math.random() * (1)) + 0;
    console.log(randomize);
    if (randomize === 0) {
      console.log("goodGame");
      Offense++;
    } else if (randomize === 0) {
            console.log("goodGame");
            Defense++;
      }
    }
   this.badGame = function() {
    var randomize = Math.floor(Math.random() * (1)) + 0;
    console.log(randomize);
    if (randomize === 1) {
      console.log("not so good");
      Offense--;
    } else if (randomize === 1) {
            console.log("not so good");
            Defense--;
      }
    }
};   
  //here inquire.prompt
  var count = 0;
  var offense = [];
  var defense = [];
  var totalOffense;
  var totalDefense;
  var profiler = function() {
      if (count < 8) {//number of players
        inquirer.prompt([
            {
             name: "Name",
             message: "Whats the player name? "
            }, 
            {
             name: "Position",
             message: "Whats the player position? "
            },
            {
             name: "Offense",
             message: "Whats the players offensive points"
            },
            {
             name: "Defense",
             message: "Whats the players defensive points"
            }
          ]).then(function(answer) {
            var newPlayer = new Player(answer.Name, answer.Position, answer.Offense, answer.Defense);
            var starters = [];
            var subs = [];
            //work-around - list players numerically
            var list = count;
            var nthPlayers = list + 1;
            var loggedInfo =  "\n================== Player: " + nthPlayers + " ====================" + 
              "\nName: " + answer.Name + 
              "\nPosition: " + answer.Position + 
              "\nOffense pts: " + answer.Offense +
              "\nDefense pts: " + answer.Defense;
              // here store info in log.txt
            fs.appendFile("log.txt", loggedInfo, function (err) {
              if (err) throw err; 
            }); 
            count++;//keep asking until max players reached

              if (count < 6){
                //push offense stat to offense array and total it
                offense.push(parseInt(answer.Offense));
                totalOffense = offense.reduce((a, b) => a + b, 0); 
                //push defense stat to defense array and total it
                defense.push(parseInt(answer.Defense));
                totalDefense = defense.reduce((a, b) => a + b, 0); 
                //push player info to starters array
                starters.push(newPlayer);
                console.log("Starter: ");
                //write to log.txt
                fs.appendFile("log.txt", "\nStarter\n\n===== STATS: ===== \nStarters Total Offensive Points: " + totalOffense + "\n" + "Starters Total Defensive Points: " + totalDefense + "\n", function (err) {
                  if (err) throw err;
                  // console.log('Saved!');
                }); 
              }
              else if (count >= 6 && count <= 8) {
                //push player info to subs array
                subs.push(newPlayer)
                console.log("Sub: ");
                fs.appendFile("log.txt", "\nsub", function (err) {
                  if (err) throw err;
                  // console.log('Saved!');
                });
              }
              profiler();
          });
      }
      else {
        //total sum of offense stats
        console.log("Starters Total Offense: " + totalOffense);
        console.log("Starters Total Defense: " + totalDefense);
        console.log("Profile complete...\n Check LOG.TXT");
      }
  }

  //scoring function
  var gameScore = function(){
    console.log("GAME SCORE CALLED!!!");
    console.log("OFFENSE CALLED: " + totalOffense);
    if (scoreA < totalOffense) {
      teamScore++;
      console.log(teamScore);
    }
    if (scoreB > totalDefense){
      teamScore--;
      console.log(teamScore);
    }
  }

  //play game function
  var teamScore = 0;
  var numOfGames = 0;
  a_scoreArr = [];
  b_scoreArr = [];

  var playGame = function(){
    // console.log("Heres the generated scores: \n" + teamScore);
    if (numOfGames < 5) {
      var listNum = numOfGames + 1;
      var scoreA = Math.floor(Math.random() * (21) + 1);
      var scoreB = Math.floor(Math.random() * (21) + 1);
      // console.log("this is score: " + scoreA);
      // console.log("this is score: " + scoreB);
      a_scoreArr.push(scoreA);
      b_scoreArr.push(scoreB);
      fs.appendFile("log.txt", "\n===============" + "GAME "+ listNum + " COMMENCED" + "=================\nSCORE A: " + scoreA + "\n" + "SCORE B: " + scoreB + "\n", function (err) {
        if (err) throw err;
        // console.log('Saved!');
      });
      
      //increment numOfGame
      numOfGames++; 
      playGame();
    } 
    else {
    console.log("\nGame complete!");
    gameScore(); 
    //print this to log.txt
      fs.appendFile("log.txt", "\nGame complete! SCORES IN 5 ROUNDS...\n" + 
                    "\nSCORE A: " + a_scoreArr +  
                    "\nSCORE B: "  + b_scoreArr + 
                    "\n========== END ===========\n\n\n", function (err) {
                    if (err) throw err;
      });
    }
  }

  //START LIRI
  var startApp = process.argv[2];
  switch(startApp) {
    case "Lets Play": playGame(); break;
    case "List Players": profiler(); break;
    default : console.log("\n\n=======~~~~~~~======== INSTRUCTION:  ========~~~~~~========= \n\n" + 
                              "\n1. LIST YOUR 8 PLAYERS - HERES HOW:" +   
                              "\n   - TYPE: node teams.js 'List Players'" +
                              "\n   - Populate the data"  + "\n\n" +   
                              "\n        THEN: \n" +
                              "\n2. START GAME: " +  
                              "\n   - TYPE: node teams.js 'Lets Play'"  + "\n\n" +
                              "\n   - DONT FORGET QUOTATIONS!!! \n\n");

    };





















 