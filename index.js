document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://services2.arcgis.com/5I7u4SJE1vUr79JC/arcgis/rest/services/UniversityChapters_Public/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';
    const dataDiv = document.getElementById('data-list');
    const listElement = document.getElementById('list');
    const refreshButton = document.getElementById('refresh-button');
    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-form');
    const dataDetails = document.getElementById('data-details');

    // Event listener for the refresh button
    refreshButton.addEventListener('click', () => {
        fetchData(url);
    });

    // Event listener for Search input
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        filterData(searchTerm);
    });

    // Event listener for the form
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchTerm = searchInput.value.toLowerCase();
        filterData(searchTerm);
    });

    // Function to fetch and display the data
    function fetchData(url) {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                displayList(data.features);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    // Display data as a list
    function displayList(features) {
        listElement.innerHTML = '';

        features.forEach((feature) => {
            const attributes = feature.attributes;
            const listItem = document.createElement('li');
            listItem.textContent = attributes.University_Chapter;
            listItem.addEventListener('click', () => displayDetails(attributes));
            listElement.appendChild(listItem);
        });
    }

    // Display data details
    function displayDetails(attributes) {
        dataDetails.innerHTML = JSON.stringify(attributes, null, 2);
    }

    // Filter data based on search term
    function filterData(searchTerm) {
        const listItems = listElement.querySelectorAll('li');

        listItems.forEach((item) => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = 'list-item';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Initial data fetch whenever the page loads
    fetchData(url);
});
