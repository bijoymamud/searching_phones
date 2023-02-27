const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);

}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = ' ';

    // display 10 phones only
    const seeMore = document.getElementById('see-more');
    if (dataLimit && phones.length > 12) {
        phones = phones.slice(0, 11);

        seeMore.classList.remove('d-none');
    }
    else {
        seeMore.classList.add('d-none');
    }



    // display no phones found or worng pressing

    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');

    }
    else {
        noPhone.classList.add('d-none');
    }

    // display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card  p-4 mb-5">
                <img src="${phone.image}" class="card-img-top " alt="..." />
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </p>
                  <button onclick ="loadPhoneDetails('$phone.slug')" href="#" class="btn btn-primary">Show details</button>
                </div>
              </div>
    
        `;
        phonesContainer.appendChild(phoneDiv);
    });

    // Stop Loader/spinner
    toggleSpinner(false);
}


const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);

}

document.getElementById('btn-search').addEventListener('click', function () {

    // star loader
    processSearch(12);
})


//search input field enter key handler

document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {

        //code for enter
        processSearch(15);


    }
})

const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

// not the best way to load see all
document.getElementById('btn-see-more').addEventListener('click', function () {

    processSearch();
})

const loadPhoneDetails = async id => {

    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;

    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
}

// loadPhone();