// Regression coverage for the About page's EDUCATION content: entries
// embed raw HTML (rendered via [innerHTML]) that can reference asset files
// by path. Nothing type-checks those strings, so a typo'd or missing asset
// fails silently as a dead link in the rendered page. This asserts every
// /assets/ href found in EDUCATION.entities actually resolves to a real
// file on disk.

const path = require('path')
const fs = require('fs')
const expect = require('expect.js')

const { EDUCATION } = require('../src/app/about/about.ts')
const ASSETS_DIR = path.join(__dirname, '../src/assets')

describe('about.ts EDUCATION asset links', () => {
  let assetHrefs

  before(() => {
    const allPoints = EDUCATION.entities.flatMap(entity => entity.points)
    assetHrefs = allPoints
      .flatMap(point => [...point.matchAll(/href="(\/assets\/[^"]+)"/g)].map(m => m[1]))
  })

  it('finds the eCornell Machine Learning certificate link', () => {
    expect(assetHrefs).to.contain('/assets/eCornell-MLCertificateReport.pdf')
  })

  it('points every referenced asset at a file that actually exists', () => {
    assetHrefs.forEach(href => {
      const assetPath = path.join(ASSETS_DIR, href.replace(/^\/assets\//, ''))
      expect(fs.existsSync(assetPath)).to.be(true)
    })
  })
})
