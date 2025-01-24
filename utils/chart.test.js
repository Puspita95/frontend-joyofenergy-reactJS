import * as chartJs from "chart.js";
import Chart from 'chart.js/auto';
import { formatDateLabel, renderChart } from "./chart";

jest.mock('chart.js', () => {
  const originalModule = jest.requireActual('chart.js');
  const mockChart = jest.fn();
  mockChart.prototype.destroy = jest.fn();
  return{
    ...originalModule,
    renderChart: jest.fn().mockImplementation(() => {
      return {
        Chart: mockChart,
      };
    }),
  }
});

describe("#chart formatDateLabel", () => {
  // Reset chart mock and clear mock calls
  beforeEach(() => {
    chartJs.Chart.destroy();
    jest.resetAllMocks();
    
  });
  it("should format date label", () => {
    expect(formatDateLabel(new Date(2021, 0, 1).getTime())).toBe("01/01");
    expect(formatDateLabel(new Date(2021, 1, 1).getTime())).toBe("01/02");
    expect(formatDateLabel(new Date(2021, 5, 1).getTime())).toBe("01/06");
    expect(formatDateLabel(new Date(2021, 11, 1).getTime())).toBe("01/12");
    expect(formatDateLabel(new Date(2021, 11, 25).getTime())).toBe("25/12");
    expect(formatDateLabel(new Date(2021, 11, 31).getTime())).toBe("31/12");
  });
  test("creates a new chart when object is not provided",()=>{
    const containerId="new-usageChart";
    const reading=[{time:new Date(),value:10}]
    renderChart(containerId,reading);
    expect(Chart.defaults.font.size).toBe("10px");
  })
});
