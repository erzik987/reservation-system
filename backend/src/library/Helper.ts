import Reservation, { Time } from '../models/Reservation';

export default class Helper {
  public static computeTime(time: Time, numberOfMinutes: number, subtract: boolean = false) {
    const minutes = time.hours * 60 + time.minutes;
    const totalMinutes = subtract ? minutes - numberOfMinutes : minutes + numberOfMinutes;

    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;

    return { hours: newHours, minutes: newMinutes };
  }

  public static getTotalMinutesFromTime(time: Time) {
    return time.hours * 60 + time.minutes;
  }

  // public static isTimeRangeAvailable = async (startTime: Time, endTime: Time) => {
  //   const existingReservation = await Reservation.findOne({
  //     $or: [{ $and: [{ reservedTime: { $lte: startTime } }, { endTime: { $gte: startTime } }] }, { $and: [{ startTime: { $lte: endTime } }, { endTime: { $gte: endTime } }] }]
  //   });

  //   return !existingReservation;
  // };

  public static transformTime = (time: Time, baseDate: Date = new Date()) => {
    return new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), time.hours, time.minutes);
  };
}
