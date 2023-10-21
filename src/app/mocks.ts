import { IOption, ISegment,ISummary } from "./models";

export const mockOptions: IOption[] = [
    {
        time: 10,
        title: "Odber krvi",
        value: true
    }
]

export const tooltipOptionsMock = {
    'placement': 'bottom',
    'hideDelay': 0,
}

export const mockUserSumary: ISummary = {
    firstName: "Erik",
    lastName: "Hudcovský",
    examinationTime: 20,
    reservationDate: "20.9.2023",
    reservationTime: "12:30",
    options: mockOptions
} 

export const mockReservationBar: ISegment[] = [
    {
      reserved: false,
      mark: {hours: 12, minutes: 30},
      tooltipOptions: {'display': false}
    },
    {
      reserved: true,
      userSummary: mockUserSumary,
      tooltipOptions: tooltipOptionsMock
    },
    {
      reserved: true,
      userSummary: mockUserSumary,
      tooltipOptions: tooltipOptionsMock
    },
    {
      reserved: false,
      tooltipOptions: {'display': false}
    },
    {
      reserved: false,
      tooltipOptions: {'display': false}
    },
    {
      reserved: true,
      tooltipOptions: {'display': false}
    },
    {
      reserved: false,
      tooltipOptions: {'display': false}
    },
    {
      reserved: true,
      tooltipOptions: {'display': false}
    },
    {
      reserved: true,
      tooltipOptions: {'display': false}
    },
    {
      reserved: false,
      tooltipOptions: {'display': false}
    },
    {
      reserved: false,
      tooltipOptions: {'display': false}
    },
    {
      reserved: true,
      tooltipOptions: {'display': false}
    },
    {
      reserved: false,
      tooltipOptions: {'display': false}
    },
  ]