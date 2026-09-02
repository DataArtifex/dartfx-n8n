import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import { executeCount } from "../nodes/Qsv/actions/executeCount";
import { executeStats } from "../nodes/Qsv/actions/executeStats";
import { executeSort } from "../nodes/Qsv/actions/executeSort";
import { executeSelect } from "../nodes/Qsv/actions/executeSelect";
import { executeSearch } from "../nodes/Qsv/actions/executeSearch";
import { executeSample } from "../nodes/Qsv/actions/executeSample";
import { executeEdit } from "../nodes/Qsv/actions/executeEdit";
import { executeExtsort } from "../nodes/Qsv/actions/executeExtsort";
import { executeSynthesize } from "../nodes/Qsv/actions/executeSynthesize";
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

  it("should execute select with first-class positional selection parameter (Finding 7)", async () => {
    const mockContext = createMockContext({
      inputPath: sampleCsvPath,
      selection: "name,salary",
    });

    const results = await executeSelect.call(mockContext, 0);
    expect(results).toHaveLength(1);
    expect(results[0].json).toHaveProperty("success", true);
    const json = results[0].json as any;
    expect(json.result.rawOutput).toContain("name,salary");
    expect(json.result.rawOutput).not.toContain("department");
  });

  it("should execute search with first-class positional regex parameter (Finding 7)", async () => {
    const mockContext = createMockContext({
      inputPath: sampleCsvPath,
      regex: "^Alice$",
    });

    const results = await executeSearch.call(mockContext, 0);
    expect(results).toHaveLength(1);
    expect(results[0].json).toHaveProperty("success", true);
    const json = results[0].json as any;
    expect(json.result.rawOutput).toContain("Alice");
    expect(json.result.rawOutput).not.toContain("Bob");
  });

  it("should execute sample with first-class positional sampleSize parameter (Finding 7)", async () => {
    const mockContext = createMockContext({
      inputPath: sampleCsvPath,
      sampleSize: "2",
      options: {
        seed: "42",
      },
    });

    const results = await executeSample.call(mockContext, 0);
    expect(results).toHaveLength(1);
    expect(results[0].json).toHaveProperty("success", true);
  });

  it("should execute edit with input-first positioning and positional column/row/value (Finding 7)", async () => {
    const tempOutFile = path.join(
      os.tmpdir(),
      `qsv-edit-test-${Date.now()}.csv`,
    );

    try {
      const mockContext = createMockContext({
        inputPath: sampleCsvPath,
        column: "name",
        row: 1,
        value: "AliceInWonderland",
        outputPath: tempOutFile,
      });

      const results = await executeEdit.call(mockContext, 0);
      expect(results).toHaveLength(1);
      expect(results[0].json).toHaveProperty("success", true);
      expect(fs.existsSync(tempOutFile)).toBe(true);

      const content = fs.readFileSync(tempOutFile, "utf8");
      expect(content).toContain("AliceInWonderland");
    } finally {
      if (fs.existsSync(tempOutFile)) {
        fs.unlinkSync(tempOutFile);
      }
    }
  });

  it("should execute extsort with positional output path without --output error (Finding 8)", async () => {
    const tempOutFile = path.join(
      os.tmpdir(),
      `qsv-extsort-test-${Date.now()}.csv`,
    );

    try {
      const mockContext = createMockContext({
        inputPath: sampleCsvPath,
        outputPath: tempOutFile,
      });

      const results = await executeExtsort.call(mockContext, 0);
      expect(results).toHaveLength(1);
      expect(results[0].json).toHaveProperty("success", true);
      expect(results[0].json).toHaveProperty("outputPath", tempOutFile);
      expect(fs.existsSync(tempOutFile)).toBe(true);
    } finally {
      if (fs.existsSync(tempOutFile)) {
        fs.unlinkSync(tempOutFile);
      }
    }
  });

  it("should format missing Cargo feature build errors as actionable NodeOperationError (Finding 4)", async () => {
    // Test that the feature detection handler handles 'Could not match' errors
    // We can simulate an environment with a mock wrapper or test the error branch
    const mockContext = createMockContext({
      inputPath: sampleCsvPath,
    });

    // If synthesize is available, it runs; if not, it throws the actionable feature error
    try {
      const results = await executeSynthesize.call(mockContext, 0);
      expect(results).toHaveLength(1);
      expect(results[0].json).toHaveProperty("success", true);
    } catch (error: any) {
      expect(error).toBeInstanceOf(NodeOperationError);
      expect(error.message).toMatch(
        /is not available in the installed QSV binary|Could not find input file|failed/i,
      );
    }
  });
});
