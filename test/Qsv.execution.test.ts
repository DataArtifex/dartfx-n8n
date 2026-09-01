import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import { executeCount } from "../nodes/Qsv/actions/executeCount";
import { executeStats } from "../nodes/Qsv/actions/executeStats";
import { executeSort } from "../nodes/Qsv/actions/executeSort";
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

  it("should correctly handle boolean options like noHeaders without invalid argument errors", async () => {
    const mockContext = createMockContext({
      inputPath: sampleCsvPath,
      options: {
        noHeaders: true,
        flexible: true,
      },
    });

    const results = await executeCount.call(mockContext, 0);
    expect(results).toHaveLength(1);
    expect(results[0].json).toHaveProperty("success", true);
    expect(results[0].json.command).toBe("count");
    // With no-headers, row count on 5-line CSV (header + 4 data) should be 5
    expect(results[0].json.result).toBe(5);
  });

  it("should return outputPath in JSON when outputPath is specified", async () => {
    const tempOutFile = path.join(
      os.tmpdir(),
      `qsv-sort-test-${Date.now()}.csv`,
    );

    try {
      const mockContext = createMockContext({
        inputPath: sampleCsvPath,
        outputPath: tempOutFile,
      });

      const results = await executeSort.call(mockContext, 0);
      expect(results).toHaveLength(1);
      expect(results[0].json).toHaveProperty("success", true);
      expect(results[0].json).toHaveProperty("outputPath", tempOutFile);
      expect(fs.existsSync(tempOutFile)).toBe(true);

      const content = fs.readFileSync(tempOutFile, "utf8");
      expect(content).toContain("Alice");
    } finally {
      if (fs.existsSync(tempOutFile)) {
        fs.unlinkSync(tempOutFile);
      }
    }
  });

  it("should handle quote-aware additionalArgs with spaces correctly", async () => {
    const mockContext = createMockContext({
      inputPath: sampleCsvPath,
      additionalArgs: '--select "name,salary" --nulls',
    });

    const results = await executeStats.call(mockContext, 0);
    expect(results).toHaveLength(1);
    expect(results[0].json).toHaveProperty("success", true);
  });

  it("should successfully execute qsv stats on a valid CSV file", async () => {
    const mockContext = createMockContext({
      inputPath: sampleCsvPath,
      options: {
        everything: true,
      },
    });

    const results = await executeStats.call(mockContext, 0);
    expect(results).toHaveLength(1);
    expect(results[0].json).toHaveProperty("success", true);
    expect(results[0].json).toHaveProperty("command", "stats");
  });
});
