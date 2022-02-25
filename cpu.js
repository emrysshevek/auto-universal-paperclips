class CPU{

  flags = {
    optimizePrice: false,
    saveForAds:  false,
    adsFinished: false,
    saveForClippers: true,
    clippersFinished: false,
    pauseBuying: false,
    quantumComplete: false,
    stage1Complete: true
  }

  constructor(){
    this.activeTasks = []
    this.game = new GameInterface()
    this.counter = 0
    this.focusTaskFunc = null
    this.focusTaskArgs = []
    this.actionsPerSecond = 10
    this.focusClicksPerSecond = 30
    this.stage = 1
    this.pendingSplits = {}
    this.splits = {}
    this.initTasks()
  }

  run(){
    console.log("RUNNING CPU")
    // Every [this.actionsPerSecond] times per second:
    // Perform an action, update the counter, and update splits
    this.clickerID = setInterval(()=>{
      this.performAction()
      this.updateSplits()
      this.updateStage()
      this.counter++
    }, (1/this.actionsPerSecond) * 1000)
  }

  performAction(){
    let tempCounter = this.counter
    while(true){
      // Cycle through tasks based on the counter
      let task = this.activeTasks[tempCounter % this.activeTasks.length]

      // console.log("CHECKING TASK", task)
      // If task has been completed, remove it from the list of tasks and add any new tasks
      if (!task.active){
        this.updateTasks(tempCounter % this.activeTasks.length)
        tempCounter++
        continue
      }

      var result = task.execute(this.flags, this.counter)
      
      // console.log(result, notFocusing)

      // If task requests a click, check if already performing task (in case of focus tasks)
      // If not already focusing task, start focusing
      // If already focusing task, skip action
      // If task is a single action, perform action
      // If task does not require a click, continue to next task until all tasks have been checked
      if (result.func){
        let notFocusing = this.notFocusingTask(result.func, result.args)
        if (result.focusClick && notFocusing){
          console.log("FOCUS CLICKING", result.func)
          this.startFocusClick(result.func, result.args)
          break
        }
        else if (result.focusClick && !notFocusing){
          tempCounter++
          continue
        }
        else {
          this.endFocusClick()
          console.log("PERFORMING ACTION", result.func)
          result.func(...result.args)
          break
        }
      }
      else if (tempCounter - this.counter >= this.activeTasks.length){
        break
      }
      else {
        tempCounter++
      }

    }
  }
 
  startFocusClick(func, args){
    this.focusTaskFunc = func 
    this.focusTaskArgs = args
    clearInterval(this.focusID)
    this.focusID = setInterval(()=>{func(...args)}, (1/this.focusClicksPerSecond) * 1000)
  }
  
  endFocusClick(){
    if (this.focusTaskFunc){
      clearInterval(this.focusID)
      this.focusTaskFunc = null
    }
  }

  notFocusingTask(func, args){
    if (args.length > 0){
      console.log(this.focusTaskFunc, func, this.focusTaskArgs, args)
    }
    
    if (this.focusTaskFunc && func){
      let matchingFuncs = func.toString() != this.focusTaskFunc.toString()
      let matchingArgs = JSON.stringify(args) != JSON.stringify(this.focusTaskArgs)
      if (matchingFuncs){
        return !matchingArgs
      }
      return false
    }
    return true    
  }

  updateTasks(taskIndex){
    let task = this.activeTasks[taskIndex]
    console.log("REMOVING TASK", task)
    console.log("ADDING TASKS", task.nextTasks)
    this.activeTasks.splice(taskIndex, 1)
    for (let nextTask of task.nextTasks){
      this.activeTasks.push(nextTask)
    }
    console.log("CURRENT TASKS", this.activeTasks)
  }

  updateSplits(){
    for (let split in this.pendingSplits){
      if (this.pendingSplits[split].trigger()){
        this.splits[split] = this.totalElapsedTime
        delete this.pendingSplits[split]
        console.log("CURRENT SPLITS", this.splits)
      }
    }
  }

  updateStage(){
    if (this.flags.stage2Complete){
      this.removeOldTasks(3)
    }
    else if (this.flags.stage1Complete){
      this.removeOldTasks(2)
    }
  }

  removeOldTasks(stage){
    for (let i = 0; i < this.activeTasks.length; i++){
      if (!this.activeTasks[i].stagesActive.includes(stage)){
        this.activeTasks.splice(i, 1)
      }
    }
  }

  get totalElapsedTime(){
    let totalSeconds = this.counter / this.actionsPerSecond
    let seconds = totalSeconds % 60
    let totalMinutes = parseInt(totalSeconds / 60)
    let minutes = totalMinutes % 60
    let hours = parseInt(totalMinutes / 60) 
    return `${hours}:${minutes}:${Math.round(seconds*100)/100}`
  }

  initTasks(){
    let makePaperclips = new MakePaperclipsTask(this.game, [], [1])
    let setStartingPrice = new SetStartingPriceTask(this.game, [], [1])
    let buyWire = new BuyWireTask(this.game, [], [1])
    let buyMegaClippers = new BuyMegaClippersTask(this.game, [], [1])
    let buyClippers = new BuyClippersTask(this.game, [buyMegaClippers], [1])
    let completeProjects = new CompleteProjectsTask(this.game, [])
    let optimizePrice = new OptimizePriceTask(this.game, [], [1])
    let buyAds = new BuyAdsTask(this.game, [], [1])
    let upgradeComputer = new UpgradeComputerTask(this.game, [], [1,2,3])
    let quantumCompute = new QuantumComputeTask(this.game, [], [1,2,3])
    let startQuantumComputing = new StartQuantumComputingTask(this.game, [quantumCompute], [1])
    let playTournament = new PlayTournamentTask(this.game, [], [1,2,3])
    let upgradeInvestments = new UpgradeInvestmentsTask(this.game, [], [1])
    let makeInvestments = new MakeInvestmentsTask(this.game, [], [1])
    let startInvestments = new StartInvestmentsTask(this.game, [makeInvestments], [1])
    let startTourneys = new StartTournamentsTask(this.game, [upgradeInvestments, playTournament], [1])

    
    let startStage2 = new StartStage2Task(this.game, [], [1])
    
    this.activeTasks = [
      makePaperclips,
      setStartingPrice,
      buyWire,
      buyClippers,
      completeProjects,
      optimizePrice,
      buyAds,
      upgradeComputer,
      startQuantumComputing,
      startInvestments,
      startTourneys
    ]

    this.pendingSplits = {
      test: {trigger: ()=>{return this.game.clips >= 2000}},
      quantum: {trigger: ()=>{return !startQuantumComputing.active}},
      fullAuto: {trigger: ()=>{return this.game.trust >= 100}},
      clippers: {trigger: ()=>{return this.game.megaClipperLevel >= 85}}
    }

  }

}