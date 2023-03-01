import { AuthGuard } from '@nestjs/passport';

export const AzureADGuard = AuthGuard('jwt');