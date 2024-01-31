export type RushHourType = {
  dayOfWeek: Days;
  startHour: number;
  endHour: number;
};

export enum Days {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export enum Euros {
  One = 100,
  OneTwenty = 120,
  Two = 200,
  Ten = 1000,
  Fifteen = 1500,
  TwoHundred = 20000,
}

export enum Cents {
  Fifty = 50,
}

export enum Distance {
  OneKm = 1000,
  FiveHundredM = 500,
}
