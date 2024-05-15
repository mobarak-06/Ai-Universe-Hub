const loadData = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
  const data = await res.json();
  const allData = data.data.tools;
  const id = data.data;
  // console.log(id);
  displayData(allData);
};

const displayData = (data) => {
  const cardContainer = document.getElementById("card-container");
  data.forEach((item) => {
    // console.log(item);
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card  bg-base-100 shadow-xl">
                <figure><img src="${item?.image}" alt="Shoes" /></figure>
                <div class="card-body">
                  <h2 class="card-title">features</h2>
                  <ol>
                  <li>1.${item.features[0]}</li>
                  <li>2.${item.features[1]}</li>
                  <li>3.${item.features[2]}</li>
                  </ol>
                  <hr>
                  <div class = "flex justify-between">
                  <div>
                  <h2 class="card-title">${item.name}</h2>
                  <p> ${item.published_in}</p>
                  </div>
                  <button onclick = "showModal('${item.id}')" class="btn btn-circle">
                  <svg class="w-6 h-6 text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
                </svg>
                  </button>
                  </div>
                </div>
              </div>
    `;
    cardContainer.appendChild(div);
  });
};

const showModal = async (id) =>{
  showLoadingSpinner(true)
  // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    console.log(data.data);
    const modalData = data.data;
    const modalContainer = document.getElementById('modal-container');
    modalContainer.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class = "flex gap-5 px-auto">
    <div class = "bg-[#EB57570D] p-5 rounded-2xl w-[487px] h-[511px]">
    <h1 class = "mb-4 text-[#111111] text-2xl font-semibold">${modalData?.description}</h1>
    <div class = "flex justify-around border rounded-2xl border-[#eb5757]">
    <p class = "text-[#03A30A] w-[100px] h-[80px] m-5 text-center rounded-2xl bg-white p-4">${modalData?.pricing[0]?.price || 'data not found'} <br>${modalData?.pricing[0]?.plan || 'data not found'} </p>
    <p class = "text-[#F28927] w-[100px] h-[80px] m-5 text-center rounded-2xl bg-white p-4">${modalData?.pricing[0]?.price || 'data not found'} <br>${modalData?.pricing[0]?.plan || 'data not found'} </p>
    <p class = "text-[#EB5757] w-[100px] h-[80px] m-5 text-center rounded-2xl bg-white p-4">${modalData?.pricing[0]?.price || 'data not found'} <br>${modalData?.pricing[0]?.plan || 'data not found'} </p>
    </div>
    <div class = "flex justify-between mt-4">
    <div>
    <h1 class = "mb-4 text-[#111111] text-2xl font-semibold">Features</h1>
    <ul class = "list-disc">
    <li>${modalData?.features[1]?.feature_name || 'data not found'}</li>
    <li>${modalData?.features[2]?.feature_name || 'data not found'}</li>
    <li>${modalData?.features[3]?.feature_name || 'data not found'}</li>
    </ul>
    </div>
    <div>
    <h1 class = "mb-4 text-[#111111] text-2xl font-semibold">Integrations</h1>
    <ul class = "list-disc">
    <li>${modalData?.integrations[0] || 'data not found'}</li>
    <li>${modalData?.integrations[1] || 'data not found'}</li>
    <li>${modalData?.integrations[2] || 'data not found'}</li>
    </ul>
    </div>
    </div>
    </div>
    <div class = "bg-[#FFFFFF] border border-[#e7e7e7] p-5 rounded-2xl w-[487px] h-[511px] relative">
    <img src="${modalData?.image_link[0] || 'data not found'}" alt="">
    <h1 class = "mt-8 text-[#111111] text-2xl font-semibold">${modalData?.input_output_examples[0]?.input || 'data not found'}</h1>
    <h1 class = "mt-6">${modalData?.input_output_examples[0]?.output || 'data not found'}</h1>
    <h1 class = "text-white bg-[#EB5757] rounded-md w-[140px] text-center p-2 absolute top-4 right-4 ">
    ${modalData.accuracy?.score} <span>accuracy</span>
    </h1>
    </div>
    </div>
    `
    modalContainer.appendChild(div);
  showLoadingSpinner(false);
    // modal
    my_modal_api.showModal()
}


const showLoadingSpinner = (isLoading) =>{
 const loadSpinner = document.getElementById('loading-spinner');
 if (isLoading) {
  loadSpinner.classList.remove('hidden');
 } else {
  loadSpinner.classList.add('hidden');
 }
}

loadData();
