/*
 * @Author: Michal Grman (mike@decent.ch)
 * @Date: 2018-03-08 05:30:20
 * @Last Modified by: Michal Grman (mike@decent.ch)
 * @Last Modified time: 2018-03-11 12:15:11
 */

export enum SessionEvent {
    Name = "session",
    Current = "session/CURRENT",
    CurrentSuccess = "session/CURRENT_SUCCESS",
    CurrentFailure = "session/CURRENT_FAILURE",
    Signin = "session/SIGNIN",
    SigninSuccess = "session/SIGNIN_SUCCESS",
    SigninFailure = "session/SIGNIN_FAILURE",
    Signout = "session/SIGNOUT",
    SignoutSuccess = "session/SIGNOUT_SUCCESS",
    SignoutFailure = "session/SIGNOUT_FAILURE",
    Show = "session/SHOW",
    ShowSuccess = "session/SHOW_SUCCESS",
    ShowFailure = "session/SHOW_FAILURE",
    ResetSessionError = "session/RESET_SESSION_ERROR",
}
