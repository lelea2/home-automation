# home-automation
Home automation with JS

A JavaScript application simulating house automation: pressing a button on a control panel would visually turn on a light, change the temperature or close the curtains. Some constraints:

Image from: https://en.m.wikipedia.org/wiki/File:Little_White_House_floor_plan.svg

Tested on Mac:
* Chrome
* FF

Deployed:

* https://home-automation-khanh.herokuapp.com

#### How to run

**With nodejs server**

```
npm i
PORT=3000 nodemon index.js
//Then run
http://localhost:3000/index.html

```

#### Test case:
* On load, all rooms background should be transparent
* If you turn on the light, and the room has no background filtered, background change to yellow
* If temperature > 70, room background changes to red
* If temperature < 60, room background changes to blue
* Opacity of the room changed based on light and curtain action
