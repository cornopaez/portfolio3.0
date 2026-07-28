// Regression coverage for a bug where project detail banners silently
// failed to load: projects-details.component.sass used relative url()
// paths (e.g. '../assets/foo.png'). Those get inlined into an SSR-rendered
// <style> block, where a relative url() resolves against the current page
// URL, not this file's location -- and Angular's SSR style-inlining also
// strips the relative prefix down to a bare filename on top of that. Either
// way the browser ends up requesting e.g. /Projects/PYTDance/foo.png
// instead of /assets/foo.png, which "succeeds" (200) against the SPA's
// catch-all route but returns HTML, not the image. Compiling the real
// source file here (rather than asserting against a copy/regex of the
// source) means this fails the moment anyone reintroduces a relative path.

const path = require('path')
const fs = require('fs')
const sass = require('sass')
const expect = require('expect.js')

const SASS_FILE = path.join(__dirname, '../src/app/projects/projects-details/projects-details.component.sass')
const ASSETS_DIR = path.join(__dirname, '../src/assets')

describe('projects-details.component.sass banner images', () => {
  let backgroundImageUrls

  before(() => {
    const result = sass.compile(SASS_FILE, { logger: sass.Logger.silent })
    backgroundImageUrls = [...result.css.matchAll(/background-image:\s*url\("([^"]+)"\)/g)].map(m => m[1])
  })

  it('finds a background-image rule for every project banner (sanity check that the regex above still matches)', () => {
    // 8 project classes (.portfolio, .dance, .murders, .health, .mongomart,
    // .bank, .portfolio2, .portfolio3), each with a small/big variant.
    expect(backgroundImageUrls.length).to.be(16)
  })

  it('uses an absolute /assets/ path for every banner image (regression: relative ../assets/ paths broke on the SSR-rendered detail pages)', () => {
    backgroundImageUrls.forEach(url => {
      expect(url).to.match(/^\/assets\//)
    })
  })

  it('points every banner image at a file that actually exists', () => {
    backgroundImageUrls.forEach(url => {
      const assetPath = path.join(ASSETS_DIR, url.replace(/^\/assets\//, ''))
      expect(fs.existsSync(assetPath)).to.be(true)
    })
  })
})
