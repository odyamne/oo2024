// Defineerime liidese
interface LineaarvorrandLiides {
    arvutaY(x: number): void;
    saaY(): number;
    sisestaVabaliige?(v: number): void; // ? = vabaliige on valikuline
}

// Esimene klass
export class LineaarVorrand implements LineaarvorrandLiides {
    protected kordaja: number;
    protected y: number = 0;

    constructor(kordaja: number) {
        this.kordaja = kordaja;
    }

    arvutaY(x: number): void {
        this.y = this.kordaja * x;
    }

    saaY(): number {
        return this.y;
    }
}

// Teine klass vabaliikmega
export class LineaarVorrandVabaliikmega implements LineaarvorrandLiides {
    protected kordaja: number;
    protected vabaliige: number;
    protected y: number = 0;

    constructor(kordaja: number, vabaliige: number) {
        this.kordaja = kordaja;
        this.vabaliige = vabaliige;
    }

    arvutaY(x: number): void {
        this.y = this.kordaja * x + this.vabaliige;
    }

    saaY(): number {
        return this.y;
    }

    sisestaVabaliige(v: number): void {
        this.vabaliige = v;
    }
}

// Funktsioon y väärtuste massiivi arvutamiseks
export function arvutaYMassiiv(xs: number[], vorrand: LineaarvorrandLiides): number[] {
    return xs.map(x => {
        vorrand.arvutaY(x);
        return vorrand.saaY();
    });
}

// Funktsioon y-väärtuste arvutamiseks x-i vahemikus
export function arvutaYVahemikus(minX: number, maxX: number, a: number, b: number): number[] {
    let yVaartused = [];
    let vorrand: LineaarvorrandLiides;

    // Kui b = 0 siis esimene variant
    if (b === 0) {
        vorrand = new LineaarVorrand(a);
    } else {
        vorrand = new LineaarVorrandVabaliikmega(a, b);
    }

    // Arvutab y väärtuse iga x väärtus korral vahemikus
    for (let x = minX; x <= maxX; x++) {
        vorrand.arvutaY(x);
        yVaartused.push(vorrand.saaY());
    }
    return yVaartused;
}

// Funktsioon nullkoha leidmiseks antud vahemikus
export function leiaNullkoht(minX: number, maxX: number, a: number, b: number): number | null {
    const yVaartused = arvutaYVahemikus(minX, maxX, a, b);
    for (let i = 0; i < yVaartused.length - 1; i++) {
        // Kontrollib, kas y märk muutub (mis näitab x teljega lõikumist ehk nullkohta)
        if (yVaartused[i] * yVaartused[i + 1] <= 0) {
            // Nullkoha ligikaudne arvutamine
            let nullKoht = minX + i + (minX + i + 1 - (minX + i)) * (Math.abs(yVaartused[i]) / (Math.abs(yVaartused[i]) + Math.abs(yVaartused[i + 1])));
            return nullKoht;
        }
    }
    return null; // Kui pole, siis NULL!
}

