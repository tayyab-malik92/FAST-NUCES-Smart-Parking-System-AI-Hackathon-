const errorHandler = require("../src/middleware/errorHandler");

describe("Error Handler Middleware", () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  it("should return 500 with error message", () => {
    const error = new Error("Something went wrong");

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: "Something went wrong",
    });
  });

  it("should use custom status code if provided", () => {
    const error = new Error("Not Found");
    error.status = 404;

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
  });

  it("should return default message if none provided", () => {
    const error = {};

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal Server Error",
    });
  });
});
