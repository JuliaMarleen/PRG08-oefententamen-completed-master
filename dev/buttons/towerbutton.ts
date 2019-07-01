class TowerButton extends Button implements Subject{
    
    private progress:number = 0
    private bar:HTMLElement

    constructor() {
        super("towerbutton")

        this.bar = document.querySelector("towerbutton progressbar") as HTMLElement // type assertion, als je 100% zeker weet welk type het is as.
        this.bar.style.width = "0%"
    }

    protected handleClick(event: MouseEvent) : void {
        
        this.progress+=10;
        this.bar.style.width = this.progress+"%";
        Game.getInstance().ui.addCoins(-100);

        if(this.progress > 90){ // na 9 keer klikken zou deze moeten werken
            this.progress = 0;
            super.handleClick(event);
            Game.getInstance().ui.addCoins(-1000);
            this.notify();
        }
    }

    public subscribe(t:Observer){
        this.observers.push(t) //push de observers van deze button in een array, die in button zit waarvan deze overerft, dat zijn de torens
    }

    private notify() { // laat de observers van deze knop weten dat progress is over 90, de torens dus.
        for(let o of this.observers) {
            if( o instanceof Tower) {
                o.upgrade()  //update
            }
        }
    }
}