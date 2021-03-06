// importing libraries
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); 


//creating an express application
const app = express();
const PORT = 8000;

//models
const user = require("./model/user");


//MongoDB Connection
const database_url =  'mongodb://127.0.0.1:27017/ussd';
mongoose.connect(database_url);
const db = mongoose.connection;

//Checking Database Connection
db.on("error", (err) => {
    console.log(err);
});
db.once("open",() => {
    console.log("Database is running");
});

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req, res) => {
    res.send("Success Message");
})


app.post("/",(req, res) => {
    const {phoneNumber, text, sessionId} = req.body;
    let response;
    let userResponse = text;
    /*
    user.find({}, (err,users)=>{
        console.log(users);
    })*/
//    let checkNumber = user.find({},{"phoneNumber": 1, "nationalID": 1}).limit(1)
    let checkNumber = user.find({},{"phoneNumber": 1}).limit(1);

    user.findOne({
        $or: [{
            phoneNumber: req.body.phoneNumber
        }, {
            phoneNumber: req.body.phoneNumber
        }]
    }).then(user => {
        if (user) {
            if (user.phoneNumber !== req.body.phoneNumber) {
                response = `END Your Are Not Registered`;

            } else {
 /*******************************************  MAIN MENU IMPLEMENTATION ( 1 and 2 levels)  ****************************************/       
        // Main Menu
        if (userResponse === "") {
            // This is the first request. Note how we start the response with CON
            response = `CON Waste Management System
                Choose Your Desired Option
                1. Request Trash Collection
                2. Report Illegal Damping
                3. Review An Area
                4. Record Sorted Waste
                5. My Account`;
          }
        // Request Trash Collection Menu
        else if (userResponse === "1"){
            // Business logic for first level response
            response = `CON Waste Management System
                Request Trash Collection
                1. Enter the name of Your Area
                2. Choose a phone to make a call
                3. Back`;
        } 

        // Report Illegal Damping Menu
        else if (userResponse === "2"){
            // Business logic second level reponse
            response = `CON Waste Management System
                Report illegal Damping
                1. Enter Area Name
                2. Back`;
        }

        // Review An Area Menu
        else if (text === "3"){
            // Business logic third level reponse
            response = `CON Waste Management System
                Review An Area
                1. Enter the name of Your Area
                2. Choose a phone to make a call
                3. Back`;

        }

        // Record Sorted Waste Menu
        else if (text ==="4"){
            // Business logic fourth level reponse
            response = `CON Waste Management System
                Sorted Waste
                1. Enter name of waste to be recycled or sold
                2. Choose a phone to make a call
                3. Back`;
        }

        // Account Menu
        else if (text === "5"){
            // Business logic for fifth level response
            response = `CON Waste Management System
                Check Account Details
                1. Check Account Details
                2. Change Account Details
                3. Back`;
        }

/*******************************************  END OF MAIN MENU IMPLEMENTATIONS ( 1 and 2 levels)  ****************************************/       

/*******************************************  ACCOUNT DETAILS - ALL SUBMENUS IMPLEMENTATIONS   ****************************************/  
        // Account Menu
        else if (userResponse === "5*1"){
            // Business logic for first level response
            response = `CON Waste Management System
                Check Account Details
                1. Name      :  Rabson Sayenda
                2. Location  :  Blantyre
                3. ID Number :  BHU7888
                4. Back`;
        }

        else if (userResponse === "5*2"){
            // Business logic for second level response
            response = `CON Waste Management System
                Check Account Details
                1. Change Name
                2. Change Location
                3. Change ID Number`;
            
        }
        else if (userResponse === "5*2*1"){
            // Business logic for second level response
            response = `CON Waste Management System
                Change Name
                1. Enter Name`;
            
        }

        else if (userResponse === "5*2*2"){
            // Business logic for second level response
            response = `CON Waste Management System
                Change Name
                1. Enter Location`;
            
        }
        else if (userResponse === "5*2*3"){
            // Business logic for second level response
            response = `CON Waste Management System
                Change Name
                1. Enter ID Number`;
            
        }


/*******************************************  END OF ACCOUNT DETAILS - ALL SUBMENUS IMPLEMENTATIONS  ****************************************/

/*******************************************  REQUEST TRASH COLLECTION MENU - ALL SUBMENUS IMPLEMENTATIONS   ****************************************/  
        // Request Trash Collection Menu
        else if (userResponse === "1*1"){
            // Business logic 
            response = `CON Waste Management System
                 Reuest Trash Collection
                 Enter Plot Number of your area/ Nearest Famous Place`;
        }

        else if (userResponse === "1*2"){
            // Business logic for second level response
            response = `END Waste Management System
                Call Trash Collection
                1. Phone Number 1: 0888 788 122
                2. Phone Number 2: 0999 788 122
                3. Phone Number 3: 0999 888 122
                4. Phone Number 4: 0999 777 122`;
            
        }
        else if (userResponse === "1*1*1"){
            // Business logic for second level response
            response = `CON Waste Management System
                Your Details
                Your Name is        : Mr. Kuyenda
                Your City is        : Junto
                Your Phone number is: 0888888 999

                1. Confirm
                2. Cancel`;
        }
        else if (userResponse === "1*1*1*1"){
            // Business logic for second level response
            response = `END Waste Management System
                        Your request has been sent successfully`;
        }


/*******************************************  END REQUEST TRASH - ALL SUBMENUS IMPLEMENTATIONS  ****************************************/


/*******************************************  REPORT ILLEGAL DAMPING MENU - ALL SUBMENUS IMPLEMENTATIONS   ****************************************/  
        // Report Illegal Damping Menu
        else if (userResponse === "2*1"){
            // Business logic 
            response = `CON Waste Management System
                 Report Illegal Damping
                 Enter Plot Number of your area/ Nearest Famous Place`;
        }

        else if (userResponse === "2*2"){
            // Business logic for second level response
            response = `END Waste Management System
                Report Illegal Damping
                1. Phone Number 1: 0888 788 122
                2. Phone Number 2: 0999 788 122
                3. Phone Number 3: 0999 888 122
                4. Phone Number 4: 0999 777 122`;
            
        }
        else if (userResponse === "2*1*1"){
            // Business logic for second level response
            response = `CON Waste Management System
                Your Details
                Your Name is        : Mr. Kuyenda
                Your City is        : Junto
                Your Phone number is: 0888888 999

                1. Confirm
                2. Cancel`;
        }
        else if (userResponse === "2*1*1*1"){
            // Business logic for second level response
            response = `END Waste Management System
                        Your report has been sent successfully`;
        }


/*******************************************  END REPORT ILLEGAL DAMPING - ALL SUBMENUS IMPLEMENTATIONS  ****************************************/


/*******************************************  REVIEW AN AREA MENU - ALL SUBMENUS IMPLEMENTATIONS   ****************************************/  
        // Report Illegal Damping Menu
        else if (userResponse === "3*1"){
            // Business logic 
            response = `CON Waste Management System
                 Review An Area
                 Give Rating`;
        }

        else if (userResponse === "3*2"){
            // Business logic for second level response
            response = `END Waste Management System
                Review An Area 
                1. Phone Number 1: 0888 788 122
                2. Phone Number 2: 0999 788 122
                3. Phone Number 3: 0999 888 122
                4. Phone Number 4: 0999 777 122`;
            
        }
        else if (userResponse === "3*1*1"){
            // Business logic for second level response
            response = `CON Waste Management System
                Your Details
                Your Name is        : Mr. Kuyenda
                Your City is        : Junto
                Your Phone number is: 0888888 999

                1. Confirm
                2. Cancel`;
        }
        else if (userResponse === "3*1*1*1"){
            // Business logic for second level response
            response = `END Waste Management System
                        Your review has been sent successfully`;
        }
/*******************************************  END REVIEW AN AREA - ALL SUBMENUS IMPLEMENTATIONS  ****************************************/

/*******************************************  RECORD SORTED WASTE - ALL SUBMENUS IMPLEMENTATIONS   ****************************************/  
        // Report Illegal Damping Menu
        else if (userResponse === "3*1"){
            // Business logic 
            response = `CON Waste Management System
                 Sorted Waste
                 Enter Name of the Area`;
        }

        else if (userResponse === "3*2"){
            // Business logic for second level response
            response = `END Waste Management System
                Sorted Waste 
                1. Phone Number 1: 0888 788 122
                2. Phone Number 2: 0999 788 122
                3. Phone Number 3: 0999 888 122
                4. Phone Number 4: 0999 777 122`;
            
        }
        else if (userResponse === "3*1*1"){
            // Business logic for second level response
            response = `CON Waste Management System
                Your Details
                Your Name is        : Mr. Kuyenda
                Your City is        : Junto
                Your Phone number is: 0888888 999

                1. Confirm
                2. Cancel`;
        }
        else if (userResponse === "3*1*1*1"){
            // Business logic for second level response
            response = `END Waste Management System
                        Your report has been sent successfully`;
        }


/*******************************************  END RECORD SORTED - ALL SUBMENUS IMPLEMENTATIONS  ****************************************/

            }
        } else {
            if(text===""){
                response = "CON Your Are Not Registered \n Enter Your Full Name ";
            }
        
            else if(text !==""){
                let array = text.split("*");
                if(array.length === 1){
                    response = "CON Enter Your ID Number";
                }
        
                else if(array.length === 2){
                    response = "CON Enter Your District Name";
                }
        
                else if(array.length === 3){
                   // Id Number
                   if(text !==""){
                       response = "CON  Please Confirm to save the data \n 1. Confirm \n 2. Cancel"; 
                   }
        
                   else{
                       response = "END Network error. Please try again";
                   }
                }
                else if(array.length === 4){ 
                    if(text !== ""){
                        let data = new user();
                        data.username = array[0];
                        data.nationalID = array[1];
                        data.location = array[2];
                        data.phoneNumber = req.body.phoneNumber ;
                        data.save(() => {
                            response = "END You Have Successfully Registered!";
                        })
        
                   }
                    else if(parseInt(array[2])===2){
                        response = "END Cancel, Your data is not saved"; 
                   }
                   else{
                       response = "END Invalid Input";
                   }
                }
                else{
                    response = "End Network error. Please try again";
                }
        
            }
        }
        });
    
    setTimeout(() => {
        console.log(text);
        res.send(response);
        res.end();

    }, 2000);

})
//Checking The Application Port
/*
app.listen(PORT, () => {
    console.log("app is running on port" + PORT);
})
*/

