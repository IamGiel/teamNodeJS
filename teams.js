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
      if (count < 4) {//number of players
        inquirer.prompt([
            {
             name: "Name",
             message: "Whats the player name?: "
            }, 
            {
             name: "Position",
             message: "Whats the player position?: "
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
            console.log(answer.Name);
            //work-around - list players numerically
            var list = count;
            var playerList = list + 1;
            var loggedInfo =  "\n================== Player: " + playerList + " ====================" + 
              "\nName: " + answer.Name + "\n" + 
              "Position: " + answer.Position + "\n" +
              "Offense pts: " + answer.Offense + "\n" +
              "Defense pts: " + answer.Defense + "\n";
              //here store info in log.txt
            fs.appendFile("log.txt", loggedInfo, function (err) {
              if (err) throw err;
              console.log('Saved!');
              profiler();
            }); 
              count++;//keep asking until max players reached
              
          });
    }
    else {
        console.log("Profile complete...");
    }
  } 
  profiler();

 