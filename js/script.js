var db = new Db();
var execTradesTable =  new Table(document.getElementById('execTradesTable').querySelector('tbody'));

var closedTradesTable =  new Table(document.getElementById('closedTradesTable').querySelector('tbody'));

var newTradeBtn = document.getElementById('newTradeBtn');
newTradeBtn.addEventListener('click', function(event) {
    var newTradeForm = new FormData(document.getElementById('newTradeForm'));

    var trade = new Trade(newTradeForm.get('name'), newTradeForm.get('price'), newTradeForm.get('qty'), newTradeForm.get('action'));

    console.log(trade);

    var tradeId = db.add(trade);
    trade.setId(tradeId);

    execTradesTable.set(trade, 'opened');
});

document.addEventListener('tableClosedUpdate', function(event) {
    closedTradesTable.set(event.detail, 'closed');
});

document.addEventListener('tableOpenedUpdate', function(event) {
    execTradesTable.set(event.detail, 'opened');
});

document.addEventListener('newPartialUpdate', function(event) {
    var partialId = db.add(event.detail);
    event.detail.setId(partialId);
});
