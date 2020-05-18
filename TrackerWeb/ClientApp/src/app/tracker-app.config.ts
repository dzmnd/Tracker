let API: any = {
  baseUrl: 'http://localhost:61067/api'
};

API.Auth = {
  base: `Auth`
};

API.Auth.Register = `${API.baseUrl}/${API.Auth.base}/Register`;
API.Auth.ConfirmEmail = `${API.baseUrl}/${API.Auth.base}/ConfirmEmail`;
API.Auth.Login = `${API.baseUrl}/${API.Auth.base}/Login`;
API.Auth.Logout = `${API.baseUrl}/${API.Auth.base}/Logout`;
API.Auth.IsSignedInUser = `${API.baseUrl}/${API.Auth.base}/IsSignedInUser`; 
API.Auth.ForgotPassword = `${API.baseUrl}/${API.Auth.base}/ForgotPassword`; 
API.Auth.ResetPassword = `${API.baseUrl}/${API.Auth.base}/ResetPassword`; 

API.Tracker = {
  base: `Tracker`
};

API.Tracker.AddTracker = `${API.baseUrl}/${API.Tracker.base}/AddTracker`;
API.Tracker.GetTrackers = `${API.baseUrl}/${API.Tracker.base}/GetTrackers`;
API.Tracker.DeleteTracker = `${API.baseUrl}/${API.Tracker.base}/DeleteTracker`;
API.Tracker.StartTracker = `${API.baseUrl}/${API.Tracker.base}/StartTracker`;
API.Tracker.StopTracker = `${API.baseUrl}/${API.Tracker.base}/StopTracker`;

export const trackerAppConfig: any = {
  API: API
}
