export interface IStep {
  title?: string;
  text?: string;
  active?: boolean;
  completed?: boolean;
}

export class Step implements IStep {
  constructor(public title?: string, public text?: string, public active?: boolean, public completed?: boolean) {
  }
}
