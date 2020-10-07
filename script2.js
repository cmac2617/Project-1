// Declare variables.
var bpm = localStorage.getItem("bpmStringified");
var artistList = [];
var playList = [];

// Give an alert if bpm search is not within acceptable range, and direct to try again.
if (bpm < 40 || bpm > 220) {
    alert("BPM value must be within range 40-220. Click the option to generate a new playlist and try again.")
}

// Run AJAX call to get 10 songs and artists whose songs match the search for BPM.
// Build arrays to store the artists and songs. Use artistList array to run for loop
// through all artists and display on page. Both arrays will also be used in the
// third AJAX call to specify paramaters for the queryURL.
$.ajax({
    url: "https://api.getsongbpm.com/tempo/?api_key=328b19bb2055fb8c628bfe2d7d83508d&bpm=" + bpm,
    method: "GET",
    async: false
})
    .then(function (response) {
        response = JSON.parse(response);
        var i = 0;
        for (i = 0; i < 10; i++) {
            var songTitle = $("<li>").text(response.tempo[i].song_title + " by " + response.tempo[i].artist.name);

            // Specify a "lyricLink" class and indexed id, to be used later when click each song to generate lyrics.
            songTitle.attr({ class: "lyricLink", id: i });

            // Push the song title to the page.
            $("#box1").append(songTitle);

            // Build artistList array and playList array.
            artistList.push(response.tempo[i].artist.name);
            playList.push(response.tempo[i].song_title);
        }

        // Use set interval function to keep checking for artistList array to equal 10.
        // Once it does, generate the artist links to their music pages using the built array and exit.
        var links = setInterval(function () {
            if (artistList.length >= 10) {

                // for loop to run through artistList and place artist's pages on screen.
                for (b = 0; b < 10; b++) {
                    $.ajax({
                        url: "https://itunes.apple.com/search?term=" + artistList[b] + "&media=music",
                        method: "GET",
                        async: false
                    })
                        .then(function (responser) {
                            var newArtist = $("<li>");
                            var artistLink = $("<a>").text(responser.results[b].artistName);
                            artistLink.attr("href", responser.results[b].artistViewUrl);
                            $("#box2").append(newArtist);
                            $(newArtist).append(artistLink);
                        })
                }
                clearInterval(links);
            }
        }, 1000);
    })

// Click funtion to be used for every song in the playlist.
// Generates lyrics to songs at the bottom of the screen.
$(document).on('click', '.lyricLink', function () {

    // Specify variable to use unique id that was applied to the song in the first API call.
    var x = $(this).attr("id");

    // Specify correct artist and song from artistList and playList arrays,
    // based on the unique id.
    $.ajax({
        url: "https://orion.apiseeds.com/api/music/lyric/" + artistList[x] + "/" + playList[x] + "?apikey=jHfKMGQkqpG8PUmPiWEAMXUg5h10bEhKI6cduUVaS5qr0Ap5LwRCFe1zAMpQK1Eg ",
        method: "GET"
    })
        .then(function (response) {

            // Append lyrics to div with id "box3", at the bottom of the page.
            $("#box3").text(response.result.track.text);
        })
});

// If lyrics can't be found for the song, display message.
$(document).ajaxError(function () {
    $("#box3").text("Could not obtain lyrics.");
})