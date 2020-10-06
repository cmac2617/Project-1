var bpm = "";
var artistList = [];
var playList = [];
var bpmList = [];
// On click event to make first AJAX call to "getsongbpm".
$("#bpmSearch").click(function(event) {
    event.preventDefault();
    bpm = $("#bpmInput").val();
    localStorage.setItem("bpmStringified", bpm);
    $(location).attr("href", "RP.html");
    // $.ajax({
    //     url: "https://api.getsongbpm.com/tempo/?api_key=328b19bb2055fb8c628bfe2d7d83508d&bpm=" + bpm,
    //     method: "GET"
    // })
    //     // After the data comes back from the API
    //     .then(function (response) {
    //         // Storing an array of results in the results variable
    //         response = JSON.parse(response);
    //         var i = 0;
    //         for (i = 0; i < 10; i++) {
    //             $("#song-list").append(response.tempo[i].song_title);
    //             artistList.push(response.tempo[i].artist.name);
    //             playList.push(response.tempo[i].song_title);
    //             bpmList.push(response.tempo[i].tempo);
    //         }
    //         console.log(artistList);
    //         console.log(playList);
    //         console.log(bpmList);
    //     })
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