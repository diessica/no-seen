const INSTAGRAM_KEY = 'instagram'
const FACEBOOK_KEY = 'facebook'
const BLOCKED_URLS = [
	'*://*.facebook.com/ajax/mercury/change_read_status.php*',
	'*://*.instagram.com/stories/reel/seen',
]

const shouldCancel = (url, storage) => {
	const isAble = key => url.includes(key) && storage.get()
		.then(s => s[key] !== false)

	return isAble(FACEBOOK_KEY) || isAble(INSTAGRAM_KEY)
}

const onCancel = ({ originUrl: url }) =>
	shouldCancel(url, browser.storage.sync)
		.then(cancel => ({ cancel }))

const init = () => browser.webRequest.onBeforeRequest
	.addListener(onCancel, { urls: BLOCKED_URLS }, ['blocking'])

if (typeof browser === 'undefined' && typeof exports !== 'undefined') {
	exports.shouldCancel = shouldCancel
} else {
	init()
}