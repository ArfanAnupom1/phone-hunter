const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phone = data.data;
    // console.log(phone);
    displayPhones(phone, isShowAll);
}
const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showaAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        showaAllContainer.classList.remove('hidden');

    }
    else {
        showaAllContainer.classList.add('hidden');
    }

    // console.log('is Show All', isShowAll);
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        // 2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        // 3: set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        // 4 append child
        phoneContainer.appendChild(phoneCard);
    });
    loaderSpin(false);
}
const handleScarch = (isShowAll) => {
    loaderSpin(true);
    const scarchFild = document.getElementById('scarch-fild');
    const scarchText = scarchFild.value;
    // console.log(scarchText);
    loadPhone(scarchText, isShowAll);

}

const loaderSpin = (isLoading) => {
    const loaderSpinner = document.getElementById('loader');
    if (isLoading) {
        loaderSpinner.classList.remove('hidden')
    } else {
        loaderSpinner.classList.add('hidden')
    }
}
const handleShowAll = () => {
    handleScarch(true);
}

const handleShowDetail = async (id) => {
    // console.log('Clicked', id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    // console.log(data);
    const phone = data.data
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    // const phoneName = document.getElementById('Show-phone-name');
    // phoneName.innerText = phone.name;
    const showPhoneContainer = document.getElementById('show-phone-container');
    showPhoneContainer.innerHTML = `
    <div class="space-y-2">
        <img class="mx-auto my-auto py-4" src="${phone.image}" alt="Phone Image" /> <!-- Image at the top -->
        <h3 class="font-bold text-3xl text-black">${phone.name}</h3>
        <p><span class="font-bold text-black text-xl">Storage :  </span> ${phone.mainFeatures.storage} </p>
        <p><span class="font-bold text-black text-xl">displaySize :  </span> ${phone.mainFeatures.displaySize} </p>
        <p><span class="font-bold text-black text-xl">chipSet :  </span> ${phone.mainFeatures.chipSet} </p>
        <p><span class="font-bold text-black text-xl">memory :  </span> ${phone.mainFeatures.memory} </p>
        <p><span class="font-bold text-black text-xl">slug :  </span> ${phone.slug } </p>
        <p><span class="font-bold text-black text-xl">releaseDate :  </span> ${phone.releaseDate} </p>
        <p><span class="font-bold text-black text-xl">GPS :  </span> ${phone.others?.GPS } </p>
    </div>
    `;

    Show_details_modal.showModal();
}



loadPhone();