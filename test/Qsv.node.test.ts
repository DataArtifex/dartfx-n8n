import { Qsv } from "../nodes/Qsv/Qsv.node";

describe("Qsv Node Metadata & Structure", () => {
  const node = new Qsv();

  it("should have standard n8n node metadata", () => {
    expect(node.description).toBeDefined();
    expect(node.description.name).toBe("qsv");
    expect(node.description.displayName).toBe("QSV Data Wrangler");
    expect(node.description.icon).toBe("file:qsv.svg");
    expect(node.description.group).toContain("transform");
    expect(node.description.inputs).toEqual(["main"]);
    expect(node.description.outputs).toEqual(["main"]);
  });

  it("should include operation selector with essential tabular operations", () => {
    const operationProp = node.description.properties.find(
      (p) => p.name === "operation",
    );
    expect(operationProp).toBeDefined();
    expect(operationProp?.type).toBe("options");
    expect(operationProp?.default).toBe("stats");

    const opValues = (operationProp?.options || []).map(
      (opt: any) => opt.value,
    );
    expect(opValues).toContain("stats");
    expect(opValues).toContain("schema");
    expect(opValues).toContain("count");
    expect(opValues).toContain("frequency");
    expect(opValues).toContain("apply");
    expect(opValues).toContain("validate");
    expect(opValues).toContain("join");
    expect(opValues).toContain("sqlp");
    expect(opValues).toContain("to");
  });

  it("should exclude non-data, terminal, and interactive commands (Finding 6e)", () => {
    const operationProp = node.description.properties.find(
      (p) => p.name === "operation",
    );
    const opValues = (operationProp?.options || []).map(
      (opt: any) => opt.value,
    );
    expect(opValues).not.toContain("color");
    expect(opValues).not.toContain("lens");
    expect(opValues).not.toContain("prompt");
    expect(opValues).not.toContain("clipboard");
    expect(opValues).not.toContain("log");
    expect(opValues).not.toContain("clean");
    expect(opValues).not.toContain("help");
  });

  it("should tag feature-gated commands in dropdown descriptions (Finding 4)", () => {
    const operationProp = node.description.properties.find(
      (p) => p.name === "operation",
    );
    const sqlpOption = (operationProp?.options || []).find(
      (opt: any) => opt.value === "sqlp",
    );
    expect(sqlpOption?.name).toContain("[Feature: polars]");

    const synthOption = (operationProp?.options || []).find(
      (opt: any) => opt.value === "synthesize",
    );
    expect(synthOption?.name).toContain("[Feature: synthesize]");
  });

  it("should include first-class positional properties across operations (Finding 7)", () => {
    const selectionProp = node.description.properties.find(
      (p) => p.name === "selection",
    );
    expect(selectionProp).toBeDefined();

    const regexProp = node.description.properties.find(
      (p) => p.name === "regex",
    );
    expect(regexProp).toBeDefined();

    const sqlProp = node.description.properties.find((p) => p.name === "sql");
    expect(sqlProp).toBeDefined();
  });

  it("should include inputPath across operations", () => {
    const inputPathProp = node.description.properties.find(
      (p) => p.name === "inputPath",
    );
    expect(inputPathProp).toBeDefined();
    expect(inputPathProp?.type).toBe("string");
  });

  it("should reject unrecognized operations cleanly", async () => {
    const mockContext = {
      getInputData: () => [{ json: {} }],
      getNodeParameter: (name: string) =>
        name === "operation" ? "nonexistent_op" : "",
      getNode: () => ({ name: "qsv" }),
      continueOnFail: () => false,
    } as any;

    await expect(node.execute.call(mockContext)).rejects.toThrow(
      /Unknown operation: nonexistent_op/,
    );
  });
});
