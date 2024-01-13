import { IOption, ISegment, IReservation } from './models';

export const mockOptions: IOption[] = [
  {
    time: 10,
    title: 'Odber krvi',
    value: true
  }
];

export const tooltipOptionsMock = {
  placement: 'bottom',
  hideDelay: 0
};

// export const mockUserSumary: IReservation = {
//   firstName: 'Erik',
//   lastName: 'Hudcovský',
//   duration: 20,

//   reservedDate: {
//     dayInMonth: 20,
//     month: 11,
//     year: 2023
//   },
//   email: 'iausd@asd.com',
//   reservedStartTime: 485,
//   reservedEndTime: 495,
//   // reservedTime: {
//   //   hours: 12,
//   //   minutes: 30
//   // },
//   visitReasons: mockOptions
// };

export const mockReservationBar: ISegment[] = [
  {
    reserved: false,
    timeFrom: 480,
    timeTo: 485,
    displayTime: true
  },
  {
    reserved: true,
    // userSummary: mockUserSumary,
    timeFrom: 480,
    timeTo: 485
  },
  {
    reserved: true,
    // userSummary: mockUserSumary,
    timeFrom: 480,
    timeTo: 485
  },
  {
    reserved: false,
    timeFrom: 480,
    timeTo: 485
  },
  {
    reserved: false,
    timeFrom: 480,
    timeTo: 485
  },
  {
    reserved: true,
    timeFrom: 480,
    timeTo: 485
  },
  {
    reserved: false,
    timeFrom: 480,
    timeTo: 485,
    displayTime: true
  },
  {
    reserved: true,
    timeFrom: 480,
    timeTo: 485
  },
  {
    reserved: true,
    timeFrom: 480,
    timeTo: 485
  },
  {
    reserved: false,
    timeFrom: 480,
    timeTo: 485
  },
  {
    reserved: false,
    timeFrom: 480,
    timeTo: 485
  },
  {
    reserved: true,
    timeFrom: 480,
    timeTo: 485
  },
  {
    reserved: false,
    timeFrom: 480,
    timeTo: 485
  }
];
