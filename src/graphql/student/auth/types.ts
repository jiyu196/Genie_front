export type ServiceAccessLoginRequestDTO = {
    decryptedKey: string;
};

export type ServiceAccessLoginResponseDTO = {
    serviceAccessLogin: {
        result: boolean;
    };
};