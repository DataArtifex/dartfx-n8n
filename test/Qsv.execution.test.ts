import * as path from "path";
import { executeCount } from "../nodes/Qsv/actions/executeCount";
import { executeStats } from "../nodes/Qsv/actions/executeStats";
import { NodeOperationError } from "n8n-workflow";

function createMockContext(params: Record<string, any>) {
  return {
    getNodeParameter: (
      paramName: string,
      _itemIndex: number,
      defaultValue?: any,
    ) => {
      return params[paramName] !== undefined ? params[paramName] : defaultValue;
    },
    getNode: () => ({
      name: "qsv",
      type: "n8n-nodes-dartfx.qsv",
      typeVersion: 1,
      position: [0, 0] as [number, number],
      parameters: {},
    }),
  } as any;
}

describe("Qsv Action Execution & Error Handling", () => {
  const sampleCsvPath = path.resolve(__dirname, "fixtures/sample.csv");

  it("should throw NodeOperationError when inputPath is missing", async () => {
    const mockContext = createMockContext({ inputPath: "" });

    await expect(executeCount.call(mockContext, 0)).rejects.toThrow(
      NodeOperationError,
    );
    await expect(executeCount.call(mockContext, 0)).rejects.toThrow(
      "Input CSV file path is required.",
    );
  });

  it("should throw a helpful error message when QSV binary is not found (ENOENT)", async () => {
    const originalBin = process.env.DARTFX_QSV_BIN_PATH;
    process.env.DARTFX_QSV_BIN_PATH = "/path/to/nonexistent/qsv_binary_xyz";

    try {
      const mockContext = createMockContext({ inputPath: sampleCsvPath });
      await expect(executeCount.call(mockContext, 0)).rejects.toThrow(
        /The QSV CLI binary \('.*'\) was not found/,
      );
    } finally {
      if (originalBin !== undefined) {
        process.env.DARTFX_QSV_BIN_PATH = originalBin;
      } else {
        delete process.env.DARTFX_QSV_BIN_PATH;
      }
    }
  });

  it("should successfully execute qsv count on a valid CSV file", async () => {
    const mockContext = createMockContext({
      inputPath: sampleCsvPath,
    });

    const results = await executeCount.call(mockContext, 0);
    expect(results).toHaveLength(1);
    expect(results[0].json).toHaveProperty("success", true);
    expect(results[0].json).toHaveProperty("command", "count");
  });

  it("should successfully execute qsv stats on a valid CSV file", async () => {
    const mockContext = createMockContext({
      inputPath: sampleCsvPath,
      everything: true,
    });

    const results = await executeStats.call(mockContext, 0);
    expect(results).toHaveLength(1);
    expect(results[0].json).toHaveProperty("success", true);
    expect(results[0].json).toHaveProperty("command", "stats");
  });
});
