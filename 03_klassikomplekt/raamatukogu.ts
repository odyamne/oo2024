class Raamat {
    constructor(
        public isbn: string,
        public pealkiri: string, 
        public autor: string, 
        public avaldamisaasta: number) {}
}

class Kasutaja {
    constructor(
        public id: string, 
        public nimi: string, 
        public email: string) {}
}

class Raamatukogu {
    private raamatud: Map<string, Raamat> = new Map(); // Iga "Raamat" klassi elukas on 1 raamatud muutuja 
    private kasutajad: Map<string, Kasutaja> = new Map();
    private laenutatudRaamatud: Map<string, string> = new Map(); // Kaardistab ISBN-i kasutaja ID-le

    lisaRaamat(raamat: Raamat): void {
        this.raamatud.set(raamat.isbn, raamat);
    }

    naitaKoikiRaamatuid(): void {
        console.log("Raamatukogu kataloog:");
        this.raamatud.forEach((raamat, isbn) => {
            console.log(`ISBN: ${isbn}, Pealkiri: ${raamat.pealkiri}, Autor: ${raamat.autor}, Avaldamisaasta: ${raamat.avaldamisaasta}`);
        });
        if (this.raamatud.size === 0) {
            console.log("Raamatukogu on tühi :(");
        }
    }

    lisaKasutaja(kasutaja: Kasutaja): void {
        this.kasutajad.set(kasutaja.id, kasutaja);
    }

    laenutaRaamat(isbn: string, kasutajaId: string): string {
        if (!this.raamatud.has(isbn)) {
            return "Raamatut ei leitud.";
        }
        if (!this.kasutajad.has(kasutajaId)) {
            return "Kasutajat ei leitud.";
        }
        if (this.laenutatudRaamatud.has(isbn)) {
            return "Raamat on juba laenutatud.";
        }
        this.laenutatudRaamatud.set(isbn, kasutajaId);
        return "Laenutamine õnnestus.";
    }

    tagastaRaamat(isbn: string): string {
        if (!this.laenutatudRaamatud.has(isbn)) {
            return "See raamat ei olnud laenutatud.";
        }
        this.laenutatudRaamatud.delete(isbn);
        return "Raamat tagastati edukalt.";
    }

    naitaLaenutatudRaamatuid(): Map<string, string> {
        return this.laenutatudRaamatud;
    }
}

const raamatukogu = new Raamatukogu();
const raamat1 = new Raamat("9781473231061", "The Last Wish: Witcher 1", "Andrzej Sapkowski", 2020);
const kasutaja1 = new Kasutaja("123", "Ander Aava", "ander.aava@test.ee");

raamatukogu.lisaRaamat(raamat1);
raamatukogu.lisaKasutaja(kasutaja1);

raamatukogu.naitaKoikiRaamatuid();

console.log(raamatukogu.laenutaRaamat("9781473231061", "123"));
console.log(raamatukogu.naitaLaenutatudRaamatuid()); // Peaks andma Witcheri isbn ja kasutaja id sisaldava esimese kaardi
console.log(raamatukogu.tagastaRaamat("9781473231061")); // Peaks trükkima "Raamat tagastati edukalt."
console.log(raamatukogu.naitaLaenutatudRaamatuid()); // Peaks näitama tühja kaarti, kuna raamat on tagastatud
