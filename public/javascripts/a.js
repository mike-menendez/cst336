function getOrientation() {
    return $("#orientation").children("option:selected").val();
}

function getQuery() {
    return $("#searchQuery").val().split(" ").join("%20");
}

function getTop(hits) {
    return _.shuffle(hits).slice(0, 4);
}

function displayHits(hits) {
    $("#images").html("");
    hits = getTop(hits);
    for (var i = 0; i < hits.length; i++) {
        url = hits[i].largeImageURL;
        likes = hits[i].likes;
        console.log(url);
        console.log(likes);
        $("#images").append(
            ` <div class="column container card shadow m-1"> 
            <p>Number of likes: ${likes}</p>
        <image src=${url} style="width:100%">
      </div>
    `
        );
    }
}
$("#search").on("click", function() {
    orientation = getOrientation();
    query = getQuery();
    $.ajax({
        method: "GET",
        url: `https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=${query}&orientation=${orientation}&image_type=vector&pretty=true`,
        dataType: "json",
        success: function(result, status) {
            displayHits(result.hits);
        }
    });
});