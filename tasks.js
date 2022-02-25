class Task{
  
	constructor(game, nextTasks, stagesActive){
    this._active = true
    this.game = game
    this.nextTasks = nextTasks
    this.stagesActive = stagesActive
    this.startTime = 0

    this._init()
    this._updateActive()
  }

  _init(){}

  elapsedTime(reset=false){
    let time = Date.now() - this.startTime
    if (reset){
      this.startTime = Date.now()
    }
    return time
  }

	execute(flags, counter){
    if (this.active){
      var result = this._execute(flags, counter)
      this._updateActive()
      return result
    }
    return {
      func: null,
      args: [],
      focusClick: false
    }
	}

  _execute(flags, counter){
    throw new Error("._execute() is not defined")
  }

  get active(){
    this._updateActive()
    return this._active
  }

  get _emptyReturn(){
    return {
      func: null,
      args: [],
      focusClick: false
    }
  }

  _updateActive(){}

  // _formatResult(func=null, args=[], focusClick=false){
  //   return {
  //     func: func,
  //     args: args,
  //     focusClick: focusClick
  //   }
  // }
}

class MakePaperclipsTask extends Task{

  _init(){
  }

  _execute(flags, counter){
    // console.log("performing make paperclip task")
    let result = {
      func: this.game.makePaperclip,
      focusClick: true,
      args: []
    }
    return result
  }

  _updateActive(){
    if (this.game.clipRate > 250){
      this._active = false
    }
  }
}

class SetStartingPriceTask extends Task{

  _init(){
  }

  _execute(flags, counter){
    return {
      func: this.game.lowerPrice,
      focusClick: false,
      args: []
    }
  }

  _updateActive(){
    if (this.game.margin <= .06 || this.game.clipperMakerLevel > 10){
      this._active = false
    }
  }
}

class BuyWireTask extends Task{
  _execute(flags, counter){
    if (
      (this.game.wire < 500 && this.game.wireCost <= 15) ||
      (this.game.wire < 400 && this.game.wireCost <= 18) ||
      (this.game.wire < 300 && this.game.wireCost <= 21) ||
      (this.game.wire < 200 && this.game.wireCost <= 24) ||
      (this.game.wire < 100)
    ){
      return {func: this.game.buyWire, args: [],}
    }
    else if (this.game.wire < 100){
      return 
    }
    return {
      func: null,
      args: [],
      focusClick: false
    }
  }

  _updateActive(){
    // console.log(this.game.wireBuyerStatus)
    this._active = this.game.wireBuyerStatus != 1
  }
}

class BuyClippersTask extends Task{

  _init(){
    this.maxClippers = 75
  }

  _execute(flags, counter){
    if (
      !flags.pauseBuying && 
      flags.saveForClippers &&
      this.game.funds > this.game.wireCost + this.game.clipperCost
    ){
      flags.optimizePrice = true
      return {func: this.game.makeClipper, args: []}
    }
    return {}
  }

  _updateActive(){
    // console.log(this.game.clipmakerLevel)
    if (this.game.clipmakerLevel >= 75){
      this._active = false
    }
  }
}

class CompleteProjectsTask extends Task{
  _init(){
    this.projectPath = [
      "RevTracker ", "Creativity ", "Limerick ", "Lexical Processing ", "Combinatory Harmonics ", "The Hadwiger Problem ", "The T\xF3th Sausage Conjecture ", "Donkey Space ", "Improved AutoClippers ", "Improved Wire Extrusion ", "Even Better AutoClippers ", "Quantum Computing ", "Photonic Chip "
    ]
  }

  _execute(flags, counter){
    // console.log(this.game, this.game.projects)

    for (let project of this.game.projects){
      if (this.projectPath.length > 0){
        if (project.title == this.projectPath[0] && project.cost()){
          this.projectPath.splice(0,1)
          flags.optimizePrice = true
          return {func: this.game.completeProject, args: [project]}
        }
      }
      else if (project.cost()){
        // console.log(project)
        flags.optimizePrice = true
        return {func: this.game.completeProject, args: [project]}
      }
    }
    return {}
  }
}

class OptimizePriceTask extends Task {
  _init(){
    this.startTime = 0
    this.initialized = false
    this.prevSales = ""
    this.currClipRate = 0
  }

  elapsedTime(reset=false){
    let time = Date.now() - this.startTime
    if (reset){
      this.startTime = Date.now()
    }
    return time
  }

