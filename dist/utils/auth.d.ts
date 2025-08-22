export declare const generateToken: (userId: string, username: string) => string;
export declare const verifyToken: (token: string) => {
    userId: string;
    username: string;
} | null;
export declare const validateCredentials: (username: string, password: string) => Promise<{
    id: string;
    username: string;
} | null>;
//# sourceMappingURL=auth.d.ts.map