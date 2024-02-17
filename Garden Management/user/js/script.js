function search() {
    var query = document.getElementById('searchInput').value;

    // Send the search query to the server
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'search.php?q=' + encodeURIComponent(query), true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            // Display search results
            document.getElementById('searchResults').innerHTML = xhr.responseText;
        } else {
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };

    xhr.send();
}