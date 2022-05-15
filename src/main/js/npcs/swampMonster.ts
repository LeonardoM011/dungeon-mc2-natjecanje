import { Vector2f } from "../gameEngine/math/vector";
import { Texture } from "../gameEngine/objectManager/texture";
import { Renderer } from "../gameEngine/windowManager/renderer";
import { HealthBar } from "../objects/healthBar";
import { Boss } from "./boss";

export class SwampMonster extends Boss {
    
    constructor(texture : Texture, origin : Vector2f) {
        super(texture, origin);

        this.health = 100;
        this.maxHealth = 100;
        
        this.hpBar = new HealthBar(new Vector2f(0, 22), 30, 4);
        this.addChild(this.hpBar);
    }

    public override update(delta : number, boss : Boss) : void {

    }

    public override move(direction : Vector2f) : void {

    }

    public override attack(renderer : Renderer, boss : Boss) : void {

    }

    public override damage(hp : number) : void {
        this.health -= hp;
        this.hpBar.setHpPercent(this.health / this.maxHealth);

        if (this.health <= 0)
            alert("Boss ubijen!");
    }

    get hp() {
        return this.health;
    }

    set hp(health : number) {
        this.health = health;
    }

    protected override hpBar : HealthBar;
    protected override health: number;
    protected override maxHealth : number;
};