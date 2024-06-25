
// API CAll
$(document).ready(function () {
    var selectStateVal = 'Bihar';
    changeData(selectStateVal);
    $("#HighPrice").hide();
});
const indianStates = [

    'Bihar',
    'Gujarat',
    'Kerala',
    'Maharashtra',
    'Meghalaya',
    'Nagaland',
    'Punjab',
    'Rajasthan',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttrakhand',

];

// Get the select element
const selectElement = document.getElementById("stateSelect");

// Create and append option elements for each state
indianStates.forEach(state => {
    const option = document.createElement("option");
    option.text = state;
    option.value = state; // You can set a value for each option if needed
    selectElement.appendChild(option);
});

let selectState = () => {
    // $("#stateSelect").val();
    selectStateVal = $("#stateSelect").val();
    console.log(selectStateVal);

    changeData(selectStateVal);
}






function changeData(selectStateVal) {




    // ************api request 
    let apiKey = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';
    let format = 'json'
    let state = selectStateVal;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${apiKey}&format=${format}&filters%5Bstate%5D=${state}`, true);

    xhr.onload = function () {
        if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            allrecords = json.records;
            console.log(json);
            let newsHtml = '';
            allrecords.forEach(record => {
                let data = `
                <div class="commodityPrice">
                    <div class="ItemCity">
                        <div class="item">${record.commodity}</div>
                        <div class="city">${record.state} (${record.market})</div>
                    </div>
                    <div class="price">
                        <div class="max">
                            <p class="maxPrice">MAX PRICE</p>
                            <p>${record.max_price} INR</p>
                        </div>
                        <div class="min">
                            <p class="maxPrice">MIN PRICE</p>
                            <p>${record.min_price} INR</p>
                        </div>
                    </div>
                </div>
            `;
                newsHtml += data;

                // Check if the current record has max_price >= 1000 and set the "HighPrice" element's display accordingly
                if (record.max_price >= record.modal_price) {
                    $("#HighPrice").text(record.commodity + " Prices Are too High").show();
                } else {
                    $("#HighPrice").hide();
                   
                }
            });

            const newsAccordion = document.getElementById("LiveData");


            newsAccordion.innerHTML = newsHtml;



            // // min and max price show 

            // Find the record with the highest price
            let highestPriceRecord = null;
            let highestPrice = Number.NEGATIVE_INFINITY;

            allrecords.forEach(record => {
                if (record.max_price > highestPrice) {
                    highestPrice = record.max_price;
                    highestPriceRecord = record;
                }
            });

            // Create HTML for the highest price commodity
            if (highestPriceRecord) {
                let highestPriceHtml = `
        <div class="highest">
        <p id="HighPrice">> ${highestPriceRecord.commodity} Price is Too High </p><br>
            <p>Today's Highest Commodity</p>
            <div class="commodityPrice">
                <div class="ItemCity">
                    <div class="item">${highestPriceRecord.commodity}</div>
                    <div class="city">${highestPriceRecord.state} (${highestPriceRecord.market})</div>
                </div>
                <div class="price">
                    <div class="max">
                        <p class="maxPrice">MAX PRICE</p>
                        <p>${highestPriceRecord.max_price} INR</p>
                    </div>
                    <div class="avg">
                        <p class="avgPrice">AVG PRICE</p>
                        <p>${highestPriceRecord.modal_price} INR</p>
                    </div>
                    <div class="min">
                        <p class="maxPrice">MIN PRICE</p>
                        <p>${highestPriceRecord.min_price} INR</p>
                    </div>
                </div>
            </div>
        </div><br>
    `;
                // Insert the generated HTML into the <div id="highest"> element
                const highestElement = document.getElementById("highest");
                console.log(highestElement);
                highestElement.innerHTML = highestPriceHtml;
            }


            // lowest price 
            // Find the record with the lowest price
            let lowestPriceRecord = null;
            let lowestPrice = Number.POSITIVE_INFINITY;

            allrecords.forEach(record => {
                if (record.min_price < lowestPrice) {
                    lowestPrice = record.min_price;
                    lowestPriceRecord = record;
                }
            });

            // Create HTML for the lowest price commodity
            if (lowestPriceRecord) {
                let lowestPriceHtml = `
                <div class="lowest">
                    <p>Today's Lowest Commodity</p>
                    <div class="commodityPrice">
                        <div class="ItemCity">
                            <div class="item">${lowestPriceRecord.commodity}</div>
                            <div class="city">${lowestPriceRecord.state} (${lowestPriceRecord.market})</div>
                        </div>
                        <div class="price">
                            <div class="max">
                                <p class="maxPrice">MAX PRICE</p>
                                <p>${lowestPriceRecord.max_price} INR</p>
                            </div>
                            <div class="avg">
                               <p class="avgPrice">AVG PRICE</p>
                               <p>${lowestPriceRecord.modal_price} INR</p>
                            </div>
                            <div class="min">
                                <p class="maxPrice">MIN PRICE</p>
                                <p>${lowestPriceRecord.min_price} INR</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

                // Insert the generated HTML into the <div id="lowest"> element
                const lowestElement = document.getElementById("lowest");
                lowestElement.innerHTML = lowestPriceHtml;
            }
            // Now you can work with the JSON data...
        }
    };

    xhr.send();
}
