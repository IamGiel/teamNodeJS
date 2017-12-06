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
  


  
  var count = 0;
  var profiler = function() {
      if (count < 4) {
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
            var list = count;
            var playerList = list + 1;
            var loggedInfo =  "\n================== Player: " + playerList + " ====================" + 
              "\nName: " + answer.Name + "\n" + 
              "Position: " + answer.Position + "\n" +
              "Offense pts: " + answer.Offense + "\n" +
              "Defense pts: " + answer.Defense + "\n";
            fs.appendFile("log.txt", loggedInfo, function (err) {
              if (err) throw err;
              console.log('Saved!');
              profiler();
            }); 
              count++;
              
          });
    }
    else {
        console.log("Profile complete...");
    }
  } 
  profiler();

  // //==========================================

  // // dependency for inquirer npm package
  // var inquirer = require("inquirer");

  // // constructor function used to create programmers objects
  // function Programmer(name, position, age, language) {
  //   this.name = name;
  //   this.position = position;
  //   this.age = age;
  //   this.language = language;
  //   // creates the printInfo method and applies it to all programmer objects
  //   this.printInfo = function() {
  //     console.log("Name: " + this.name + "\nPosition: " + this.position +
  //     "\nAge: " + this.age + "\nLanguages: " + this.language);
  //   };
  // }

  // // runs inquirer and asks the user a series of questions whose replies are
  // // stored within the variable answers inside of the .then statement
  // inquirer.prompt([
  //   {
  //     name: "name",
  //     message: "What is your name?"
  //   }, {
  //     name: "position",
  //     message: "What is your current position?"
  //   }, {
  //     name: "age",
  //     message: "How old are you?"
  //   }, {
  //     name: "language",
  //     message: "What is your favorite programming language?"
  //   }
  // ]).then(function(answers) {
  //   // initializes the variable newGuy to be a programmer object which will take
  //   // in all of the user's answers to the questions above
  //   var newGuy = new Programmer(answers.name, answers.position, answers.age, answers.language);
  //   // printInfo method is run to show that the newguy object was successfully created and filled
  //   newGuy.printInfo();
  // });

