export class ExternalLinks {
  id: Number;
  title: string;
  text: string;
  url: string;
  page: Number;

  constructor(id = 0, title = "", text = "", url = "", page = 0) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.url = url;
    this.page = page;
  }
}
