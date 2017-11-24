var uuid = require('uuid/v4')

module.exports = function (input) {
  return {
    items: input.map(function (bookmark) {
      var description = bookmark.description.trim()
      var extended = bookmark.extended.trim()
      var tags = bookmark.tags.trim()

      var title = description || bookmark.href

      var text = [bookmark.href]
      if (extended) { text.push(extended) }
      if (tags) { text.push('tags: ' + tags) }
      text = text.join('\n\n')

      return {
        created_at: bookmark.time,
        updated_at: bookmark.time,
        uuid: uuid(),
        content_type: 'Note',
        content: {
          title: title,
          text: text,
          references: []
        }
      }
    })
  }
}
