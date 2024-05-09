
import { LineaarVorrand, LineaarVorrandVabaliikmega, arvutaYMassiiv, arvutaYVahemikus, leiaNullkoht } from '../joon';

describe('LineaarVorrand', () => {
    let vorrand: LineaarVorrand;

    beforeEach(() => {
        vorrand = new LineaarVorrand(3); // X-i ees on 3
    });

    test('y kui x = 1', () => {
        vorrand.arvutaY(1);
        expect(vorrand.saaY()).toBe(3);
    });

    test('y kui x = 2', () => {
        vorrand.arvutaY(2);
        expect(vorrand.saaY()).toBe(6);
    });

    test('y kui x = 0', () => {
        vorrand.arvutaY(0);
        expect(vorrand.saaY()).toBe(0);
    });

    test('y väärtus muutub erinevate x korral', () => {
        vorrand.arvutaY(1);
        expect(vorrand.saaY()).toBe(3);
        vorrand.arvutaY(10);
        expect(vorrand.saaY()).toBe(30);
    });
});

describe('LineaarVorrandVabaliikmega', () => {
    let vorrandVabaliikmega: LineaarVorrandVabaliikmega;

    beforeEach(() => {
        vorrandVabaliikmega = new LineaarVorrandVabaliikmega(3, 2);
    });

    test('y = 3x + 2, kui x = 1', () => {
        vorrandVabaliikmega.arvutaY(1);
        expect(vorrandVabaliikmega.saaY()).toBe(5);
    });

    test('Muuda vabaliiget', () => {
        vorrandVabaliikmega.sisestaVabaliige(3);
        vorrandVabaliikmega.arvutaY(1);
        expect(vorrandVabaliikmega.saaY()).toBe(6);
    });
    test('y = 3x, kui vabaliige on 0', () => {
        let vorrandVabaliigeNulliga = new LineaarVorrandVabaliikmega(3, 0);
        vorrandVabaliigeNulliga.arvutaY(1);
        expect(vorrandVabaliigeNulliga.saaY()).toBe(3);
        vorrandVabaliigeNulliga.arvutaY(2);
        expect(vorrandVabaliigeNulliga.saaY()).toBe(6);
    });
});

describe('arvutaYMassiiv', () => {
    const vorrand = new LineaarVorrand(3);

    test('Arvuta y väärtused massiivile [0, 1, 2]', () => {
        expect(arvutaYMassiiv([0, 1, 2], vorrand)).toEqual([0, 3, 6]);
    });
});

describe('Vahemikud', () => {
    test('arvuta y-väärtused kui y = 2x vahemikus -5<=x<=5', () => {
        expect(arvutaYVahemikus(-5, 5, 2, 0)).toEqual([-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
    });

    test('arvuta y-väärtused kui y = 2x + 1 vahemikus -5<=x<=5', () => {
        expect(arvutaYVahemikus(-5, 5, 2, 1)).toEqual([-9, -7, -5, -3, -1, 1, 3, 5, 7, 9, 11]);
    });
});

describe('Nullkohtade leidmine', () => {
    test('Nullkoht kui y = 2x, -5<=x<=5', () => {
        expect(leiaNullkoht(-5, 5, 2, 0)).toBeCloseTo(0);
    });

    test('Nullkoht kui y = 2x + 1, -5<=x<=5', () => {
        expect(leiaNullkoht(-5, 5, 2, 1)).toBeCloseTo(-0.5);
    });

    test('Kontroll: Nullkoht peaks puuduma kui y = 2x + 10, -4<=x<=5', () => {
        expect(leiaNullkoht(-4, 5, 2, 10)).toBeNull();
    });
});



