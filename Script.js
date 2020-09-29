

var bpm = "";
$("#bpmSearch").click(function() {
    bpm = $("#bpminput").val();
    console.log($("#bpmSearch").val());
    console.log(bpm);
});
$("#bpmSearch").click(function() {$.ajax({
    url: `https://api.getsongbpm.com/tempo/?api_key=57452074649ab146238866e6411b82b5&bpm=${bpm}`,
    method: "GET"
})
    // After the data comes back from the API
    .then(function (response) {
        // Storing an array of results in the results variable
        var results = response;
        console.log(results);
    })
});
//var results1 = "";
    //$.ajax({
       // url: "https://itunes.apple.com/search?term=jack+johnson",
        //method: "GET"
    //})
    //.then(function(response) {results1 = response;
        //console.log(results1);
    //})





//Variables//


// When the search button is clicked
      //$("id").click(function(){
             //page retuns a new page.
            //retuns songs info in Playlist
                //API Call
                    //....
             // itunes API
                //API Call
                    //...
      //})
   
//


//When song from the paylist is clicked lyrics sections retuns lyrics 
 
        //returns songs lyrics
          //$("id").click(function(){
               //Click event on playlist list items returns lyrics 
               //APi Call
          //})