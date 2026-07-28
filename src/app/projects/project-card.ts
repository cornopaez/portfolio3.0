export class ProjectCard {
  card: {
    title : string
    subtitle? : string
    custom_html?: string
    image?: string
    background_image?: string
    icons? : {
      class_name?: string
      icons: string[]
    }
    card_class?: string
  }
  project_name?: string
}
