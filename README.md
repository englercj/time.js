Time.js
=======
Date-less Time handler for JavaScript

Purpose
=======
Handle formatting of time values into human readable strings. Can format time values as specific as milliseconds to values as larger as days (no Month support).

Usage
=======
The Time function takes in 1 argument the amount of time in ms to be formatted. It can be used in two different ways:

    var time = new Time(60000); //60000ms or 1 minutes
    time.toString('%m'); //returns a string of this 'time' as a minute

    //OR

    Time.format(60000, '%m'); //does the same thing as above