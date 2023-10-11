document.addEventListener(`DOMContentLoaded`, () => {
    const url ="https://gis.ducks.org/datasets/du-university-chapters/api";
    const dataDiv = document.getElementsById("data");
    const refreshButton = document.getElementById("refresh-button");
    const searchInput = doument.getElementById("search-input");

    // Event listener for the refresh button
    refreshButton.addEventListener("click", () => {
        freshData(url);
    });

    // Event listener for Search input
    searchInput.addEventListener("input", () => {
        // filtering data based on the search input
        const searchTerm = searchInput.value.toLowerCase();
        filterData(searchTerm)
    });

    // Event listener for the form
    document.getElementById("search-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const searchTerm = searchInput.value.toLowerCase();
        filterData(searchTerm);
    });

    // function to fetch and display the data
    function fetchData(url){
        fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('HTTP error! Status: ${response.status}');
            }
            return response.json();
        })
        .then((data) => {
            dataDiv.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch((error) => {
            console.error("Fetch error:",error);
        });
    }


    // Filter data and display data based on search term
    function filterData(searchTerm) {

    }
    
    // Initial data fetch whenever the page loads
    fetchData(url);
});
