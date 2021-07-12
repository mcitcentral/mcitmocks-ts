describe("Basic Test", () => {
  beforeEach(() => {
    cy.mock("/auth/user");
  });

  it("should be able to load an authenticated user", () => {
    cy.visit("/dashboard");
  });
});
