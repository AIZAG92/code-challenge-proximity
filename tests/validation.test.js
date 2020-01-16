const validation = require('../utils/validation');

describe('validation', () => {

    const invalidProvider = {
        errors: { providerName: 'provider name is required' },
        isValid: false
    }
    test('If the provider name doesnot exist should give a msj', () => {
        expect(validation({ file: { path: {} }, providerName: null })).toStrictEqual(invalidProvider)
    });

    const invalidFile = {
        errors: { providerName: 'file is required' },
        isValid: false
    }
    test('If the file doesnot exist should give a msj', () => {
        expect(validation({ file: {}, providerName: 'ana' })).toStrictEqual(invalidFile)
    });
});