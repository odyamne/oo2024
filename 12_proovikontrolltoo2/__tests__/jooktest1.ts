import { Jook, Joogipudel } from '../joogid';


describe('Joogipudel', () => {
    test('mass ilma joogita', () => {
        const pudel = new Joogipudel(0.5, 'klaas', 200, 0.10);
        expect(pudel.koguMass()).toEqual(200);
    });

    test('mass joogiga', () => {
        const jook = new Jook('Limonaad', 0.8, 1.0); //0.8eur/liiter, 1 liiter 
        const pudel = new Joogipudel(1.0, 'plastik', 0.1, 0.10, jook);
        expect(pudel.koguMass()).toEqual(1.1);
    });

    test('omahind joogita', () => {
        const pudel = new Joogipudel(0.5, 'plastik', 100, 0.10);
        expect(pudel.koguOmahind()).toEqual(0.10);
    });

    test('omahind koos joogiga', () => {
        const jook = new Jook('Õlu', 1.5, 1.0);
        const pudel = new Joogipudel(0.5, 'klaas', 200, 0.10, jook);
        expect(pudel.koguOmahind()).toEqual(0.85); 
        });
});

describe("Joogivaat", () => {
});

describe("Pudelikast", () => {
});