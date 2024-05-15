class Toode {
    mass: number; 
    nimetus: string; 
    hind: number; 

    constructor(mass: number, nimetus: string, hind: number) {
        this.mass = mass;
        this.nimetus = nimetus;
        this.hind = hind;
    }

    naitaDetaile(indent: string = ''): void {
        console.log(`${indent}Toode: ${this.nimetus}, Mass: ${this.mass} kg, Hind: ${this.hind}  EUR`);
    }
}

class Kast extends Toode {
    sisu: Toode[];
    materjal: string;

    constructor(mass: number, nimetus: string, hind: number, materjal: string) {
        super(mass, nimetus, hind);
        this.materjal = materjal;
        this.sisu = [];
    }

    lisaToode(toode: Toode): void {
        this.sisu.push(toode);
    }

    koguMass(): number {
        // Arvuta iseenda JA SISALDUVATE kastide/toodete kogumass tagasiulatuvalt
        const totalContentsMass = this.sisu.reduce((summa, toode) => {
            // Kui toode on kast, siis uuri tema kogumass rekursiivselt, kui ei siis ainult lisab toote massi
            return summa + (toode instanceof Kast ? toode.koguMass() : toode.mass);
        }, 0);
        return this.mass + totalContentsMass; // Lisab kasti enda massi samuti
    }

    naitaDetaile(indent: string = ''): void {
        console.log(`${indent}Kast: ${this.nimetus}, Mass: ${this.mass} kg, Hind: ${this.hind} EUR, Materjal: ${this.materjal}, Kogumass: ${this.koguMass()} kg`);
        if (this.sisu.length > 0) {
            console.log(`${indent}Sisu:`);
            this.sisu.forEach(toode => {
                toode.naitaDetaile(indent + '  ');  // Jooksuta naitaDetaile iga toote korral
            });
        } else {
            console.log(`{indent}Tühi`);
        }
    }
}


// Kasutus
const toode1 = new Toode(2, "Piim", 1.50);
const toode2 = new Toode(1, "Sai", 1.10);
const toode3 = new Toode(1, "Limps", 1.25);

const kast1 = new Kast(0.5, "Väike", 2.50 , "Papp");
kast1.lisaToode(toode1);
kast1.lisaToode(toode2);

const kast2 = new Kast(1.3, "Suur", 4.50 , "Plastmass");
kast2.lisaToode(kast1); // Viskame kasti kasti
kast2.lisaToode(toode3); // Kast 2 peaks sisaldama Kast 1-te koos kast1 toodetega ja ka limpsi
// Lugemiseks pakkus GPT taandete lisamist, töötas

console.log("Suure kasti info:");
kast2.naitaDetaile();