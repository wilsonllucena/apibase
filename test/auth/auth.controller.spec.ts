import { Test } from '@nestjs/testing';
import { AuthService } from './../../src/auth/auth.service';
import { AuthController } from './../../src/auth/auth.controller';

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

  it('should return string Error if not User provided', async () => {
    const resultError = await authController.login(null);

    expect(resultError).toEqual(new Error('User not found'));
  });

  it('should return message error if email not is provided', async () => {
    const httpRequest = {
      user: {
        password: 'any_password',
      },
    };
    const resultError = await authController.login(httpRequest);
    expect(resultError).toEqual(new Error('Email or password invalid'));
  });

  it('should return message error if password not is provided', async () => {
    const httpRequest = {
      user: {
        email: 'any_email@email.com',
      },
    };
    const resultError = await authController.login(httpRequest);
    expect(resultError).toEqual(new Error('Email or password invalid'));
  });

  it('should return access_token', async () => {
    const httpRequest = {
      user: {
        email: 'any_email@email.com',
        password: 'any_password',
      },
    };

    jest.spyOn(authController, 'login').mockResolvedValue(mockToken);

    const httpResponse = await authController.login(httpRequest);
    expect(httpResponse).toEqual(mockToken);
  });
});
