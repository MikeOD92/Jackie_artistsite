import { ExternalLinks } from "./external_links";

export class SiteData {
  id: Number;
  name: string;
  text: string;
  links: Array<ExternalLinks>;

  constructor(id = 0, name = "", text = "", links = []) {
    this.id = id;
    this.name = name;
    this.text = text;
    this.links = links;
  }
}
