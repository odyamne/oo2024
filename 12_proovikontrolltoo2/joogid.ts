export class Jook {
    nimetus: string;
    liitriOmahind: number;
    erikaal: number;

    constructor(nimetus: string, liitriOmahind: number, erikaal: number) {
        this.nimetus = nimetus;
        this.liitriOmahind = liitriOmahind;
        this.erikaal = erikaal;
    }
}

export class Joogipudel {
    maht: number;
    pudelityyp: string;
    mass: number;
    taaraMaksumus: number;
    jook: Jook | null;

    constructor(maht: number, pudelityyp: string, mass: number, taaraMaksumus: number, jook: Jook | null = null) {
        this.maht = maht;
        this.pudelityyp = pudelityyp;
        this.mass = mass;
        this.taaraMaksumus = taaraMaksumus;
        this.jook = jook;
    }

    koguMass(): number {
        return this.mass + (this.jook ? this.jook.erikaal * this.maht : 0);
    }

    koguOmahind(): number {
        return this.taaraMaksumus + (this.jook ? this.jook.liitriOmahind * this.maht : 0);
    }
}

