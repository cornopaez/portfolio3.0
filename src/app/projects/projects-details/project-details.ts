export class ProjectDetails {
  view_title: string
  content: {
    image?: string
    description: string
    source: string
    footer: string
    icons: string[]
    imageStyle?: string
    link?: string
  }
  indexDescription?: string
  indexKeywords?: string
  title?: string
}