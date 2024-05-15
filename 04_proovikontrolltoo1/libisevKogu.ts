function aritmeetilineKeskmine(a: number, b: number, c: number): number {
    return (a + b + c) / 3;
}

// Katsetamine
console.log(aritmeetilineKeskmine(1, 2, 3)); // peaks väljastama 2

function libisevKeskmine(massiiv: number[]): number[] {
    let tulemus: number[] = [];
    for (let i = 0; i < massiiv.length - 2; i++) {
        tulemus.push(aritmeetilineKeskmine(massiiv[i], massiiv[i + 1], massiiv[i + 2]));
    }
    return tulemus;
}

// Katsetamine
console.log(libisevKeskmine([1, 2, 3, 4, 5])); // peaks väljastama [2, 3, 4]

class ArvudeKoguja {
    private arvud: number[] = [];
    private tulemused: number[] = [];

    // Meetod ühe arvu lisamiseks
    lisaArv(arv: number){
        this.arvud.push(arv);
        // Kui arvude hulk on vähemalt kolm, arvutame uue libiseva keskmise
        if (this.arvud.length >= 3) {
            let n = this.arvud.length;
            let uusKeskmine = this.arvutaKeskmine(this.arvud[n - 3], this.arvud[n - 2], this.arvud[n - 1]);
            this.tulemused.push(uusKeskmine);
        }
    }

    // Meetod keskmise arvutamiseks kolmest arvust
    private arvutaKeskmine(a: number, b: number, c: number): number {
        return (a + b + c) / 3;
    }

    // Meetod kõigi libisevate keskmiste saamiseks
    leiaLibisevKeskmine(): number[] {
        return this.tulemused;
    }
}

// Kasutamine
let koguja = new ArvudeKoguja();
koguja.lisaArv(1);
koguja.lisaArv(2);
koguja.lisaArv(3);
console.log(koguja.leiaLibisevKeskmine()); // peaks väljastama [2]

koguja.lisaArv(4);
console.log(koguja.leiaLibisevKeskmine()); // peaks väljastama [2, 3]

koguja.lisaArv(5);
console.log(koguja.leiaLibisevKeskmine()); // peaks väljastama [2, 3, 4]