  _execute(flags, counter){
    if (!flags.optimizePrice){
      return {}
    }
    if (!this.game.avgSales){
      flags.optimizePrice = false
      console.log("NO INFO TO OPTIMIZE")
      return {}
    }

    if (!this.initialized){
      console.log("OPTIMIZING PRICE")
      this.prevSales = ""
      if (avgSales < clipRate){
        this.prevSales = "low"
      }
      else {
        this.prevSales = "high"
      }
      this.initialized = true
      this.elapsedTime(true)
      return {func: this.game.raisePrice, args: []}
    }

    // console.log("time since last optimization: ", this.elapsedTime())
    if (this.elapsedTime() > 1000){
      this.elapsedTime(true)
      // console.log("Average sales and clip rate: ", this.game.avgSales, this.game.clipRate)
      if (this.game.unsoldClips < this.game.clipRate){
        this.prevSales = "high"
        return {func: this.game.raisePrice, args: []}
      }
      else if (this.game.avgSales < this.game.clipRate){
        if (this.prevSales == "high"){
          flags.optimizePrice = false
          this.initialized = false
          console.log("FINISHED OPTIMIZING")
          if (this.game.adCost / this.game.avgRev < 60){
            console.log("SAVING FOR ADS")
            flags.saveForAds = true
            flags.saveForClippers = false
          }
        }
        else {
          // console.log("Optimization: lowering price")
          this.prevSales = "low"
          return {func: this.game.lowerPrice, args: []}
        }
      }
      else {
        this.prevSales = "high"
        // console.log("Optimization: raising price")
        return {func: this.game.raisePrice, args: []}
      }
    }
    return {}

  }

}

class BuyAdsTask extends Task {
  _init(){
    this.maxAds = 14
  }

  _execute(flags, counter){
    if (
      !flags.pauseBuying && 
      this.game.funds > this.game.wireCost + this.game.adCost
    ){
      // console.log("buying ads: ", flags.saveForAds, this.game.funds, this.game.wireCost, this.game.adCost)
      flags.optimizePrice = true
      flags.saveForAds = false
      flags.saveForClippers = true
      console.log("SAVING FOR CLIPPERS")
      if (this.game.marketingLvl >= this.maxAds - 1){
        flags.adsFinished = true
      }
      return {func: this.game.expandMarketing, args: []}
    }
    return {}
  }

  _updateActive(){
    this._active = this.game.marketingLvl < this.maxAds
  }
}

class UpgradeComputerTask extends Task {

  _init(){
    this.step = 0
    this.nSteps = 5
  }

  _execute(flags, counter){
    if (this.game.trust > this.game.processors + this.game.memory){
      if (this.game.processors < 5){
        return {func: this.game.addProc, args: []}
      }
      else if (this.game.trust < 13){
        return {}
      }
      else if (this.game.trust == 13  && this.game.creativity < 100){
        return {}
      }
      else if (this.game.memory < 10){
        return {func: this.game.addMem, args: []}
      }
      else if (this.game.processors >= 30){
        return {func: this.game.addMem, args: []}
      }
      else if (this.game.memory >= 70){
        return {func: this.game.addProc, args: []}
      }
      else if (this.step == 0){
        this.step = (this.step + 1) % this.nSteps
        return {func: this.game.addProc, args: []}
      }
      else{
        this.step = (this.step + 1) % this.nSteps
        return {func: this.game.addMem, args: []}
      }
    }
    return {}
  }
}

class StartQuantumComputingTask extends Task{

  _init(){
    this.running = false
  }

  _execute(flags, counter){
    return {}
  }

  _updateActive(){
    if (!isNaN(this.game.qChip0)){
      this._active = false
    }
  }
}

class QuantumComputeTask extends Task {

  _execute(flags, counter){
    let total = this.game.qChip0 + this.game.qChip1 + this.game.qChip2 + this.game.qChip3 + this.game.qChip4 + this.game.qChip5 + this.game.qChip6 + this.game.qChip7 + this.game.qChip8 + this.game.qChip9

    // console.log("Quantum total is ", total)
    if (total == undefined){
      return {}
    }

    if (total > .1){
      this.running = true
      return {func: this.game.qComp, args: [], focusClick: true}
    }
    else if (this.running){
      this.running = false
      return {func: ()=>{;}, args: []}
    }

    return {}

  }
}

class BuyMegaClippersTask extends Task{
  _init(){
    this.maxMegaClippers = 90
  }

  _execute(flags, counter){
    // console.log("buying megaclipper")
    if (
      !flags.pauseBuying && 
      (flags.saveForClippers || flags.adsFinished) && 
      this.game.funds > this.game.wire + this.game.megaClipperCost
    ){
      flags.optimizePrice = true
      if (this.game.megaClipperLevel >= this.maxMegaClippers - 1){
        flags.clippersFinished = true
      }
      return {func: this.game.makeMegaClipper, args: []}
    }
    return {}
  }

