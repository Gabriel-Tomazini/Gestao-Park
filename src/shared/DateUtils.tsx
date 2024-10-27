export class DateUtils {
  public static GetCurrentDateAsString(): string {
    const currentDate: Date = new Date();

    const formattedDateTime: string = currentDate.toLocaleString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return formattedDateTime;
  }

  public static GetCurrentDate(): Date {
    return new Date();
  }
}
