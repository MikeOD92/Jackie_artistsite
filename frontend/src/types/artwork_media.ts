export class ArtWorkMedia {
  id: number;
  img: string;
  artwork: number;

  constructor(id = 0, img = "", artwork = 0) {
    this.id = id;
    this.img = img;
    this.artwork = artwork;
  }
}
