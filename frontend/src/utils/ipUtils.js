const requestHost = 'http://localhost'
const requestPort = 8720
const snippetUrl = `${requestHost}:${requestPort}/snippet`

function getIP (success, error) {
  let url = `${requestHost}:${requestPort}/getIP`
  this.$axios.get(url).then(success, error)
}

function getSnippet (success, error) {
  let url = `${requestHost}:${requestPort}/getSnippet`
  this.$axios.get(url).then(success, error)
}

export default {
  snippetUrl,
  requestPort,
  getIP,
  getSnippet
}
