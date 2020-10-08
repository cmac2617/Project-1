var bpm = "";
var artistList = [];
var playList = [];

// Click event to set and store value from input to local storage.
// Redirect to second page.
$("#bpmSearch").click(function (event) {
    event.preventDefault();
    bpm = $("#bpmInput").val();
    localStorage.setItem("bpmStringified", bpm);
    $(location).attr("href", "results.html");
});