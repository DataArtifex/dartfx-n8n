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

  it("should include inputPath and outputPath across operations", () => {
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
