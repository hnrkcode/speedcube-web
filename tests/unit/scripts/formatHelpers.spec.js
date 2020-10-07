import * as formatHelpers from "@/scripts/formatHelpers";

describe("scripts/formatHelpers.js", () => {
  it("Format UTC date without format argument", () => {
    const date = "2020-01-01 20:00:00";

    try {
      expect(formatHelpers.formatDate(date)).toBe("2020-01-01 20:00:00");
    } catch {
      expect(formatHelpers.formatDate(date)).toBe("1/1/2020, 8:00:00 PM");
    }
  });
  it("Format UTC date with format argument", () => {
    const date = "2020-01-01 20:00:00";
    const format = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    try {
      expect(formatHelpers.formatDate(date, format)).toBe("2020-01-01");
    } catch {
      expect(formatHelpers.formatDate(date, format)).toBe("1/1/2020");
    }
  });
  it("Format milliseconds to readable time", () => {
    const fiveMin = 1000 * 60 * 5;
    const twelveSec = 1000 * 12;
    const overOneHour = 1000 * 60 * 60 * 1 + 1554;

    expect(formatHelpers.formatTime(fiveMin)).toBe("5:00.0");
    expect(formatHelpers.formatTime(twelveSec)).toBe("12.0");
    expect(formatHelpers.formatTime(overOneHour)).toBe("1:00:01.554");
  });
});
