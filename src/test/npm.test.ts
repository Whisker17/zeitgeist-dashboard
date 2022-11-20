import { MetricsApi } from "../services/metrics-api.service";

describe("npm test", () => {
  describe("get Date", () => {
    it("should format NpmDownloads to NpmDownloadsChart", () => {
      // Given
      const expected = "2022-11-19";

      // When
      const result = new Date(
        Date.now() -
          1 * 864e5 -
          new Date(Date.now() - 1 * 864e5).getTimezoneOffset() * 6e4
      )
        .toISOString()
        .split("T")[0];

      // Then
      expect(result).toStrictEqual(expected);
    });
    it("should format NpmDownloads to NpmDownloadsChart when cumulative is true", () => {
      // Given
      const npmDownloads = aNpmDownloads();
      const expected = aCumulativeNpmDownloadsChart();

      // When
      const result = MetricsApi.fetchNpmDownloads(
        "@zeitgeistpm/sdk",
        "2022-11-12"
      );

      // Then
      expect(result).toStrictEqual(expected);
    });
  });
});
