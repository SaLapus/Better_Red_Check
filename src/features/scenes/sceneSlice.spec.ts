import sceneReducer, { SceneState, changeTo } from "./sceneSlice";

describe("counter reducer", () => {
  const initialState: SceneState = {
    name: "menu",
    data: undefined,
  };
  it("should handle initial state", () => {
    expect(sceneReducer(undefined, { type: "unknown" })).toEqual({
      name: "main",
      data: undefined,
    });
  });

  it("should handle increment", () => {
    const actual = sceneReducer(initialState, changeTo("red_last_update"));
    expect(actual.name).toEqual("red_last_update");
  });
});
