var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('../../client/dist/index.html');
});

router.get('/getIconfig', function(req, res, next){

    res.contentType('application/json');

    var people = {
        "Application": {
            "title": "Ionic App",
            "authors": [
                "Abbas",
                "Abed"
            ],
            "pages": [
                {
                    "hello-ionic": {
                        "title": "Hello World!",
                        "content": [
                            {
                                "title": "Menu",
                                "component": "MenuPage"
                            },
                            {
                                "title": "About us",
                                "component": "AboutUsPage"
                            },
                            {
                                "title": "feedback",
                                "component": "FeedbackPage"
                            }
                        ]
                    }
                },
                {
                    "feedback": {
                        "title": "feedback",
                        "content": [
                            {
                                "input": "Full Name"
                            },
                            {
                                "input": "Email"
                            },
                            {
                                "input": "notes"
                            }
                        ],
                        "buttons": [
                            {
                                "buttonText": "Submit",
                                "value": "submit"
                            },
                            {
                                "buttonText": "Cancel",
                                "value": "cancel"
                            }
                        ]
                    }
                },
                {
                    "menu": {
                        "title": "Menu",
                        "content": [
                            {
                                "name": "Lasagne",
                                "image": "../../assets/images/lasagne.jpg",
                                "description": "Italian Pasta."
                            },
                            {
                                "name": "kebab",
                                "image": "../../assets/images/kebab.jpg",
                                "description": "Turkish grilled meat."
                            },
                            {
                                "name": "humus",
                                "image": "../../assets/images/humus.jpg",
                                "description": "Lebanese cold starter."
                            }
                        ]
                    }
                },
                {
                    "about-us": {
                        "title": "About Us",
                        "content": {
                            "headerText": "Restaurant Name",
                            "image": "../../assets/images/restaurant.jpg",
                            "description": "We are a restaurant in bliss street"
                        }
                    }
                }
            ]
        }
    };

    var peopleJSON = JSON.stringify(people);

    res.send(peopleJSON);


});

router.post('/sendJson', function(req, res, next){
    

  res.send("Changes saved.");

});

module.exports = router;
