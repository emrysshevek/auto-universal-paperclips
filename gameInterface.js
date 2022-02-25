class GameInterface{

  constructor (){
  }

  get clips(){
    return clips
  }

  get funds(){
    return funds
  }

  get avgRev(){
    let section = document.getElementById("revPerSecDiv")
    if (section.style.display != "none"){
      return avgRev
    }
  }

  get avgSales(){
    let section = document.getElementById("revPerSecDiv")
    if (section.style.display != "none"){
      return avgSales
    }
  }

  get unsoldClips(){
    return unsoldClips
  }

  get margin(){
    return margin
  }

  get demand(){
    return demand
  }

  get marketingLvl(){
    return marketingLvl
  }

  get adCost(){
    return adCost
  }

  get clipRate(){
    return clipRate
  }

  get wireBuyerStatus(){
    // 0 = off, 1 = on
    let section = document.getElementById("wireBuyerDiv")
    if (section.style.display != "none"){
      return wireBuyerStatus
    }
  }

  get wire(){
    return wire
  }

  get wireCost(){
    return wireCost
  }

  get clipmakerLevel(){
    let section = document.getElementById("autoClipperDiv")
    if (section.style.display != "none"){
      return clipmakerLevel
    }
  }

  get clipperCost(){
    let section = document.getElementById("autoClipperDiv")
    if (section.style.display != "none"){
      return clipperCost
    }
  }

  get megaClipperLevel(){
    let section = document.getElementById("megaClipperDiv")
    if (section.style.display != "none"){
      return megaClipperLevel
    }
  }

  get megaClipperCost(){
    let section = document.getElementById("megaClipperDiv")
    if (section.style.display != "none"){
      return megaClipperCost
    }
  }

  get trust(){
    let section = document.getElementById("compDiv")
    if (section.style.display != "none"){
      return trust
    }
  }

  get nextTrust(){
    let section = document.getElementById("compDiv")
    if (section.style.display != "none"){
      return nextTrust
    }
  }

  get processors(){
    let section = document.getElementById("compDiv")
    if (section.style.display != "none"){
      return processors
    }
  }

  get memory(){
    let section = document.getElementById("compDiv")
    if (section.style.display != "none"){
      return memory
    }
  }

  get operations(){
    let section = document.getElementById("compDiv")
    if (section.style.display != "none"){
      return operations
    }
  }

  get maxOps(){
    let section = document.getElementById("compDiv")
    if (section.style.display != "none"){
      return memory * 1000
    }
  }

  get creativity(){
    let section = document.getElementById("compDiv")
    if (section.style.display != "none"){
      return creativity
    }
  }

  get qChip0(){
    let section = document.getElementById("compDiv")
    if (section.style.display != "none"){
      return parseFloat(document.getElementById("qChip0").style.opacity)
    }

  }

  get qChip1(){
    let section = document.getElementById("compDiv")
    if (section.style.display != "none"){
      return parseFloat(document.getElementById("qChip1").style.opacity)
    }
  } 

  get qChip2(){
    let section = document.getElementById("compDiv")
    if (section.style.display != "none"){
      return parseFloat(document.getElementById("qChip2").style.opacity)
    }
  }

  get qChip3(){
    let section = document.getElementById("compDiv")
    if (section.style.display != "none"){
      return parseFloat(document.getElementById("qChip3").style.opacity)
    }
  }

  get qChip4(){
    let section = document.getElementById("compDiv")
    if (section.style.display != "none"){
      return parseFloat(document.getElementById("qChip4").style.opacity)
    }
  }

  get qChip5(){
    let section = document.getElementById("compDiv")
    if (section.style.display != "none"){
      return parseFloat(document.getElementById("qChip5").style.opacity)
    }
  }

  get qChip6(){
    let section = document.getElementById("compDiv")
    if (section.style.display != "none"){
      return parseFloat(document.getElementById("qChip6").style.opacity)
    }
  }

  get qChip7(){
    let section = document.getElementById("compDiv")
    if (section.style.display != "none"){
      return parseFloat(document.getElementById("qChip7").style.opacity)
    }
  }

  get qChip8(){
    let section = document.getElementById("compDiv")
    if (section.style.display != "none"){
      return parseFloat(document.getElementById("qChip8").style.opacity)
    }
  }

  get qChip9(){
    let section = document.getElementById("compDiv")
    if (section.style.display != "none"){
      return parseFloat(document.getElementById("qChip9").style.opacity)
    }
  }

  get projects(){
    let section = document.getElementById("projectsDiv")
    if (section.style.display != "none"){
      let visibleProjects = []
      for (let p1 of projectListTopElement.children){
        for (let p2 of projects){
          if (p1.id == p2.id){
            visibleProjects.push(p2)
          }
        }
      }
      return visibleProjects
    }
    return []
  }

  get investStrat(){
    let section = document.getElementById("projectsDiv")
    if (section.style.display != "none"){
      return investStratElement.value
    }
  }

  get bankroll(){
    let section = document.getElementById("projectsDiv")
    if (section.style.display != "none"){
      return bankroll
    }
  }

  get secTotal(){
    let section = document.getElementById("projectsDiv")
    if (section.style.display != "none"){
      return secTotal
    }
  }

  get portTotal(){
    let section = document.getElementById("projectsDiv")
    if (section.style.display != "none"){
      return portTotal
    }
  }
  
  get investLevel(){
    let section = document.getElementById("projectsDiv")
    if (section.style.display != "none"){
      return investLevel
    }
  }

  get investUpgradeCost(){
    let section = investUpgradeCostElement
    if (section.style.display != "none"){
      return investUpgradeCost
    }
  }

  get stratPick(){
    let section = document.getElementById("strategyEngine")
    if (section.style.display != "none"){
      return stratPickerElement.value
    }
  }

  get numStrats(){
    // console.log("getting number of strats")
    let section = document.getElementById("strategyEngine")
    if (section.style.display != "none"){
      // console.log("here")
      return stratPickerElement.childElementCount - 1
    }
  }

  get currentRound(){
    let section = document.getElementById("strategyEngine")
    if (section.style.display != "none"){
      return currentRound 
    }
  }

  get aa(){
    let section = document.getElementById("strategyEngine")
    if (section.style.display != "none"){
      return aa
    }
  }

  get ab(){
    let section = document.getElementById("strategyEngine")
    if (section.style.display != "none"){
      return ab
    }
  }

  get ba(){
    let section = document.getElementById("strategyEngine")
    if (section.style.display != "none"){
      return ba
    }
  }

  get bb(){
    let section = document.getElementById("strategyEngine")
    if (section.style.display != "none"){
      return bb
    }
  }

  get yomi(){
    let section = document.getElementById("strategyEngine")
    if (section.style.display != "none"){
      return yomi
    }
  }

  get tourneyCost(){
    let section = document.getElementById("strategyEngine")
    if (section.style.display != "none"){
      return tourneyCost
    }
  }

  get tourneyRunning(){
    let section = document.getElementById("strategyEngine")
    if (section.style.display != "none"){
      return btnNewTournamentElement.disabled
    }
  }

  get nextFactoryUpgrade(){
    let section = document.getElementById("factoryUpgradeDisplay")
    if (section.style.display != "none"){
      return nfup
    }
  }

  get factoryLevel(){
    let section = document.getElementById("factoryDiv")
    if (section.style.display != "none"){
      return factoryLevel
    }
  }

  get factoryCost(){
    let section = document.getElementById("factoryDiv")
    if (section.style.display != "none"){
      return factoryCost
    }
  }

  // get 

  get availableMatter(){
    let section = document.getElementById("factoryUpgradeDisplay")
    if (section.style.display != "none"){
      return nfup
    }
  }

  makePaperclip(args=null){
    btnMakePaperclipElement.click()
  }

  lowerPrice(args=null){
    btnLowerPriceElement.click()
  }

  raisePrice(args=null){
    document.getElementById("btnRaisePrice").click()
  }

  expandMarketing(args=null){
    btnExpandMarketingElement.click()
  }

  toggleWireBuyer(args=null){
    document.getElementById("btnToggleWireBuyer").click()
  }

  buyWire(args=null){
    btnBuyWireElement.click()
  }

  makeClipper(args=null){
    btnMakeClipperElement.click()
  }

  makeMegaClipper(args=null){
    btnMakeMegaClipperElement.click()
  }

  addProc(args=null){
    btnAddProcElement.click()
  }

  addMem(args=null){
    btnAddMemElement.click()
  }

  qComp(args=null){
    btnQcompute.click()
  }

  completeProject(project){
    console.log(project)
    for (let projectElement of projectListTopElement.children){
      if (projectElement.id == project.id){
        console.log("CLICKING PROJECT", projectElement)
        projectElement.click()
      }
    }
  }

  setInvestStrat(strat){
    if (strat == "low" || strat == "med" || strat == "hi"){
      investStratElement.value = strat
    }
  }

  deposit(args=null){
    document.getElementById("btnInvest").click()
  }

  withdraw(args=null){
    document.getElementById("btnWithdraw").click()
  }

  investUpgrade(args=null){
    btnImproveInvestmentsElement.click()
  }

  setTourneyStrat(strat){
    // console.log("Setting Strat", strat, this.numStrats)
    strat = parseInt(strat)
    if (strat >= 0 && strat < stratPickerElement.childElementCount - 1){
      stratPickerElement.value = strat
    }
  }

  runTourney(args=null){
    btnRunTournamentElement.click()
  }

  newTourney(args=null){
    btnNewTournamentElement.click()
  }

}