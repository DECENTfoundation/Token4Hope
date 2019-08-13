import { CompositeKey } from "../foundation/CompositeKey";
import { ErrorEntity } from "./ErrorEntity";
import { ErrorKey } from "./ErrorKey";

export const ErrorDefaultMessage = {
    [CompositeKey(ErrorKey.InvalidCredentials, ErrorEntity.Users)]: () => "E-mail and password don't match",
    [CompositeKey(ErrorKey.Forbidden, ErrorEntity.Users)]: () => "Wrong password",
    [CompositeKey(ErrorKey.NotFound, ErrorEntity.Users)]: () => "User not found",
    [CompositeKey(ErrorKey.AlreadyExists, ErrorEntity.Users)]: () => "User with this email already exists",
    [CompositeKey(ErrorKey.TooManyRequests, ErrorEntity.Users)]: () => "Too many requests",
    [CompositeKey(ErrorKey.InvalidPassphrase, ErrorEntity.Users)]: () => "Invalid Passphrase",
    [CompositeKey(ErrorKey.NotFound, ErrorEntity.Assets)]: () => "Asset not found",
    [CompositeKey(ErrorKey.NotVerified, ErrorEntity.Users)]: () => "User is not verified",
    [CompositeKey(ErrorKey.NotConfirmed, ErrorEntity.Users)]: () => "User is not confirmed",
    [CompositeKey(ErrorKey.AlreadyRequested, ErrorEntity.Withdrawals)]: () => "Already make request",
    [CompositeKey(ErrorKey.AlreadyExists, ErrorEntity.Versions)]: () => "Already exists this APK file",
    [CompositeKey(ErrorKey.InvalidData, ErrorEntity.Versions)]: () => "Invalid APK File",
};