  _updateActive(){
    this._active = this.game.megaClipperLevel == undefined || this.game.megaClipperLevel < this.maxMegaClippers
  }
}

class PlayTournamentTask extends Task {
  _init(){
    this.stage = "start"
  }

  get optimalStrat(){
    if (this.game.numStrats < 4){
      return 0
    }
    else if (this.game.numStrats < 7){
      return 3
    }
    else {
      return 7
    }
  }

  _execute(flags, counter){
    if (this.stage == "start" ){
      // console.log(this.game.tourneyRunning)
      if (!this.game.tourneyRunning && this.game.operations >= this.game.tourneyCost && this.elapsedTime() > 10 * 1000){
        this.elapsedTime(true)
        this.stage = "run"
        return {func: this.game.newTourney, args: []}
      }
    }
    else if (this.stage == "run"){
      if (this.game.stratPick != this.optimalStrat){
        return {func: this.game.setTourneyStrat, args: [this.optimalStrat]}
      }
      else {
        this.stage = "start"
        return {func: this.game.runTourney, args: []}
      }
    }
    return {}
  }
}

class StartTournamentsTask extends Task {
  _execute(flags, counter){
    return {}
  }

  _updateActive(){
    this._active = (this.game.stratPick == undefined)
    // console.log("STRAT PICK", this.game.stratPick)
  }
}

class StartInvestmentsTask extends Task {
  _execute(flags, counter){
    return {}
  }

  _updateActive(){
    this._active = (this.game.investLevel == undefined || this.game.investLevel < 3)
    // console.log("INVEST LEVEL", this.game.investLevel)
  }
}

class UpgradeInvestmentsTask extends Task {
  _execute(flags, counter){
    if (this.game.yomi > this.game.investUpgradeCost){
      return {func: this.game.investUpgrade, args: []}
    }
    return {}
  }

  _updateActive(){
    if (this.game.investLevel > 6){
      this._active = false
    }
  }
}

class MakeInvestmentsTask extends Task {

  _init(){
    this.stage = "init"
    this.benchmarks = [1000000, 10000000, 512000000, 512000000]
    this.startTime = Date.now()
    this.withdrawAmount = 0
    this.clipperFlag = false
    this.adsFlag = false
  }

  elapsedTime(reset=false){
    let time = Date.now() - this.startTime
    if (reset){
      this.startTime = Date.now()
    }
    return time
  }

  _execute(flags, counter){
    // console.log("INVESTMENT CHECK")
    // console.log(this.funds > 2000)
    if (this.stage == "init"){
      this.stage = "deposit"
      console.log("DEPOSITING MONEY")
      return {func: this.game.setInvestStrat, args: ["hi"]}
    }
    else if (
      this.stage == "deposit" && 
      (!flags.saveForAds || flags.adsFinished) && 
      this.game.funds > 2000 && 
      this.elapsedTime() > 10000
    ){
      this.elapsedTime(true)
      console.log("PORT TOTAL", this.game.portTotal)
      if (this.game.portTotal > this.benchmarks[0] * 1.2){
        this.stage = "withdraw"
        this.withdrawAmount = 0
        flags.pauseBuying = true
        console.log("WITHDRAWING MONEY")
      }
      return {func: this.game.deposit, args: []}
    }
    else if (this.stage == "withdraw"){
      if (this.game.portTotal == 0){
        console.log("RESETTING TO DEPOSIT\n"*100)
        flags.pauseBuying = false
        this.withdrawAmount = 0
        this.stage = "deposit"
      }
      else if (this.game.bankroll > 10000){
        this.withdrawAmount += this.game.bankroll
        if (this.withdrawAmount > this.benchmarks[0]){
          this.stage = "pause"
          console.log("PAUSING TO BUY PROJECTS")
          this.elapsedTime(true)
        }
        return {func: this.game.withdraw, args: []}
      }
    }
    else if (this.stage == 'pause' && this.elapsedTime() > 3 * 1000){
      this.withdrawAmount = 0
      this.benchmarks.splice(0, 1)
      console.log("DEPOSITING MONEY")
      this.elapsedTime(true)
      flags.pauseBuying = false
      this.stage = "deposit"
    }
    
    return {}

  }
}

class StartStage2Task extends Task {
  _execute(flags, counter){
    if (this.game.trust >= 100){
      flags.stage1Complete = true
    }
    return {}
  }
}

class BuildFactoriesTask extends Task {
  _execute(flags, counter){

  }
}

class BuildHarvestersTask extends Task {

}

class BuildWiresTask extends Task {

}

class BuildProductionTask extends Task {
  _execute(flag, counter){
    // if (this.game.clips > )
  }
}

class BuildStorageTask extends Task {

}

