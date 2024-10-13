document.addEventListener('DOMContentLoaded', function () {
    const totalCasesElement = document.getElementById('total-cases');
    const totalDeathsElement = document.getElementById('total-deaths');
    const totalRecoveredElement = document.getElementById('total-recovered');
    const globalStatsBtn = document.getElementById('global-stats-btn');
    const countryStatsBtn = document.getElementById('country-stats-btn');
    const countrySearch = document.getElementById('country-search');
    const searchBtn = document.getElementById('search-btn');
    const countryInput = document.getElementById('country-input');

    function fetchGlobalData() {
        fetch('https://disease.sh/v3/covid-19/all')
            .then(response => response.json())
            .then(data => {
                updateStats(data);
            })
            .catch(error => {
                handleError();
                console.error('Error:', error);
            });
    }

    function fetchCountryData(country) {
        fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
            .then(response => response.json())
            .then(data => {
                updateStats(data);
            })
            .catch(error => {
                handleError();
                console.error('Error:', error);
            });
    }

    function updateStats(data) {
        totalCasesElement.textContent = data.cases.toLocaleString();
        totalDeathsElement.textContent = data.deaths.toLocaleString();
        totalRecoveredElement.textContent = data.recovered.toLocaleString();
    }

    function handleError() {
        totalCasesElement.textContent = 'Error fetching data';
        totalDeathsElement.textContent = 'Error fetching data';
        totalRecoveredElement.textContent = 'Error fetching data';
    }

    globalStatsBtn.addEventListener('click', function () {
        countrySearch.classList.add('hidden');
        fetchGlobalData();
    });

    countryStatsBtn.addEventListener('click', function () {
        countrySearch.classList.remove('hidden');
    });

    searchBtn.addEventListener('click', function () {
        const country = countryInput.value.trim();
        if (country) {
            fetchCountryData(country);
        }
    });

    fetchGlobalData();
});
