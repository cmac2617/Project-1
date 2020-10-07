//put all of this in $(document).on("ready.......")
var bpm = localStorage.getItem("bpmStringified");
var artistList = [];
var playList = [];
var bpmList = [];
console.log(bpm);
$.ajax({
  url: "https://api.getsongbpm.com/tempo/?api_key=328b19bb2055fb8c628bfe2d7d83508d&bpm=" + bpm,
  method: "GET",
  async: false
})
  // After the data comes back from the API
  .then(function (response) {
      // Storing an array of results in the results variable
      response = JSON.parse(response);
      var i = 0;
      console.log(response);
      for (i = 0; i < 10; i++) {
          var songTitle = $("<li>").text(response.tempo[i].song_title + " by " + response.tempo[i].artist.name);
          songTitle.attr({class: "lyricLink", id: i});
        $("#box1").append(songTitle);
    //    .then(function (response) {
    //         response = JSON.parse(response).results;
    //         var match;
    //         for (var i = 0; i < response.length; i++) {
    //             if (response[i].artistName === song.artist) {
    //                 match = response[i];
    //                 break;
    //             }
    //         }
    //         console.log(match)
    //     })
    //     .catch(function (err) {
    //         console.log(err)
    //     })
          artistList.push(response.tempo[i].artist.name);
          playList.push(response.tempo[i].song_title);
          bpmList.push(response.tempo[i].tempo);
      }
      console.log(artistList);
      console.log(playList);
      console.log(bpmList);
  var links = setInterval(function () {
    if (artistList.length >= 10) {
        
        for (b = 0; b < 10; b++) {
            $.ajax({
                url: "https://itunes.apple.com/search?term=" + artistList[b] + "&media=music",
                method: "GET",
                async: false
            })
                .then(function (responser) {
                    console.log(responser);
                    console.log(responser.results[b].artistViewUrl)
                    // var artistLink = $("<li>").text(response.results[i].artistViewUrl);
                    var newArtist = $("<li>");
                    // newArtist.attr("class", "newLink");
                    var artistLink = $("<a>").text(responser.results[b].artistName);
                    artistLink.attr("href", responser.results[b].artistViewUrl);
        $("#box2").append(newArtist);
        $(newArtist).append(artistLink);
                })
        }
        clearInterval(links);
    }
}, 2000);
// var lyrics = setInterval(function() {
//     if (playList.length >= 10) {
//         console.log("working");
//         var i = 0;
//         for (i == 0; i < playList.length; i++) {
//             $.ajax({
//                 url: "https://orion.apiseeds.com/api/music/lyric/" + artistList[i] + "/" + playList[i] + "?apikey=jHfKMGQkqpG8PUmPiWEAMXUg5h10bEhKI6cduUVaS5qr0Ap5LwRCFe1zAMpQK1Eg ",
//                 method: "GET",
//                 async: false
//             })
//                 .then(function (response) {
//                     var newLyrics = $("<p>").text(response.result.track.text);
//                     $("#box3").append(newLyrics);
//                 })
//         }
//         clearInterval(lyrics);
//         }
// }, 2000);








})


// $(document).on('click', '.lyricLink', function(){
//     console.log("You clicked a song.");
// });
// $(document).on('mouseover', '.lyricLink', function(){
//     $('.lyricLink').css('cursor', 'pointer');
// });







$(document).on('click', '.lyricLink', function(){
    console.log("You clicked a song.");
    var x = $(this).attr("id");
    console.log(x);
    
        $.ajax({
            url: "https://orion.apiseeds.com/api/music/lyric/" + artistList[x] + "/" + playList[x] + "?apikey=jHfKMGQkqpG8PUmPiWEAMXUg5h10bEhKI6cduUVaS5qr0Ap5LwRCFe1zAMpQK1Eg ",
            method: "GET"
        })
            .then(function (response) {
                
                // var newLyrics = $("<p>").text(response.result.track.text);
                $("#box3").text(response.result.track.text);
            })

    
    
});

$(document).ajaxError(function(){
    $("#box3").text("Could not obtain lyrics.");
})