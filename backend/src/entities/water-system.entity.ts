export class WaterSystemEntity {
  _id?: string;
  reservoir: number;
  flow: number;
  generation: number;
  purity: number;
  createdAt?: Date;

  constructor(
    reservoir: number,
    flow: number,
    generation: number,
    purity: number,
  ) {
    this.reservoir = reservoir;
    this.flow = flow;
    this.generation = generation;
    this.purity = purity;
    this.createdAt = new Date();
  }
}
