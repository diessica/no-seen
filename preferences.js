const INSTAGRAM_KEY = 'instagram'
const FACEBOOK_KEY = 'facebook'
const KEYS = [INSTAGRAM_KEY, FACEBOOK_KEY]

const setPreference = (value = true, key) =>
    document.querySelector(`#${key}`).checked = value

const savePreferences = () => browser.storage.sync.set({
    [INSTAGRAM_KEY]: document.querySelector(`#${INSTAGRAM_KEY}`).checked,
    [FACEBOOK_KEY]: document.querySelector(`#${FACEBOOK_KEY}`).checked,
})

function restorePreferences () {
    const setKey = key => browser.storage.sync
        .get()
        .then(s => setPreference(s[key], key))

    KEYS.forEach(setKey)
}

document.addEventListener('DOMContentLoaded', restorePreferences)
document.querySelector('#save').addEventListener('click', savePreferences)