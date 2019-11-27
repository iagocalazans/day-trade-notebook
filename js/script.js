var db = new Db();
var execTradesTable =  new Table(document.getElementById('execTradesTable').querySelector('tbody'));

var closedTradesTable =  new Table(document.getElementById('closedTradesTable').querySelector('tbody'));

var results = new Results();

var newTradeBtn = document.getElementById('newTradeBtn');
newTradeBtn.addEventListener('click', function(event) {
    var newTradeForm = new FormData(document.getElementById('newTradeForm'));

    if (typeof newTradeForm.get('price') !== 'number') {
        var price = document.querySelector('.newTradePrice');
        if (newTradeForm.get('price') == "") {
            price.classList.add('is-invalid');
            return false;
        } else {
            price.classList.remove('is-invalid');
        }
        var str = newTradeForm.get('price');
        var float = str.replace(",",".");
    } else {
        var float = newTradeForm.get('price');
    }

    var qty = document.querySelector('.newTradeQty');
    if (newTradeForm.get('qty') < 1) {
        var qty = document.querySelector('.newTradeQty');
        qty.classList.add('is-invalid');
        return false;
    } else {
        qty.classList.remove('is-invalid');
    }

    var action = document.querySelector('.newTradeAction');
    if (newTradeForm.get('action') == "0"){
        action.classList.add('is-invalid');
        return false;
    } else {
        action.classList.remove('is-invalid');
    }

    var trade = new Trade(newTradeForm.get('name'), float, newTradeForm.get('qty'), newTradeForm.get('action'));

    var tradeId = db.add(trade);
    trade.setId(tradeId);

    document.getElementById('newTradeForm').reset();

    execTradesTable.set(trade, 'opened');
});

document.addEventListener('tableClosedUpdate', function(event) {
    closedTradesTable.set(event.detail, 'closed');

    results.update(db);

    var totalOperations = document.querySelector('.totalOperations')
    totalOperations.firstElementChild.textContent = results.totalOperations;

    var winningOperations = document.querySelector('.winningOperations')
    winningOperations.firstElementChild.textContent = results.winningOperations;

    var losingOperations = document.querySelector('.losingOperations')
    losingOperations.firstElementChild.textContent = results.losingOperations;

    var percentageGain = document.querySelector('.percentageGain')
    percentageGain.firstElementChild.textContent = results.percentageGain;

    var percentageLoss = document.querySelector('.percentageLoss')
    percentageLoss.firstElementChild.textContent = results.percentageLoss;

    var averageGain = document.querySelector('.averageGain')
    averageGain.firstElementChild.textContent = results.averageGain.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    var averageLoss = document.querySelector('.averageLoss')
    averageLoss.firstElementChild.textContent = results.averageLoss.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    var highestGain = document.querySelector('.highestGain')
    highestGain.firstElementChild.textContent = results.highestGain.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    var highestLoss = document.querySelector('.highestLoss')
    highestLoss.firstElementChild.textContent = results.highestLoss.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    var amountGain = document.querySelector('.amountGain')
    amountGain.firstElementChild.textContent = results.amountGain.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    var amountLoss = document.querySelector('.amountLoss')
    amountLoss.firstElementChild.textContent = results.amountLoss.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    var totalResult = document.querySelector('.totalResult')
    totalResult.firstElementChild.textContent = results.totalResult.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
});

document.addEventListener('tableOpenedUpdate', function(event) {
    execTradesTable.set(event.detail, 'opened');
});

document.addEventListener('newPartialUpdate', function(event) {
    var partialId = db.add(event.detail);
    event.detail.setId(partialId);
});
