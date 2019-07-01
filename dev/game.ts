class Game {

    public  ui              : UI
    private pause           : boolean = false
    private zombiecounter   : number = 0
    private gameObjects     : GameObject[] = []
    private static instance : Game

    public static getInstance() : Game { // singleton, er kan maar 1 van zijn en die kan overal aangeroepen worden. Dit zodat je niet een 2e gamescherm kan maken. 
        if(!this.instance) this.instance = new Game()
        return Game.instance
    }

    private constructor() { // niets meer hier omdat dit alleen maar 1 keer de eerste keer wordt uitgevoerd
    }

    public init(){ // alles staat nu hier, een soort nieuwe constructor die vaker aangeroepen kan worden
        this.ui = new UI();
            
        let basicTower : Tower = new Tower(200, 200, this)  // maakt een nieuwe basic tower
        basicTower.fireBehavior = new BasicFireBehavior(basicTower)

        let singleShotTower : Tower = new Tower(320, 60, this)
        singleShotTower.fireBehavior = new SingleShotFireBehavior(singleShotTower)
        
        let multiShotTower : Tower = new Tower(600, 240, this)
        multiShotTower.fireBehavior = new MultiShotFireBehavior(multiShotTower)

        this.ui.towerUpgradeButton.subscribe(basicTower)  // subscribes basic tower to tower upgrade button?
        this.ui.towerUpgradeButton.subscribe(singleShotTower)
        this.ui.towerUpgradeButton.subscribe(multiShotTower)

        this.gameLoop()
    }

    public addGameObject(b: GameObject) {  // pusht alle game objects in een array, torens, zombies, bullets
        this.gameObjects.push(b)
    }

    public removeGameObject(b: GameObject) { // verwijderd game objects
        let index = this.gameObjects.indexOf(b)
        this.gameObjects.splice(index, 1)
    }

    private gameLoop() : void {
        

        if(this.ui.life <= 0) { // bij minder dan 0 levens is game over
            this.gameOver()
        }
        
        this.zombiecounter++; // Elke 10e keer dat hij door de gameloop heengaat komt er een nieuwe zombie bij
        if(this.zombiecounter > 10){
            this.zombiecounter = 0
            this.addGameObject(new Zombie())
        }
        
        for(let b of this.gameObjects) { // update en draw in alle gameobjects worden uitgevoerd
            b.update()
            b.draw()
        }

        this.checkCollision() // of bullet en zombie botsen

        if (!this.pause) {
            requestAnimationFrame(() => this.gameLoop()) // alle frames die het spel maakt.
        }
    }

    private checkCollision() {
        
        for(let go1 of this.gameObjects) { // loopt door alle gameobjects en noemt ze go1
            for(let go2 of this.gameObjects) { // loopt door alle gameobjects en noemt ze go2

                // Bullet vs Zombie collision
                if(go1 instanceof Bullet && go2 instanceof Zombie) {  // alle go1 die bullets zijn en alle go2 die zombies zijn.
                    if(go1.hasCollision(go2)) {
                        this.ui.addCoins(100)
                        go1.remove()
                        go2.remove() // bij collision verdwijnen ze allebei.
                        break
                    }
                }
            }

            // Zombie exits screen (left)
            if(go1 instanceof Zombie) { // type guards, om te checken van welk type een generiek object is: 'instanceof'
                if(go1.x < 0) {
                    go1.remove()
                    this.ui.decreaseLife(4)
                }
            }
        }
    }

    private gameOver() : void {
        this.pause = true
        this.ui.stop()
        new GameOver()
    }
}

window.addEventListener("load", () => Game.getInstance().init()) // start singleton