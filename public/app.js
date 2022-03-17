const API_URL = "http://localhost:3000";
const IMAGE_SIZES = ["320w", "640w", "1280w", "1920w"];

let vehicles = [];

const init = async () => {
    toggleLoading(true);

    try {
        vehicles = await fetchVehiclesData();

        vehicles.forEach(vehicle => {
            const { id, brand, model, images, bodyType, price, seatCount, transmission } = vehicle;

            const element = document.createElement('vehicle-card');
            element.setAttribute("title", `${brand} ${model}`);
            element.setAttribute("type", bodyType);
            element.setAttribute("image", `${API_URL}${images[0]}`);
            element.setAttribute("price", price);
            element.setAttribute("transmission", transmission);
            element.setAttribute("seats", seatCount);

            element.onclick = () => showVehicle(id);
            document.querySelector("#vehicles").appendChild(element);
        });

        toggleLoading(false);
    } catch(e) {
        console.log(e);

        const element = document.createElement('alert-notification');
        element.setAttribute("type", "error");
        element.textContent = "Er ging iets fout bij het ophalen van de voertuigen. Probeer het opnieuw."

        document.querySelector("#app").appendChild(element);
        toggleLoading(false);
    }
}
window.addEventListener("DOMContentLoaded", init);

const fetchVehiclesData = () => fetch(`${API_URL}/vehicles`)
    .then(res => res.json())
    .then(vehiclesData => vehiclesData);

const showVehicle = (vehicleId) => {
    document.querySelector("#vehicles").classList.add("vehicles-list--hidden");
    const vehicleContainer = document.querySelector("#vehicle");

    const vehicle = vehicles.find(v => v.id === vehicleId);
    const vehicleOverview = document.querySelector("#vehicle");
    vehicleOverview.setAttribute("vehicle", JSON.stringify(vehicle));

    vehicleContainer.classList.remove("vehicle-overview--hidden");
}

const toggleLoading = (state) => {
    const spinner = document.querySelector("loading-spinner");
    spinner.setAttribute("visible", state ? "true" : "false");
}
