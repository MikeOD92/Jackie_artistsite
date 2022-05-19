import { ArtWorkMedia } from "./artwork_media";

export class ArtWork {
  id: number;
  title: string;
  medium: string;
  dimensions: string;
  date: string;
  work_img: Array<ArtWorkMedia>;

  constructor(
    id = 0,
    title = "",
    medium = "",
    dimensions = "",
    date = "",
    work_img = []
  ) {
    this.id = id;
    this.title = title;
    this.medium = medium;
    this.dimensions = dimensions;
    this.date = date;
    this.work_img = [];
  }
}
