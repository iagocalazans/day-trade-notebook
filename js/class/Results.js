class Results {
    totalOperations;
    winningOperations;
    losingOperations;
    percentageGain;
    percentageLoss;
    amountGain;
    amountLoss;
    totalResult;
    averageGain;
    averageLoss;
    highestGain;
    highestLoss;

    constructor() {
        this.totalOperations = 0;
        this.winningOperations = 0;
        this.losingOperations = 0;
        this.percentageGain = 0;
        this.percentageLoss = 0;
        this.amountGain = 0;
        this.amountLoss = 0;
        this.totalResult = 0;
        this.averageGain = 0;
        this.averageLoss = 0;
        this.highestGain = 0;
        this.highestLoss = 0;
    }

    update(db) {
        var op = db.find('status', 0);
        this.totalOperations = op.length;
        var win = 0;
        var loss = 0;
        var winAmount = 0;
        var lossAmount = 0;
        for (var i=0;i<op.length;i++) {
            if (op[i].value > 0) {
                win++;
                winAmount = winAmount + op[i].value;
                if (op[i].value > this.highestGain) {
                    this.highestGain = op[i].value;
                }
            } else {
                loss++;
                lossAmount = lossAmount + op[i].value;
                if (op[i].value < this.highestLoss) {
                    this.highestLoss = op[i].value;
                }
            }
        }

        this.amountGain = +winAmount;
        this.amountLoss = +lossAmount;

        this.winningOperations = win;
        this.losingOperations = loss;

        this.percentageGain = this.percentage(this.winningOperations).toFixed(2);
        this.percentageLoss = this.percentage(this.losingOperations).toFixed(2);

        this.averageGain = this.average('gain');
        this.averageLoss = this.average('loss');

        this.totalResult = this.amountLoss + this.amountGain;
    }

    percentage(prop) {
        var percentage = prop * 100 / this.totalOperations;
        return +percentage;
    }

    average(type) {
        if (type == 'gain') {
            if (this.winningOperations == 0) {
                return 0;
            }
            return this.amountGain / this.winningOperations;
        }
        if (type == 'loss') {
            if (this.losingOperations == 0) {
                return 0;
            }
            return this.amountLoss / this.losingOperations;
        }
    }
}
