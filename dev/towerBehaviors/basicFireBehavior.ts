class BasicFireBehavior implements FireBehavior { //gebruikt interface fire behavior
                                                    // we maken gebruik van strategy patterns hier omdat we dan tower kunnen gebruiken als class en daarvan de variabelen dynamisch kunnen aanpassen.
    constructor(tower : Tower) {
        tower.bullets = 0;

        tower.div.className = "";
        tower.div.classList.add("small-tower");
    }

    public fire(): void {
        // Do nothing.
    }

    public upgrade(tower : Tower) : FireBehavior {
        // from basic to single shot tower.
        tower.bullets = 0;
        tower.div.classList.remove("small-tower");
        return new SingleShotFireBehavior(tower);
    }
}