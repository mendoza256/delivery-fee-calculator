export type OrderType = {
  name: string;
  price: number;
}[];

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

export enum MinimumFee {
  TenEuros = 1000,
}
