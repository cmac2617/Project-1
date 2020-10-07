var bpm = "";
var artistList = [];
var playList = [];
var bpmList = [];

// On click event to make first AJAX call to "getsongbpm".
$("#bpmSearch").click(function(event) {
    event.preventDefault();
    bpm = $("#bpmInput").val();
    localStorage.setItem("bpmStringified", bpm);

    
    $(location).attr("href", "results.html");
        
});

// Second AJAX call to get links to iTunes page for each artist.
// Only runs once there are 10 artists to search and then exits.
var links = setInterval(function () {
    if (artistList.length == 10) {
        var i = 0;
        for (i == 0; i < playList.length; i++) {
            $.ajax({
                url: "https://itunes.apple.com/search?term=" + artistList[i],
                method: "GET"
            })
                .then(function (response) {
                    console.log(response.results[i].artistViewUrl)
                })
        }

        clearInterval(links);
    }
}, 1000);

// Third API will get song lyrics.
// Each artist will be on "on click" event to generate lyrics on page.
var artist = "cher";
var songgg = "believe";

$.ajax({
    url: "https://orion.apiseeds.com/api/music/lyric/" + artist + "/" + songgg + "?apikey=jHfKMGQkqpG8PUmPiWEAMXUg5h10bEhKI6cduUVaS5qr0Ap5LwRCFe1zAMpQK1Eg ",
    method: "GET"
})
    .then(function (response) {
        console.log(response);
    })
