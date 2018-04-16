class Tester {
    constructor(N) {
        this.N = N
        this.cnt = new Array(N)
        this.cnt.fill(0)
        this.p = new Array(N)
        this.p.fill(0)
        this.idealEntropy = Math.log2(N)
    }
    loadData(data, max, min) {
        this.max = max
        this.min = min
        this.data = data.map(d => d-min)
        this.size = data.length
        this.e = 1/this.N * this.size
        this._countEntry()
        this._calcEntropy()
        this._calcChiSquare()
    }
    test() {
        console.log("Calculated entropy = "+this.entropy)
        console.log("Ideal entropy for N="+this.N+" is "+this.idealEntropy)
        console.log()
        console.log("Chi Square = "+this.chiSquare)
    }
    _calcEntropy() {
        var cnt = this.cnt
        var p = cnt.map(_c => _c/this.size)
        var si = p.map(_p => _p > 0 ? -1 * _p * Math.log2(_p) : 0)
        var entropy = si.reduce((a, b) => a + b)

        this.p = p
        this.entropy = entropy
    }
    _calcChiSquare() {
        var cnt = this.cnt
        var e = this.e
        var chiSquare = cnt.map(_c => (_c-e)**2/e).reduce((a, b) => a + b)

        this.chiSquare = chiSquare
    }
    _countEntry() {
        for (var i=0; i<this.data.length; i++) {
            var d = this.data[i]
            this.cnt[d] += 1
        }
    }
}

var dataStr = $("#lblRandomNumbers").clone().children().remove().end().text().trim()
var data = dataStr.split(' ').map(Number)
var max = parseInt($("#txtMax").val())
var min = parseInt($("#txtMin").val())
var N = max - min + 1

var t = new Tester(N)
t.loadData(data, max, min)
t.test()