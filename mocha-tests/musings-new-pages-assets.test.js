// Regression coverage for the two new Musings pages (TODO #9c): their
// currentContent objects reference image assets by path string, with
// nothing type-checking those strings against what's actually on disk.
// Asserts every image path referenced in either page's .ts source points
// at a real file, and that both banner background images (referenced from
// the shared musings-jumbotron sass mixin) exist too.

const path = require('path')
const fs = require('fs')
const expect = require('expect.js')

const ASSETS_DIR = path.join(__dirname, '../src/assets')

function extractImagePaths(tsSource) {
  return [...tsSource.matchAll(/['"](\.\.\/[^'"]+\.(?:png|jpe?g))['"]/g)].map(m => m[1])
}

function assetExists(relativePath) {
  // These are ../../../../assets/<file> paths, same depth convention as
  // the already-working rpi-twonky/ubuntu-hd-audio pages.
  const filename = path.basename(relativePath)
  return fs.existsSync(path.join(ASSETS_DIR, filename))
}

describe('tls-cloudflare-and-heroku.component.ts image assets', () => {
  let imagePaths

  before(() => {
    const source = fs.readFileSync(
      path.join(__dirname, '../src/app/musings/tls-cloudflare-and-heroku/tls-cloudflare-and-heroku.component.ts'),
      'utf8'
    )
    imagePaths = extractImagePaths(source)
  })

  it('finds every referenced image (6 cloudflare, 3 terminal, 1 heroku)', () => {
    expect(imagePaths.length).to.be(10)
  })

  it('points every referenced image at a file that actually exists', () => {
    imagePaths.forEach(p => {
      expect(assetExists(p)).to.be(true)
    })
  })
})

describe('tls-for-local-lab.component.ts image assets', () => {
  let imagePaths

  before(() => {
    const source = fs.readFileSync(
      path.join(__dirname, '../src/app/musings/tls-for-local-lab/tls-for-local-lab.component.ts'),
      'utf8'
    )
    imagePaths = extractImagePaths(source)
  })

  it('finds every referenced image (1 twonky, 2 cloudflare, 2 pihole, 1 jupyterlab)', () => {
    expect(imagePaths.length).to.be(6)
  })

  it('points every referenced image at a file that actually exists', () => {
    imagePaths.forEach(p => {
      expect(assetExists(p)).to.be(true)
    })
  })
})

describe('new Musings pages banner images', () => {
  it('tls-cloudflare-and-heroku banner images exist', () => {
    expect(fs.existsSync(path.join(ASSETS_DIR, 'flyd-ZNOxwCEj5mw-unsplash-640w.jpeg'))).to.be(true)
    expect(fs.existsSync(path.join(ASSETS_DIR, 'flyd-ZNOxwCEj5mw-unsplash-1000w.jpeg'))).to.be(true)
  })

  it('tls-for-local-lab banner images exist', () => {
    expect(fs.existsSync(path.join(ASSETS_DIR, 'markus-winkler-SZ98vfIx0pw-unsplash-640w.jpeg'))).to.be(true)
    expect(fs.existsSync(path.join(ASSETS_DIR, 'markus-winkler-SZ98vfIx0pw-unsplash-1000w.jpeg'))).to.be(true)
  })
})

// todo.md item 11: devicon.min.css never actually had a jupyter glyph, so
// the musings-home card icon for this page was silently rendering nothing.
// Replaced with a real image asset instead of the font glyph.
describe('tls-for-local-lab musings-home card icon', () => {
  it('devicon-jupyter-original.svg exists', () => {
    expect(fs.existsSync(path.join(ASSETS_DIR, 'devicon-jupyter-original.svg'))).to.be(true)
  })
})
