function calculatePrice() {
    const basePrices = {
        50: 204.79,
        100: 319.57,
        250: 653.93,
        500: 1222.87,
        1000: 2270.73,
        1500: 3298.60
    };

    const addressCleanupPrices = {
        50: 37.50,
        100: 50.00,
        250: 87.50,
        500: 150.00,
        1000: 275.00,
        1500: 400.00
    };

    let quantity = parseInt(document.getElementById('quantity').value);
    let designService = document.getElementById('design').value;
    let addressService = document.getElementById('address').value;

    let totalPrice = basePrices[quantity];

    if (designService === 'yes') {
        totalPrice += 100;
    }

    if (addressService === 'no') {
        totalPrice += addressCleanupPrices[quantity];
    }

    let pricePerUnit = totalPrice / quantity;

    document.getElementById('pricePerUnit').textContent = pricePerUnit.toFixed(2);
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}
