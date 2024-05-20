// 止盈止損計算邏輯
function calculateTradeInfo(coinQuantity, entryPrice, exitPrice, direction) {
    const feePercent = 0.04;  // 固定手續費百分比
    if (direction !== 'long' && direction !== 'short') {
        alert("交易方向應為 'long' 或 'short'");
        return;
    }

    const totalFee = (entryPrice + exitPrice) * coinQuantity * feePercent / 100;
    const breakevenShift = totalFee / coinQuantity;
    const pnl = coinQuantity * (direction === 'long' ? (exitPrice - entryPrice) : (entryPrice - exitPrice)) - totalFee;
    const breakevenPrice = entryPrice + (direction === 'long' ? breakevenShift : -breakevenShift);

    return { pnl, breakevenPrice };
}

document.getElementById('profitLossForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const coinQuantity = parseFloat(document.getElementById('coin_quantity').value);
    const entryPrice = parseFloat(document.getElementById('entry_price').value);
    const exitPrice = parseFloat(document.getElementById('exit_price').value);
    const direction = document.getElementById('direction').value;

    const { pnl, breakevenPrice } = calculateTradeInfo(coinQuantity, entryPrice, exitPrice, direction);
    document.getElementById('profitLossResult').textContent = `盈虧: $${pnl.toFixed(2)} , 損益平衡價格: ${breakevenPrice.toFixed(7)}`;
});

// 加倉成本計算邏輯
function calculateNewAveragePrice(currentEthQuantity, currentAveragePrice, additionalEthQuantity, purchasePrice, feePercent = 0.04) {
    const totalCostNewEth = additionalEthQuantity * purchasePrice * (1 + feePercent / 100);
    const totalQuantity = currentEthQuantity + additionalEthQuantity;
    const totalCost = (currentEthQuantity * currentAveragePrice) + totalCostNewEth;
    const newAveragePrice = totalCost / totalQuantity;

    return newAveragePrice;
}

document.getElementById('averageCostForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const currentEthQuantity = parseFloat(document.getElementById('current_eth_quantity').value);
    const currentAveragePrice = parseFloat(document.getElementById('current_average_price').value);
    const additionalEthQuantity = parseFloat(document.getElementById('additional_eth_quantity').value);
    const purchasePrice = parseFloat(document.getElementById('purchase_price').value);

    const newAveragePrice = calculateNewAveragePrice(currentEthQuantity, currentAveragePrice, additionalEthQuantity, purchasePrice);
    document.getElementById('averageCostResult').textContent = `損益平衡均價: ${newAveragePrice.toFixed(7)}`;
});
