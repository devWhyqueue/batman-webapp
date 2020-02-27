export interface JWT {
  token: string;
}

export class JWT implements JWT {

  constructor(public token: string) {
  }
}
