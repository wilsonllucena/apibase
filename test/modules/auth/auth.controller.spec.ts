import { Test } from '@nestjs/testing';
import { AuthService } from './../../../src/modules/auth/auth.service';
import { AuthController } from './../../../src/modules/auth/auth.controller';

describe('AuthController', () => {
  let authController: AuthController;

  const mockToken = {
    access_token: 'access_token',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = await module.get<AuthController>(AuthController);
  });

  it('should must be the instantiation of the AuthController', () => {
    expect(authController).toBeInstanceOf(AuthController);
  });

  it('should be login defined', () => {
    expect(authController.login).toBeDefined();
  });

  it('should return access_token', async () => {
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
      },
    };

    jest.spyOn(authController, 'login').mockResolvedValue(mockToken);

    const httpResponse = await authController.login(httpRequest);
    expect(httpResponse).toEqual(mockToken);
  });
});
