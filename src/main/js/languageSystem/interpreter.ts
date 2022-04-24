

export class Interpreter {

    constructor() {
        this.isRunning = false;
    }

    public commandCallback() {
        this.isRunning = true;
    }

    public interpret(contents : String) {
        /*let str = contents.split("\n");


        let cm = new CommandsManager(mage, swampMonster);

        // TODO: RESET SCENE
        //mage.setPos(new Vector2f(renderer.width / 2, renderer.height / 2));
        await sleep(500);
        for (let i = 0; i < str.length; i++) {
            

            let row = str[i].split(/\s+/).join(' ').toLocaleUpperCase();

            if (cm.commands[row]) {
            cm.commands[row]();
            codeBox.markLine(i);
            } else {
            // ERROR IN LINE
            console.log("NE POSTOJI");
            codeBox.markErrorLine(i);
            await sleep(2000);
            codeBox.unmarkLine(i);
            break;
            // ------------
            }
            await sleep(500);
            codeBox.unmarkLine(i);
        }*/
    }

    get running() : boolean { return this.isRunning; }

    private isRunning : boolean;
};