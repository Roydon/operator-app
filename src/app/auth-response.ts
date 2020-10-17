export interface AuthResponse {
    status: any;
      token: string;
      success: boolean;
        doctor: {
            id: number,
            name: string,
            email: string,
            token: string,
            contactNum: string,
            expires_in: number,
            success: boolean
        }
    }