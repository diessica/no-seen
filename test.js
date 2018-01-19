const { shouldCancel } = require('./index')

const mockStorage = state => ({
    get: () => new Promise(resolve => resolve(state))
})

describe('shouldCancel', () => {
    it('should cancel by default', async () => {
        const storage = mockStorage({})
        const onShouldCancel = await shouldCancel('https://facebook.com/woah', storage)

        expect(onShouldCancel).toEqual(true)
    })

    it('should cancel', async () => {
        const storage = mockStorage({
            facebook: true,
        })
        const onShouldCancel = await shouldCancel('https://facebook.com/woah', storage)

        expect(onShouldCancel).toEqual(true)
    })

    it('should not cancel', async () => {
        const storage = mockStorage({
            instagram: false,
            facebook: true,
        })
        const onShouldCancel = await shouldCancel('https://instagram.com/bananas', storage)

        expect(onShouldCancel).toEqual(false)
    })
})