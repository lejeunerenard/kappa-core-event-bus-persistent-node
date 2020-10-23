const EventBusPersistentNode = require('../')

const verbose = true
const name = process.argv[2]
const storage = process.argv[3]

const node = new EventBusPersistentNode(name, storage)
function verboseFeed (feed) {
  feed.createReadStream({ live: true })
    .on('data', (data) => {
      if (data.timestamp) {
        console.log(data.timestamp, data.event, ...data.data)
      } else {
        console.log(null, data.event, ...data.data)
      }
    })
}
if (verbose) {
  node.bus.loaded.then(() => {
    for (let feed of node.bus.core.feeds()) {
      verboseFeed(feed)
    }

    node.bus.core._logs.on('feed', (feed) => {
      verboseFeed(feed)
    })
  })
}
