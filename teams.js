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
    if (randomize === 0) {
      console.log("not so good");
      Offense--;
    } else if (randomize === 0) {
            console.log("not so good");
            Defense--;
      }
    }
};   
  //here inquire.prompt
  var count = 0;
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
                starters.push(newPlayer);
                console.log("Starter: ");
                fs.appendFile("log.txt", "\nstarter", function (err) {
                  if (err) throw err;
                  // console.log('Saved!');
                }); 
              }
              else if (count >= 6 && count < 8) {
                subs.push(newPlayer)
                console.log("Sub: ");
                fs.appendFile("log.txt", "\nsub", function (err) {
                  if (err) throw err;
                  // console.log('Saved!');
                });
              }
              else if(count === 8) {
                  console.log("\n\n=======INSTRUCTION:  TYPE: 'Lets Play' TO START GAME =========\n\n");
                
              }
              profiler();
          });
    }
      else {
          console.log("Profile complete...");
      }
  }

  //play game function
  var numOfGames = 0;
  var teamScore = 0;
  var playGame = function(){
    // console.log("Heres the generated scores: \n" + teamScore);
    randomScores();  
    if (numOfGames < 5) {
      
      numOfGames++; 
      console.log("ROUND OF PLAY # " + numOfGames);
      fs.appendFile("log.txt", "ROUND OF PLAY # " + numOfGames+"\n=======================", function (err) {
        if (err) throw err;
        // console.log('Saved!');
      });
      playGame();  
    } 
    else { 
    console.log("Game complete..."); 
    }
  }
  //randomizer for scores to compare to player stats offense/defense
  var randomScores = function() {
    var scoreA = Math.floor(Math.random() * (21) + 1);
    console.log(scoreA);
    var scoreB = Math.floor(Math.random() * (21) + 1);
    console.log(scoreB);
      fs.appendFile("log.txt", "\n\n\nSCORE A: " + scoreA + "\n" + "SCORE B: " + scoreB + "\n\n", function (err) {
        if (err) throw err;
        // console.log('Saved!');
      });
  };
  //intiate the playGAme
  var startGame = process.argv[2];
  switch(startGame) {
    case "Lets Play": playGame(); break;
    case "List Players": profiler(); break;
    default : console.log("\n\n=======~~~~~~~======== INSTRUCTION:  ========~~~~~~========= \n\n" + 
                              "\n1. LIST YOUR 8 PLAYERS - HERES HOW:" +   
                              "\n   - TYPE: node teams.js 'List Players'" +
                              "\n   - Populate the data"  + "\n\n" +   
                              "\n        THEN: \n" +
                              "\n2. START GAME: " +  
                              "\n - TYPE: node teams.js 'Lets Play'"  + "\n\n" +
                              "\n - DONT FORGET QUOTATIONS!!! \n\n");

    };





















 