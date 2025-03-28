document.addEventListener('DOMContentLoaded', () => {
    const viewToursButton = document.getElementById('view-tours');
    const addTourButton = document.getElementById('add-tour');
    const tourList = document.getElementById('tour-list');
    const toursSection = document.getElementById('tours');
    const homeSection = document.getElementById('home');
    const baseURL='https://p-iota-two.vercel.app/tours';
    // Array of beautiful image URLs for tours
    const images = [
        './images/safari.jpg',  // Safari
        './images/beach.jpg',  // Beach
        './images/mountain.jpg',  // Mountain
        './images/cityview.jpg',  // City view
        './images/foresthike.jpg',  // Forest hike
        './images/deserttour.jpg',  // Desert tour
        './images/lakeview.jpg',  // Lake view
        './images/islandtour.jpg',  // Island tour
        './images/hiking.jpg',  // Hiking
        './images/culture.jpg',  // culture
        './images/Resort.jpg',  // Resort tour
        './images/pyramids.jpg',  // Pyramids tour
        './images/skiing.jpg',  // Skiing
        './images/cruise.jpg',  // cruise
        './images/adventure.jpg',  // Adventure 
    ];

    // Event listener for viewing tours
    viewToursButton.addEventListener('click', () => {
        homeSection.classList.add('hidden');
        toursSection.classList.remove('hidden');
        fetchTours(); 
    });



    // Event listener for adding a new tour

        addTourButton.addEventListener('click', () => {
            const title = prompt("Enter the new tour name:");
            const price = prompt("Enter the tour price:");
            const description = prompt("Enter a short tour description:");
            const location = prompt("Enter the tour location:");
    
            if (title && price && description && location) {
                createTour(title, price, description, location);
            }
        
    });

    // Fetch Tours (Read Operation)
    function fetchTours() {
        fetch(baseURL)
            .then(response => response.json())
            .then(data => {
                tourList.innerHTML = '';
                data.slice(0, 30).forEach((tour,index) => {
                    const tourCard = document.createElement('div');
                    tourCard.classList.add('tour-card');
                    tourCard.innerHTML = `
                        <img src="${images[index]}" alt="Tour Image" class="tour-image"/>
                        <h3>${tour.title}</h3>
                        <h3>${tour.price}</h3>
                        <p>${tour.description}</p>
                        <h3>${tour.location}</h3>             
                        <button class="book-tour" data-id="${tour.id}">Book</button>
                        <button class="delete-tour" data-id="${tour.id}">Delete</button>
                    `;
                    tourList.appendChild(tourCard);
                });
                addTourEventListeners(); 
            })
            .catch(error => console.error('Error fetching tours:', error));
    }
    // 

    // Create Tour (Create Operation)
    function createTour(title, price, description, location) {
        const newTour = { title, price, description, location };
        fetch(baseURL, {
            method: 'POST',
            body: JSON.stringify(newTour),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(() => {
            alert("New tour added successfully!");
            fetchTours();
        })
        .catch(error => console.error('Error creating tour:', error));
    }

    // Book Tour (Update Operation)
    function bookTour(id) {
        const travelDate = prompt("Enter the travel date (YYYY-MM-DD):");
        if (!travelDate) {
            alert("Travel date is required to book the tour.");
            return;
        }
    
        fetch(`${baseURL}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: "Booked", travelDate }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(() => {
            alert("Tour booked successfully for " + travelDate);
            fetchTours();
        })
        .catch(error => console.error('Error booking tour:', error));
    }
    // Delete Tour (Delete Operation)
    function deleteTour(id) {
        fetch(`${baseURL}/${id}`,{
            method: 'DELETE'
        })
            .then(() => {
                alert("Tour deleted successfully!");
                fetchTours(); 
            })
            .catch(error => console.error('Error deleting tour:', error));
    }

    // Add event listeners for book and delete buttons
    function addTourEventListeners() {
        const bookButtons = document.querySelectorAll('.book-tour');
        const deleteButtons = document.querySelectorAll('.delete-tour');

        bookButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tourId = button.getAttribute('data-id');
                bookTour(tourId);
            });
        }); 

        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tourId = button.getAttribute('data-id');
                if (confirm("Are you sure you want to delete this tour?")) {
                    deleteTour(tourId); 
                }
            });
        });
    }
});
