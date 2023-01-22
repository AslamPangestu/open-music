class AuthHandler {
  constructor(authService, userService, tokenManager, model) {
    this._authService = authService;
    this._userService = userService;
    this._tokenManager = tokenManager;
    this._model = model;

    this.login = this.login.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.removeToken = this.removeToken.bind(this);
  }

  async login(request, h) {
    const { payload } = request;
    this._model.AuthPayloadModel.validate(payload);

    const { username, password } = payload;
    const id = await this._userService.verify({ username, password });

    const accessToken = this._tokenManager.generateAccessToken({ id });
    const refreshToken = this._tokenManager.generateRefreshToken({ id });

    await this._authService.add({ token: refreshToken });

    const response = h.response({
      status: 'success',
      message: 'Login success',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async refreshToken(request, h) {
    const { payload } = request;
    this._model.TokenPayloadModel.validate(payload);

    const { refreshToken } = payload;

    await this._authService.getByToken(refreshToken);
    const { id } = this._tokenManager.verifyRefreshToken(refreshToken);

    const accessToken = this._tokenManager.generateAccessToken({ id });
    const response = h.response({
      status: 'success',
      message: 'Token success updated',
      data: {
        accessToken,
      },
    });
    response.code(200);
    return response;
  }

  async removeToken(request, h) {
    const { payload } = request;
    this._model.TokenPayloadModel.validate(payload);

    const { refreshToken } = payload;

    await this._authService.getByToken(refreshToken);
    await this._authService.delete(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Token success remove',
    });
    response.code(200);
    return response;
  }
}

module.exports = AuthHandler;
