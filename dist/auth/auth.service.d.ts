import { RefreshTokenDto } from './dto/refreshToken.dto';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './../user/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly UserModel;
    private readonly jwtService;
    static getNewTokens(): void;
    static logout(): void;
    static register(email: string, password: string): void;
    constructor(UserModel: ModelType<UserModel>, jwtService: JwtService);
    login(dto: AuthDto): Promise<{
        refreshToken: string;
        accessToken: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            email: string;
            isAdmin: boolean;
        };
    }>;
    getNewTokens({ refreshToken }: RefreshTokenDto): Promise<{
        refreshToken: string;
        accessToken: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            email: string;
            isAdmin: boolean;
        };
    }>;
    register(dto: AuthDto): Promise<{
        refreshToken: string;
        accessToken: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            email: string;
            isAdmin: boolean;
        };
    }>;
    validateUser(dto: AuthDto): Promise<UserModel>;
    issueTokenPair(userId: string): Promise<{
        refreshToken: string;
        accessToken: string;
    }>;
    returnUserFields(user: UserModel): {
        _id: import("mongoose").Types.ObjectId;
        email: string;
        isAdmin: boolean;
    };
}
