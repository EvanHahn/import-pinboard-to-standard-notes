const convert = require('./convert')
const isUuid = require('is-uuid')

const exampleInput = [
  {
    href: 'http://example.com/',
    description: 'An example description',
    extended: '',
    meta: 'ed5207239537429aa999bc3f89ad873f', hash: '96b72410cbd747aa998f418a7967796e',
    time: '2017-04-20T04:20:09Z',
    shared: 'no',
    toread: 'no',
    tags: ''
  },
  {
    href: 'https://example.com/bingbong',
    description: 'Another example',
    extended: 'More extended description',
    meta: '002cf937e9a84c5fa06c7a062f61a9ed',
    hash: '280ce59cc3034cff989c8ac8b435d842',
    time: '2017-06-09T06:09:42Z',
    shared: 'no',
    toread: 'no',
    tags: 'wow example tags'
  }
]

test('converts an empty list', function () {
  expect(convert([])).toEqual({items: []})
})

test('converts a list with a few bookmarks', function () {
  const result = convert(exampleInput)

  expect(Object.keys(result)).toEqual(['items'])

  const itemsWithoutUuids = result.items.map((item) => {
    const copy = Object.assign({}, item)
    delete copy.uuid
    return copy
  })

  expect(itemsWithoutUuids).toEqual([
    {
      created_at: '2017-04-20T04:20:09Z',
      updated_at: '2017-04-20T04:20:09Z',
      content_type: 'Note',
      content: {
        title: 'An example description',
        text: 'http://example.com/',
        references: []
      }
    },
    {
      created_at: '2017-06-09T06:09:42Z',
      updated_at: '2017-06-09T06:09:42Z',
      content_type: 'Note',
      content: {
        title: 'Another example',
        text: [
          'https://example.com/bingbong',
          '',
          'More extended description',
          '',
          'tags: wow example tags'
        ].join('\n'),
        references: []
      }
    }
  ])

  result.items.forEach(({ uuid }) => {
    expect(isUuid.v4(uuid)).toBeTruthy()
  })
})

test('converts a bookmark with URL only', function () {
  const bookmark = {
    href: 'http://example.com/',
    description: '',
    extended: '',
    meta: 'ed5207239537429aa999bc3f89ad873f',
    hash: '96b72410cbd747aa998f418a7967796e',
    time: '2017-04-20T04:20:09Z',
    shared: 'no',
    toread: 'no',
    tags: ''
  }

  const converted = convert([bookmark]).items[0].content
  expect(converted).toEqual({
    title: 'http://example.com/',
    text: 'http://example.com/',
    references: []
  })
})
