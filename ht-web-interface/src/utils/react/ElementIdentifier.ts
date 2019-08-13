/*
 * @CreateTime: May 9, 2018 1:23 PM
 * @Author: Matus Balascak
 * @Contact: balascakmatus@gmail.com
 * @Last Modified By: Matus Balascak
 * @Last Modified Time: Jun 15, 2018 2:54 PM
 */

export enum ElementIdentifier {
    ConfirmationModalConfirm = "CONF_MODAL_CONFIRM",
    ConfirmationModalCancel = "CONF_MODAL_CANCEL",
    CloseNotification = "CLOSE_NOTIFICATION",
    // form buttons
    FormAddVendor = "FORM_ADD_VENDOR",
    FormAddMember = "FORM_ADD_MEMBER",
    FormAddApp = "FORM_ADD_APP",
    FormAddAppProduct = "FORM_ADD_PRODUCT",
    FormAddAppVersion = "FORM_ADD_VERSION",
    FormAppDeploy = "FORM_DEPLOY",
    SignIn = "SIGN_IN",
    SignUp = "SIGN_UP",
    ResetPassword = "RESET_PASS",
    SetNewPassword = "SET_NEW_PASSWORD",
    ChangePassword = "CHANGE_PASS",
    // action icons
    AddNewVendor = "ADD_VENDOR",
    AddNewApp = "ADD_APP",
    AddNewAppVersion = "ADD_VERSION",
    AddNewAppProduct = "ADD_PRODUCT",
    AddNewMember = "ADD_MEMBER",
    BackAppDetail = "BACK_APP_DETAIL",
    BackAppVersionDetail = "BACK_VERSION_DETAIL",
    DeleteApp = "DELETE_APP",
    DeleteVersion = "DELETE_VERSION",
    DeleteAppProduct = "DELETE_PRODUCT",
    DeleteMember = "DELETE_MEMBER",
    // state change buttons
    DeployApp = "DEPLOY_APP",
    PublishApp = "PUBLISH_APP",
    PublishAppVersion = "PUBLISH_VERSION",
    // upload buttons
    UploadAppIcon = "UPLOAD_ICON",
    UploadScreenshot = "UPLOAD_SCREENSHOT",
    UploadNewAppVersionApk = "UPLOAD_APK",
    UploadAppIconDropzone = "UPLOAD_ICON_DROPZONE",
    UploadScreenshotDropzone = "UPLOAD_SCREENSHOT_DROPZONE",
}
