class Kilpkonn {
    private suunad = ['paremale', 'alla', 'vasakule', 'üles'];
    private suundIndex = 0; // 0: paremale, 1: alla, 2: vasakule, 3: üles

    constructor(public x: number, public y: number, algSuund: string) {

        const suundIndex = this.suunad.indexOf(algSuund);
        this.suundIndex = suundIndex >= 0 ? suundIndex : 0;
    }

    olek(): void {
        console.log(`Asukoht: (${this.x}, ${this.y}), Suund: ${this.suunad[this.suundIndex]}`);
    }

    edasi(): void {
        switch (this.suundIndex) {
            case 0: this.x += 1; break; // Paremale
            case 1: this.y -= 1; break; // Alla
            case 2: this.x -= 1; break; // Vasakule
            case 3: this.y += 1; break; // Üles
        }
    }

    keeraParemale(): void {
        this.suundIndex = (this.suundIndex + 1) % 4;
    }

    kaugusTeisest(kilpkonn: Kilpkonn): number {
        return Math.sqrt(Math.pow(this.x - kilpkonn.x, 2) + Math.pow(this.y - kilpkonn.y, 2));
    }
}

function liigutaKilpkonna8Kujuliselt(kilpkonn: Kilpkonn, teineKilpkonn: Kilpkonn): void {
    const liikumised = [4, 4, 8, 4, 4, 4]; // Liikumiste arv vastavalt loogikale, peaks iga kord nn. piksel 8 moodustama
    for (let liikumine of liikumised) {
        for (let i = 0; i < liikumine; i++) {
            kilpkonn.edasi();
            kilpkonn.olek();
            if (kilpkonn.kaugusTeisest(teineKilpkonn) < 3) {
                console.log("Hoiatus: Kilpkonnad on teineteisest vähem kui kolme ühiku kaugusel!");
            }
        }
        kilpkonn.keeraParemale();
    }
}

// Kilpkonnade loomine
let k1 = new Kilpkonn(0, 0, 'paremale');
let k2 = new Kilpkonn(3, 0, 'alla'); // Alusta teist kilpkonna piisavalt kaugel, et vältida kohe alguses hoiatust

// Kilpkonna 1 liikumine
console.log("Kilpkonna 1 algasukoht:");
k1.olek();
console.log("Kilpkonna 1 liikumine:");
liigutaKilpkonna8Kujuliselt(k1, k2);

// Kilpkonna 2 liikumine samal tasandil, kuid eraldi 8-kujulise teekonna jaoks
console.log("Kilpkonna 2 algasukoht:")
k2.olek();
console.log("Kilpkonna 2 liikumine:");
liigutaKilpkonna8Kujuliselt(k2, k1);
