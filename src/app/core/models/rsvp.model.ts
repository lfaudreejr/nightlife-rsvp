export class RsvpModel {
  constructor(
    public yelpId: string,
    public guest: { id: string; date: number }
  ) {}
}
